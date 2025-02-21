import Image from "next/image";
import React, { useState } from "react";

interface Props {
  text: string;
  isCompleted: boolean;
  index: number;
}

const Todo = (props: Props) => {
  const [isChecked, setIsChecked] = useState(props.isCompleted);

  return (
    <div className="text-white flex gap-3 md:gap-6 bg-slate-800 px-5 py-4 text-sm md:text-lg border-b border-b-slate-50">
      <label
        className={`relative h-6 w-6 ${
          isChecked
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 "
            : "border border-slate-400"
        }  flex justify-center items-center rounded-full  `}
        htmlFor={"done" + props.index}
      >
        {isChecked && (
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
          name="done"
          id={"done" + props.index}
          className={`appearance-none`}
          onChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
        />
      </label>
      <p>{props.text}</p>
    </div>
  );
};

export default Todo;
