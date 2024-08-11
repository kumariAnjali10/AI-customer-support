import { Navbar } from "@/components/Navbar";
import { HeroSection } from "../components/HeroSection";
import {Chat} from "../components/Chatbot"

export  function HomePage() {
    return (
      <main className="">
        <Navbar />
        <HeroSection />
        {/* <Chat /> */}
      </main>
    );
  }