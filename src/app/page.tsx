"use client";

import Image from "next/image";
import Todo from "./components/Todo";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [tasks, setTasks] = useState<
    { order: number; title: string; isCompleted: boolean }[]
  >([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setTasks(data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    tasks.push({
      order: tasks.length,
      title: newTodo,
      isCompleted: false,
    });

    fetch("/data/data.json", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify([
        ...tasks,
        {
          order: tasks.length,
          title: newTodo,
          isCompleted: false,
        },
      ]),
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className="relative min-h-[100vh] p-6 z-0">
      <Image
        src={"/images/bg-mobile-dark.jpg"}
        width={375}
        height={200}
        alt=""
        className="absolute w-full top-0 left-0 md:hidden z-[-1]"
      />

      <Image
        src={"/images/bg-desktop-dark.jpg"}
        width={1440}
        height={300}
        alt=""
        className="absolute w-full top-0 left-0 sm:hidden md:block z-[-1]"
      />
      <div className="max-w-[540px] mx-auto">
        <header>
          <h1 className=" text-2xl text-white mt-6">TO DO</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              className=" mt-9 h-12 rounded-md w-full bg-slate-800 text-white z-10"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </form>
        </header>

        <main className="mt-4 md:mt-6">
          <ul className=" shadow-2xl shadow-slate-500">
            {tasks.map((item, index) => {
              return (
                <li key={"todo" + index}>
                  <Todo
                    text={item.title}
                    isCompleted={item.isCompleted}
                    index={index}
                  />
                </li>
              );
            })}
            <li>
              <ul className="flex justify-between text-white bg-slate-800 px-5 py-4">
                <li>
                  <p>5 items left</p>
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
                  <button>Clear Completed</button>
                </li>
              </ul>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}
