'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "../components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { CornerDownLeft, Paperclip, Mic } from "lucide-react";

export function Chat() {
  const [messages, setMessages] = useState([
    {
      id: Date.now().toString(),
      role: "assistant",
      content: "Hello! Welcome to HeadStarter AI Support. How can I assist you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
  
    // Add the user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);
  
    setMessage("");
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      let botResponse = ""; // to accumulate the bot's response
  
      const processText = async ({ done, value }) => {
        if (done) {
          // Finally, add the bot's complete response
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: botResponse },
          ]);
          return;
        }
        const text = decoder.decode(value, { stream: true });
        botResponse += text; // accumulate response
        reader.read().then(processText);
      };
  
      reader.read().then(processText);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleMicrophone = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone stream:", stream);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  return (
    <section className="text-zinc-700">
      <div className="flex h-screen justify-center items-center">
        <div className="mx-auto mt-3 w-full max-w-xl">
          <ScrollArea className="mb-2 h-[400px] rounded-md border p-4" ref={ref}>
            {messages.map((m, index) => (
              <div key={index} className={`mb-6 flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <Avatar>
                  <AvatarImage src={m.avatar || ''} alt={m.role} />
                  <AvatarFallback className={m.role === 'user' ? 'text-sm' : 'bg-gray-900 text-white'}>
                    {m.role === 'user' ? 'U' : 'AI'}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5 w-full">
                  <div className="flex">
                    <p className="font-semibold">{m.role === 'user' ? 'You' : 'Bot'}</p>
                  </div>
                  <div className="mt-2 text-sm text-zinc-500 whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="relative rounded-md border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="flex justify-between items-center mt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleMicrophone}
                      variant="ghost"
                      size="icon"
                    >
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
