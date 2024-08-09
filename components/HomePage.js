

"use client";
import React from "react";

import {Chat} from "./chat";
import {Navbar} from "./Navbar";



export  function HomePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white">
 
      <Navbar />
      <Chat></Chat>

    </div>
  );
}


