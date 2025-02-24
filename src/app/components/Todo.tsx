import Image from "next/image";
import React from "react";
import { updateTodoStatus } from "../libs/actions";

interface Props {
  id: string;
  text: string;
  isCompleted: boolean;
  index: number;
}

const Todo = (props: Props) => {
  const updateTodoWithId = updateTodoStatus.bind(null, props.id);

  return (
    <div className="text-white flex gap-3 md:gap-6 bg-slate-800 px-5 py-4 text-sm md:text-lg border-b border-b-slate-50">
      <form id={"update-status-form"} action={updateTodoWithId}>
        <label
          className={`relative h-6 w-6 ${
            props.isCompleted
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 "
              : "border border-slate-400"
          }  flex justify-center items-center rounded-full  `}
          htmlFor={"done" + props.index}
        >
          {props.isCompleted && (
            <>
              <Image
                src={"/images/icon-check.svg"}
                width={11}
                height={9}
                alt="check"
              />
            </>
          )}
          <input
            type="checkbox"
            name="isCompleted"
            id={"isCompleted" + props.index}
            className={`appearance-none`}
            defaultChecked={props.isCompleted}
          />
          <button className="absolute top-0 left-0 w-full h-full"></button>
        </label>
      </form>

      <p>{props.text}</p>
    </div>
  );
};

export default Todo;
