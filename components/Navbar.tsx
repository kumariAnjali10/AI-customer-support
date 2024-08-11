"use client";
import React from "react";
import { FloatingNav } from "../components/ui/floating-navbar";
import { IconHome, IconAlignBoxLeftTop,IconBrandGithub, IconMessage } from "@tabler/icons-react";
export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/Home",
      icon: <IconHome className="h-4 w-4  text-white dark:text-white" />,
    },
    {
        name: "Chat",
        link: "/",
        Icon: (
            <IconMessage className="h-4 w-4 text-white dark:text-white" />
        ),
    },
    {
      name: "Github",
      link: "https://github.com/kumariAnjali10/AI-customer-support.git",
      icon: <IconBrandGithub className="h-4 w-4 text-white dark:text-white" />,
    },
    {
      name: "Blog",
      link: "/",
      icon: (
        <IconAlignBoxLeftTop className="h-4 w-4  text-white dark:text-white" />
      ),
    },
 
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

