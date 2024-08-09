
"use client"
import React from "react";
import {HomePage} from "../components/HomePage";
import {LandingPage} from "../components/LandingPage"


export default function Home() {
  return (
    <main className="">
      <HomePage />
      <div>
      <LandingPage />
      </div>
    </main>   
  );
}


