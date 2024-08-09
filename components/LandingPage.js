"use client"; // This marks the component as a client component

import React from "react";



export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      

      <div className="flex space-x-5 mb-6">
        <button className="px-12 py-4 text-white bg-blue-600 font-bold rounded-full hover:bg-slate-400 focus:outline-none text-2xl  border-2 border-rose-500     shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition duration-300">
          <a href="/HomePage">Login </a>
        </button>
      </div>

      <p className="text-blue-700 text-xl max-w-xl font-bold hover:underline">
        Empowering Customer Success with Instant, AI-Powered
      </p>
      <p className="text-blue-700 text-xl max-w-xl font-bold hover:underline">
        Assistance at Your Fingertips
      </p>

      <h2 className="mt-4 text-black text-4xl font-bold text-right">
        AI Customer Support
      </h2>
    </div>
  );
}

