"use client";

import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMessages, sendMessage } from "@/actions/chat";
import { motion } from "framer-motion";

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  user?: {
    name?: string | null;
  } | null;
}

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Poll for messages
  useEffect(() => {
    if (!isOpen) return;

    const fetchMessages = async () => {
      const result = await getMessages();
      if (result.success && result.data) {
        setMessages(result.data);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const content = inputValue;
    setInputValue("");

    // Optimistic update
    const tempId = Math.random().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        content,
        createdAt: new Date(),
        user: { name: "Me" }, // Mock current user
      },
    ]);

    await sendMessage(content);
  };

  const isAICommand = (text: string) => text.includes("@ProyectLambreta");

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-zinc-900 border border-zinc-800 p-2 rounded-l-md shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-[320px]" : "translate-x-0",
        )}
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        ) : (
          <MessageSquare className="w-4 h-4 text-emerald-500" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-[320px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-40 flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-mono text-sm font-bold text-zinc-200">
              WAR ROOM
            </h3>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
            #GENERAL
          </span>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800"
        >
          {messages.map((msg) => {
            const isCommand = isAICommand(msg.content);
            const isMe = msg.user?.name === "Me"; // Simple check for now

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col max-w-[85%]",
                  isMe ? "ml-auto items-end" : "items-start",
                )}
              >
                <div
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs leading-relaxed break-words",
                    isMe
                      ? "bg-emerald-500/10 text-emerald-100 border border-emerald-500/20"
                      : isCommand
                        ? "bg-amber-500/10 text-amber-200 border border-amber-500/20 font-mono"
                        : "bg-zinc-900 text-zinc-300 border border-zinc-800",
                  )}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-zinc-600 mt-1 px-1">
                  {isMe ? "You" : msg.user?.name || "System"} •{" "}
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-3 pr-10 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-500 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-[10px] text-zinc-600 text-center">
            Use <span className="text-amber-500">@ProyectLambreta</span> to
            summon AI
          </div>
        </div>
      </div>
    </>
  );
}
