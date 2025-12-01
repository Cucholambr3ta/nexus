"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogEntry {
  id: string
  message: string
  timestamp: number
}

interface ConsoleLogProps {
  logs: LogEntry[]
}

export function ConsoleLog({ logs }: ConsoleLogProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="w-full max-w-2xl mt-4 font-mono text-sm">
      <div 
        ref={scrollRef}
        className="h-48 overflow-y-auto rounded-lg border border-border/50 bg-black/20 p-4 backdrop-blur-sm"
      >
        <AnimatePresence initial={false}>
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "mb-1 flex gap-2",
                index === logs.length - 1 ? "text-primary" : "text-muted-foreground/60"
              )}
            >
              <span className="opacity-50">
                {new Date(log.timestamp).toLocaleTimeString([], { 
                  hour12: false, 
                  hour: "2-digit", 
                  minute: "2-digit", 
                  second: "2-digit" 
                })}
              </span>
              <span>{">"}</span>
              <span>{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="text-muted-foreground/30 italic">
            Waiting for input...
          </div>
        )}
      </div>
    </div>
  )
}
