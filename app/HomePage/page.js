

"use client";
import React from "react";
import { FaBlog, FaGithub, FaHome } from "react-icons/fa"; // Importing an icon for the home button

function toggleDarkMode() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white dark:bg-gray-900">
      <div className="absolute top-5 right-5">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 text-sm bg-gray-500 rounded-full hover:bg-gray-400 focus:outline-none border-2 border-black shadow-lg hover:shadow-slate-500/50 hover:scale-105 transition duration-300"
        >
          Dark Mode
        </button>
      </div>
      <nav className="bg-gray-300 dark:bg-gray-700 rounded-full w-3/4 mt-10 p-4 border-2 border-blue-500">
        <ul className="flex items-center justify-between space-x-4">
          <li className="flex items-center space-x-2">
            {/* Home Icon with Clickable Link */}
            <a href="/" className="text-black dark:text-black hover:text-blue-500">
              <FaHome className="text-xl shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300" />
            </a>
          </li>
          {/* Other List Items */}
          <li className="text-black dark:text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
            Files
          </li>
          <li className="text-black dark:text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
            Chats
          </li>
          <li className="text-black dark:text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
            Hey, user
          </li>
          <li className="text-black dark:text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
            Logout
          </li>
          <li className="flex items-center space-x-2 text-black dark:text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
            {/* Github Icon with Clickable Link */}
            <a
              href="https://github.com/kumariAnjali10/AI-customer-support"
              className="text-black dark:text-black hover:text-blue-500"
            >
              <FaGithub className="text-xl shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300" />
            </a>
            Github
          </li>
          <li className="flex items-center space-x-2 text-black dark:text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
            {/* Blog Icon with Clickable Link */}
            <a href="/" className="text-black dark:text-black hover:text-blue-500">
              <FaBlog className="text-xl shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300" />
            </a>
            Blog
          </li>
        </ul>
      </nav>

      <div className="flex flex-grow justify-center items-center w-full">
        <p className="text-gray-500 dark:text-gray-300 text-xl">
          Educational Support Chatbot
        </p>
      </div>
    </div>
  );
}

export default HomePage;
