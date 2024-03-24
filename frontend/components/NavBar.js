import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="/" class="flex ms-2 md:me-24">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8 me-3"
                alt="FlowBite Logo"
              />
              <span class="self-center text-3xl font-bold  whitespace-nowrap  bg-gradient-to-r from-purple-600 to-blue-500 inline-block text-transparent bg-clip-text">
                प्रज्ञान AI
              </span>
            </Link>
          </div>
          <div class="self-center hidden md:flex items-center space-x-4 ">
            <Link
              href="/home"
              class="self-center inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-200 dark:hover:text-indigo-500 dark:focus:text-indigo-500 dark:focus:bg-indigo-100"
            >
              Home
            </Link>
            <Link
              href="/tools"
              class="self-center inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-200 dark:hover:text-indigo-500 dark:focus:text-indigo-500 dark:focus:bg-indigo-100"
            >
              Tools
            </Link>
            <Link
              href="/about"
              class="self-center  inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-200 dark:hover:text-indigo-500 dark:focus:text-indigo-500 dark:focus:bg-indigo-100"
            >
              About Us
            </Link>
          </div>
          <div className=" hidden mr-3 space-x-4 lg:flex nav__item">
            <Link href="/login">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
              >
                Login/Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
