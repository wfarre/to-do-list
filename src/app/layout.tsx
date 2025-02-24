import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { fetchTodos } from "./libs/actions";
import AddForm from "./components/AddForm";
import { TodoFactory } from "./libs/factories/TodoFactory";
import TodoListFooter from "./components/TodoListFooter";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To do list - frontendmentor",
  description: "To do list designed by frontend mentor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tasks = await fetchTodos();
  const todos = tasks?.map((item) => new TodoFactory(item, "APIv1"));

  return (
    <html lang="en">
      <body className={` ${josefinSans.variable} antialiased`}>
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
              <AddForm />
            </header>

            <main className="mt-4 md:mt-6">
              <ul className=" shadow-2xl shadow-slate-500">
                <li>{children}</li>
                <li>
                  <TodoListFooter tasks={todos} />
                </li>
              </ul>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
