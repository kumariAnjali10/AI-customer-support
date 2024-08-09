"use client"

import { CornerDownLeft, Mic, Paperclip } from "lucide-react"

import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"

function handleMicrophone() {
    // Code to handle microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            // Handle the microphone stream
            console.log("Microphone stream:", stream);
        })
        .catch(error => {
            // Handle the error
            console.error("Error accessing microphone:", error);
        });
    }

export function Chatbot() {
  return (
    <form
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring w-1/2"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
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
            <Button onclick={handleMicrophone} variant="ghost" size="icon">
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
  );
}
