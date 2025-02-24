"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";
import { TodoBackend } from "./models/Todo";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export interface State {
  message?: string | null;
}

const formSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: "This field cannot be empty.",
  }),
  isCompleted: z.boolean(),
  rank: z.number(),
});

const CreateToDo = formSchema.omit({
  id: true,
  isCompleted: true,
  rank: true,
});

const UpdateTodo = formSchema.omit({ id: true, rank: true, title: true });

export const createNewTodo = async (
  prevState: State | undefined,
  formData: FormData
) => {
  await sql`
      CREATE TABLE IF NOT EXISTS todos (
          id UUID PRIMARY KEY,
          rank INTEGER,
          title VARCHAR(256),
          is_completed BOOLEAN
      );
      `;

  const validatedFields = CreateToDo.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return { message: "Missing fields" };
  }

  const { title } = validatedFields.data;

  try {
    await sql`
      INSERT INTO todos (id, rank, title, is_completed)
      VALUES (gen_random_uuid(), ${0}, ${title}, ${false} )
      `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
};

export const updateTodoStatus = async (id: string, formData: FormData) => {
  const validatedFields = UpdateTodo.safeParse({
    isCompleted: !formData.get("isCompleted"),
  });
  if (!validatedFields.success) {
    // return { message: "IsCompleted should be a boolean." };
    return;
  }

  const { isCompleted } = validatedFields.data;

  await sql`
    UPDATE todos
    SET is_completed = ${isCompleted}
    WHERE id = ${id}
  `;

  revalidatePath("/");
};

export const fetchTodos = async () => {
  try {
    const data = await sql<TodoBackend[]>`
    SELECT * FROM todos
    `;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCompletedTodos = async () => {
  try {
    const data = await sql<TodoBackend[]>`
    SELECT * FROM todos WHERE is_completed = TRUE
    `;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchActiveTodos = async () => {
  try {
    const data = await sql<TodoBackend[]>`
    SELECT * FROM todos WHERE is_completed = FALSE
    `;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await sql`
    DELETE FROM todos
    WHERE id = ${id}
    `;

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompletedTodos = async () => {
  try {
    await sql`
    DELETE FROM todos
    WHERE is_completed = TRUE`;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
};
