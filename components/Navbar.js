import React from 'react'
import { ReceiptText } from 'lucide-react';
import { House } from 'lucide-react';
import { Github } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-gray-300 rounded-3xl w-3/4 mt-10 p-4 border-2 border-blue-500">
    <ul className="flex items-center justify-between space-x-4">
      <li className="flex items-center space-x-2">
        <a href="/" className="text-black hover:text-blue-500">
          <House className="text-xl shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300" />
        </a>
      </li>
    
      <li className="text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
        Files
      </li>
      <li className="text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
        Chats
      </li>
      <li className="text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
        Hey, user
      </li>
      <li className="text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
        Logout
      </li>
      <li className="flex items-center space-x-2 text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
        <a
          href="https://github.com/kumariAnjali10/AI-customer-support"
          className="text-black hover:text-blue-500"
        >
          <Github className="text-xl shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300" />
        </a>
        github
      </li>
      <li className="flex items-center space-x-2 text-black font-bold hover:text-blue-500 cursor-pointer hover:underline shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300">

        <a href="/" className="text-black hover:text-blue-500">
          <ReceiptText className="text-xl shadow-s hover:shadow-blue-500/50 hover:scale-105 transition duration-300" />
        </a>
        Blog
      </li>
    </ul>
  </nav>
  )
}
