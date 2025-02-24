import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { fetchTodos } from "./libs/actions";
import AddForm from "./components/AddForm";
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
  const data = await fetchTodos();

  console.log(data);

  return (
    <html lang="en">
      <body className={` ${josefinSans.variable} antialiased font-medium`}>
        <div className="relative min-h-[100vh] p-6 z-0 bg-veryDarkBlue text-lightGrayishBlue ">
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
              <h1 className=" text-4xl mt-6 font-bold text-white tracking-[1rem]">
                TODO
              </h1>
              <AddForm />
            </header>

            <main className="mt-4 md:mt-6">
              <ul className=" shadow-2xl shadow-veryDarkDesaturatedBlue">
                <li>{children}</li>
                <li>
                  <TodoListFooter listLength={data?.count ? data.count : 0} />
                </li>
              </ul>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
