import { fetchCompletedTodos } from "../libs/actions";
import Todo from "../components/Todo";
import { TodoFactory } from "../libs/factories/TodoFactory";

export default async function Home() {
  const tasks = await fetchCompletedTodos();
  const todos = tasks?.map((item) => new TodoFactory(item, "APIv1"));

  todos?.map((item, index) => {
    return (
      <li key={"todo" + index}>
        <Todo
          id={item.id}
          text={item.title}
          isCompleted={item.isCompleted}
          index={index}
        />
      </li>
    );
  });

  return (
    <ul>
      {todos?.map((item, index) => {
        return (
          <li key={"todo" + index}>
            <Todo
              id={item.id}
              text={item.title}
              isCompleted={item.isCompleted}
              index={index}
            />
          </li>
        );
      })}
    </ul>
  );
}
