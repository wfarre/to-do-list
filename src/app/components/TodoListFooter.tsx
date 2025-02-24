"use client";

import React from "react";
import { deleteCompletedTodos } from "../libs/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TodoListFooter = (props: { listLength: number }) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <ul className="flex justify-between text-lightGrayishBlue bg-veryDarkDesaturatedBlue px-5 py-4 ">
      <li>
        <p>{props.listLength} items left</p>
      </li>
      <li>
        <ul className="flex gap-4">
          <li>
            <Link
              className={` hover:text-lightGrayishBlueHover ${
                pathname === "/" && "text-linkActive"
              }`}
              href={"/"}
            >
              All
            </Link>
          </li>
          <li>
            <Link
              className={`  hover:text-lightGrayishBlueHover ${
                pathname === "/active" && "text-linkActive"
              }`}
              href={"/active"}
            >
              Active
            </Link>
          </li>
          <li>
            <Link
              className={` hover:text-lightGrayishBlueHover ${
                pathname === "/completed" && "text-linkActive"
              }`}
              href={"/completed"}
            >
              Completed
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <form action={deleteCompletedTodos}>
          <button className="hover:text-lightGrayishBlueHover">
            Clear Completed
          </button>
        </form>
      </li>
    </ul>
  );
};

export default TodoListFooter;
