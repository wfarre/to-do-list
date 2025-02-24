"use client";

import React, { useActionState } from "react";
import { createNewTodo, State } from "../libs/actions";

const AddForm = () => {
  const initialState: State = { message: null };
  const [state, formAction] = useActionState(createNewTodo, initialState);
  return (
    <form
      className="relative flex items-center mt-9 gap-3 md:gap-6 bg-veryDarkDesaturatedBlue pl-5  text-sm md:text-lg"
      action={formAction}
    >
      <input
        type="button"
        className=" w-6 h-6 rounded-full inline-block border border-veryDarkGrayishBlue "
      />
      <input
        type="text"
        name="title"
        id="title"
        className=" relative flex-1  py-4 rounded-md bg-inherit  text-white z-10 inline-block"
      />
      {state?.message && (
        <p className="mt-2 text-sm text-red-500" key={state.message}>
          {state.message}
        </p>
      )}
    </form>
  );
};

export default AddForm;
