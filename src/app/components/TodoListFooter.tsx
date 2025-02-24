import React from "react";
import { deleteCompletedTodos } from "../libs/actions";
import { TodoFactory } from "../libs/factories/TodoFactory";

const TodoListFooter = (props: { tasks?: TodoFactory[] }) => {
  return (
    <ul className="flex justify-between text-white bg-slate-800 px-5 py-4">
      <li>
        <p>{props.tasks?.length} items left</p>
      </li>
      <li>
        <ul className="flex gap-4">
          <li>
            <a>All</a>
          </li>
          <li>
            <a>Active</a>
          </li>
          <li>
            <a>Completed</a>
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
