"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  avatar?: string;
}

export function Chat() {
  const placeholders = [
    "What is the primary goal of the Educational AI chatbot?",
    "How should the AI chatbot greet new users?",
    "When might the chatbot need to explain its purpose to a user?"
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: "assistant",
      content: "Hello! Welcome to Educational AI Support. How can I assist you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    // Add the user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), role: "user", content: message },
    ]);

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

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let botResponse = ""; // to accumulate the bot's response

      const processText = async ({ done, value }: { done: boolean; value?: Uint8Array }) => {
        if (done) {
          // Finally, add the bot's complete response
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now().toString(), role: "assistant", content: botResponse },
          ]);
          return;
        }
        const text = decoder.decode(value, { stream: true });
        botResponse += text; // accumulate response
        reader?.read().then(processText);
      };

      reader?.read().then(processText);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElement = e.target as HTMLFormElement;
    const inputValue = inputElement.querySelector<HTMLInputElement>("input")?.value || "";
    sendMessage(inputValue);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-black ">
      <section className="text-zinc-700">
        <div className="flex h-screen justify-center items-center">
          <div className="mx-auto mt-3 w-full max-w-xl">
            <ScrollArea className="mb-2 h-[500px] rounded-3xl border p-10" ref={ref}>
              {messages.map((m) => (
                <div key={m.id} className={`mb-6 flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <Avatar className="p-1">
                    <AvatarImage src={m.avatar || ''} alt={m.role} />
                    <AvatarFallback className={m.role === 'user' ? 'text-sm' : 'bg-emerald-400 text-black '}>
                      {m.role === 'user' ? 'U' : 'AI'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-1.5 w-full">
                    <div className="flex">
                      <p className="font-semibold text-white/[1]">{m.role === 'user' ? 'You' : 'Bot'}</p>
                    </div>
                    <div className="mt-2 text-sm text-white whitespace-pre-wrap">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
