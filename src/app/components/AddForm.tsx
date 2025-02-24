"use client";

import React, { useActionState } from "react";
import { createNewTodo, State } from "../libs/actions";

const AddForm = () => {
  const initialState: State = { message: null };
  const [state, formAction] = useActionState(createNewTodo, initialState);
  return (
    <form action={formAction}>
      <input
        type="text"
        name="title"
        id="title"
        className=" mt-9 h-12 rounded-md w-full bg-slate-800 text-white z-10"
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
