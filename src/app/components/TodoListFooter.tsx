import React from "react";
import { deleteCompletedTodos } from "../libs/actions";
import { TodoFactory } from "../libs/factories/TodoFactory";
import Link from "next/link";

const TodoListFooter = (props: { tasks?: TodoFactory[] }) => {
  return (
    <ul className="flex justify-between text-white bg-slate-800 px-5 py-4">
      <li>
        <p>{props.tasks?.length} items left</p>
      </li>
      <li>
        <ul className="flex gap-4">
          <li>
            <Link href={"/"}>All</Link>
          </li>
          <li>
            <Link href={"/active"}>Active</Link>
          </li>
          <li>
            <Link href={"/completed"}>Completed</Link>
          </li>
        </ul>
      </li>
      <li>
        <form action={deleteCompletedTodos}>
          <button>Clear Completed</button>
        </form>
      </li>
    </ul>
  );
};

export default TodoListFooter;
