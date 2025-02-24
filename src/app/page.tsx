import Todo from "./components/Todo";
import { fetchTodos } from "./libs/actions";
import { TodoFactory } from "./libs/factories/TodoFactory";

export default async function Home() {
  const data = await fetchTodos();
  const todos = data?.data.map((item) => new TodoFactory(item, "APIv1"));

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
