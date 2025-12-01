"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Loader2, Terminal, Send, CheckCircle2, Cpu, Layout, Bot, Briefcase, Heart } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

type Mode = 'software' | 'web' | 'agent'
type AgentScope = 'enterprise' | 'personal'

export function NexusTerminal() {
  const t = useTranslations("Index")
  const [isFocused, setIsFocused] = React.useState(false)
  const [isHandover, setIsHandover] = React.useState(false)
  const [refinedIdea, setRefinedIdea] = React.useState<string | null>(null)
  const [mode, setMode] = React.useState<Mode>('software')
  const [agentScope, setAgentScope] = React.useState<AgentScope>('enterprise')
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const [input, setInput] = React.useState('')
  
  // Memoize transport to prevent recreation on every render
  const transport = React.useMemo(() => new DefaultChatTransport({
    api: '/api/chat',
    body: () => ({ mode, agentScope })
  }), [mode, agentScope])

  const { messages, sendMessage, status, stop } = useChat({
    transport,
    onFinish: ({ message }) => {
      // Gatekeeper Logic: Check for [REQ_COMPLETE]
      if (message.content && typeof message.content === 'string' && message.content.includes("[REQ_COMPLETE]")) {
        const parts = message.content.split("[REQ_COMPLETE]")
        const finalIdea = parts[1]?.trim()
        if (finalIdea) {
          setRefinedIdea(finalIdea)
          setIsHandover(true)
          // Trigger Webhook (Mock)
          console.log("🚀 TRIGGERING N8N WEBHOOK WITH:", finalIdea, "MODE:", mode, "SCOPE:", agentScope)
        }
      }
    }
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    // sendMessage expects a message object or text
    await sendMessage({ text: input })
    setInput('')
  }

  // Auto-scroll logs
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Theme Configuration
  const theme = {
    software: {
      color: "indigo",
      border: "border-indigo-500/30",
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      ring: "ring-indigo-500/50",
      placeholder: "Describe your SaaS, App or Complex Platform...",
      icon: Cpu
    },
    web: {
      color: "rose",
      border: "border-rose-500/30",
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      ring: "ring-rose-500/50",
      placeholder: "Describe your Landing Page, Portfolio or Corporate Site...",
      icon: Layout
    },
    agent: {
      color: agentScope === 'enterprise' ? "emerald" : "amber",
      border: agentScope === 'enterprise' ? "border-emerald-500/30" : "border-amber-500/30",
      text: agentScope === 'enterprise' ? "text-emerald-400" : "text-amber-400",
      bg: agentScope === 'enterprise' ? "bg-emerald-500/10" : "bg-amber-500/10",
      ring: agentScope === 'enterprise' ? "ring-emerald-500/50" : "ring-amber-500/50",
      placeholder: "Describe the task you want an AI to automate...",
      icon: Bot
    }
  }

  const currentTheme = theme[mode]

  // If we are in handover mode, show success state
  if (isHandover) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "w-full max-w-3xl mx-auto rounded-xl border p-8 text-center backdrop-blur-xl transition-colors duration-500",
          currentTheme.border,
          currentTheme.bg
        )}
      >
        <div className={cn(
          "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-1 transition-colors duration-500",
          currentTheme.bg,
          currentTheme.ring
        )}>
          <CheckCircle2 className={cn("h-8 w-8 transition-colors duration-500", currentTheme.text)} />
        </div>
        <h2 className={cn("text-2xl font-bold mb-2 transition-colors duration-500", currentTheme.text)}>
          Architecture Request Approved
        </h2>
        <p className="text-zinc-400 mb-6">
          Your requirements have been refined and transmitted to the Orchestration Core.
        </p>
        <div className={cn("rounded-lg bg-black/40 p-4 border text-left transition-colors duration-500", currentTheme.border)}>
          <p className={cn("text-xs font-mono mb-2 uppercase tracking-wider transition-colors duration-500", currentTheme.text)}>
            Refined Specification ({mode.toUpperCase()}):
          </p>
          <p className="text-zinc-300 font-mono text-sm leading-relaxed">{refinedIdea}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className={cn(
            "mt-8 px-6 py-2 rounded-full transition-colors text-sm font-medium bg-white/5 hover:bg-white/10",
            currentTheme.text
          )}
        >
          Start New Session
        </button>
      </motion.div>
    )
  }

  const hasMessages = messages.length > 0

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* Mode Selector Tabs */}
      <div className="flex justify-center gap-4 mb-2">
        {(['software', 'web', 'agent'] as const).map((m) => {
          const isActive = mode === m
          const tConfig = theme[m]
          const Icon = tConfig.icon
          
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                isActive 
                  ? `${tConfig.bg} ${tConfig.border} ${tConfig.text} ring-1 ${tConfig.ring}` 
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium capitalize">{m}</span>
            </button>
          )
        })}
      </div>

      {/* Agent Scope Sub-Nav */}
      <AnimatePresence>
        {mode === 'agent' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex justify-center gap-2 overflow-hidden"
          >
            <button
              onClick={() => setAgentScope('enterprise')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all",
                agentScope === 'enterprise' 
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                  : "text-zinc-600 hover:text-emerald-400/70"
              )}
            >
              <Briefcase className="h-3 w-3" />
              Enterprise
            </button>
            <button
              onClick={() => setAgentScope('personal')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all",
                agentScope === 'personal' 
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                  : "text-zinc-600 hover:text-amber-400/70"
              )}
            >
              <Heart className="h-3 w-3" />
              Personal
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Card */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative overflow-hidden rounded-xl border bg-zinc-900/90 shadow-2xl backdrop-blur-xl transition-all duration-500",
          currentTheme.border,
          isFocused ? `ring-1 ${currentTheme.ring}` : "",
          hasMessages ? "p-1" : "p-1"
        )}
      >
        {/* Terminal Header */}
        <div className={cn(
          "flex items-center justify-between px-4 py-3 bg-zinc-950/50 rounded-t-lg border-b transition-colors duration-500",
          currentTheme.border
        )}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/20 border border-green-500/30" />
            </div>
            <div className="ml-3 flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <Terminal className="h-3 w-3" />
              <span>nexus-{mode} — v3.1.0</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider flex items-center gap-2">
            {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            {isLoading ? "Analyzing..." : "Awaiting Input"}
          </div>
        </div>

        {/* Chat History */}
        <AnimatePresence>
          {hasMessages && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={cn("border-b bg-black/20 transition-colors duration-500", currentTheme.border)}
            >
              <div 
                ref={scrollRef}
                className="h-[300px] overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent space-y-4"
              >
                {messages.map((m) => {
                  const isSystem = m.role !== 'user'
                  const rawContent = m.content || ""
                  const content = rawContent.split("[REQ_COMPLETE]")[0] || ""
                  
                  if (!content.trim()) return null

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: isSystem ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex gap-3",
                        isSystem ? "text-zinc-400" : "text-zinc-100 flex-row-reverse"
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 h-6 w-6 rounded flex items-center justify-center text-[10px] font-bold transition-colors duration-300",
                        isSystem ? `${currentTheme.bg} ${currentTheme.text}` : "bg-zinc-700 text-zinc-300"
                      )}>
                        {isSystem ? "SYS" : "USR"}
                      </div>
                      <div className={cn(
                        "rounded-lg px-3 py-2 max-w-[80%]",
                        isSystem ? "bg-zinc-950/50 border border-zinc-800/50" : "bg-zinc-800 border border-zinc-700"
                      )}>
                        {content}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-4 bg-zinc-950/30 flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
            <span className={cn("font-mono text-lg select-none transition-colors duration-500", currentTheme.text)}>{">"}</span>
            <input
              value={input}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              autoComplete="off"
              placeholder={hasMessages ? "Reply to System..." : currentTheme.placeholder}
              className={cn(
                "flex-1 bg-transparent font-mono text-zinc-100 placeholder:text-zinc-700 focus:outline-none disabled:opacity-50 transition-all",
                hasMessages ? "text-sm" : "text-lg"
              )}
            />
            <button
              type="submit"
              disabled={isLoading || !(input || "").trim()}
              className={cn(
                "p-2 rounded-md transition-colors disabled:opacity-0",
                currentTheme.text,
                currentTheme.bg,
                "hover:opacity-80"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
