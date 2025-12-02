"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import {
  Loader2,
  CheckCircle2,
  Cpu,
  Layout,
  Bot,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useScope } from "@/components/scope-provider";

type Mode = "discovery" | "software" | "web" | "agent";

interface NexusTerminalProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export function NexusTerminal({ mode, setMode }: NexusTerminalProps) {
  const t = useTranslations("Index");
  const { scope } = useScope();
  const [isHandover, setIsHandover] = React.useState(false);
  const [refinedIdea, setRefinedIdea] = React.useState<string | null>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [input, setInput] = React.useState("");

  // useChat hook with standard API
  const { messages, sendMessage, status } = useChat({
    api: "/api/chat",
    body: { mode, agentScope: scope },
    onFinish: (message: any) => {
      const content = message.content;
      if (content && typeof content === "string") {
        if (content.includes("[REDIRECT:")) {
          const match = content.match(/\[REDIRECT: (.*?)\]/);
          if (match && match[1]) {
            const newMode = match[1].toLowerCase().trim() as Mode;
            if (["software", "web", "agent"].includes(newMode)) {
              setMode(newMode);
              return;
            }
          }
        }
        if (content.includes("[REQ_COMPLETE]")) {
          const parts = content.split("[REQ_COMPLETE]");
          const finalIdea = parts[1]?.trim();
          if (finalIdea) {
            setRefinedIdea(finalIdea);
            setIsHandover(true);
          }
        }
      }
    },
  } as any);

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await sendMessage({ text: input }, { body: { mode, agentScope: scope } });
    setInput("");
  };

  // Auto-scroll logs
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Theme Configuration - ENFORCED DARK MODE
  const theme = {
    discovery: {
      color: scope === "enterprise" ? "slate" : "amber",
      border:
        scope === "enterprise" ? "border-slate-500/30" : "border-amber-500/30",
      text: scope === "enterprise" ? "text-slate-400" : "text-amber-400",
      bg: scope === "enterprise" ? "bg-slate-500/10" : "bg-amber-500/10",
      ring: scope === "enterprise" ? "ring-slate-500/50" : "ring-amber-500/50",
      placeholder: t("terminal.placeholder.discovery"),
      icon: Sparkles,
    },
    software: {
      color: "indigo",
      border: "border-indigo-500/30",
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      ring: "ring-indigo-500/50",
      placeholder: t("terminal.placeholder.software"),
      icon: Cpu,
    },
    web: {
      color: "rose",
      border: "border-rose-500/30",
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      ring: "ring-rose-500/50",
      placeholder: t("terminal.placeholder.web"),
      icon: Layout,
    },
    agent: {
      color: scope === "enterprise" ? "emerald" : "amber",
      border:
        scope === "enterprise"
          ? "border-emerald-500/30"
          : "border-amber-500/30",
      text: scope === "enterprise" ? "text-emerald-400" : "text-amber-400",
      bg: scope === "enterprise" ? "bg-emerald-500/10" : "bg-amber-500/10",
      ring:
        scope === "enterprise" ? "ring-emerald-500/50" : "ring-amber-500/50",
      placeholder: t("terminal.placeholder.agent"),
      icon: Bot,
    },
  };

  const currentTheme = theme[mode];

  // Handover Success State
  if (isHandover) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "w-full max-w-3xl mx-auto rounded-xl border p-8 text-center backdrop-blur-xl transition-colors duration-500 bg-zinc-950/80",
          currentTheme.border,
        )}
      >
        <div
          className={cn(
            "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-1 transition-colors duration-500",
            currentTheme.bg,
            currentTheme.ring,
          )}
        >
          <CheckCircle2
            className={cn(
              "h-8 w-8 transition-colors duration-500",
              currentTheme.text,
            )}
          />
        </div>
        <h2
          className={cn(
            "text-2xl font-bold mb-2 transition-colors duration-500",
            currentTheme.text,
          )}
        >
          Architecture Request Approved
        </h2>
        <p className="text-zinc-400 mb-6">
          Your requirements have been refined and transmitted to the
          Orchestration Core.
        </p>
        <div
          className={cn(
            "rounded-lg bg-black/40 p-4 border text-left transition-colors duration-500",
            currentTheme.border,
          )}
        >
          <p
            className={cn(
              "text-xs font-mono mb-2 uppercase tracking-wider transition-colors duration-500",
              currentTheme.text,
            )}
          >
            Refined Specification ({mode.toUpperCase()}):
          </p>
          <p className="text-zinc-300 font-mono text-sm leading-relaxed">
            {refinedIdea}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className={cn(
            "mt-8 px-6 py-2 rounded-full transition-colors text-sm font-medium bg-white/5 hover:bg-white/10",
            currentTheme.text,
          )}
        >
          Start New Session
        </button>
      </motion.div>
    );
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-sm relative z-20">
      {/* Terminal Card - ALWAYS DARK */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "rounded-xl border overflow-hidden backdrop-blur-md shadow-2xl transition-colors duration-500 bg-zinc-950/90",
          currentTheme.border,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <div className="text-xs text-zinc-500 font-medium tracking-widest uppercase opacity-50">
            Nexus_Terminal_v2.0
          </div>
        </div>

        {/* Chat History */}
        <AnimatePresence>
          {hasMessages && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={cn(
                "border-b border-zinc-800 bg-zinc-900/20 transition-colors duration-500",
              )}
            >
              <div
                ref={scrollRef}
                className="h-[300px] overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent space-y-4"
              >
                {messages.map((m) => {
                  const isSystem = m.role !== "user";
                  const rawContent = (m as any).content || "";
                  const content =
                    typeof rawContent === "string"
                      ? rawContent.split("[REQ_COMPLETE]")[0] || ""
                      : "";

                  if (!content.trim()) return null;

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: isSystem ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex gap-3",
                        isSystem
                          ? "text-zinc-400"
                          : "text-zinc-100 flex-row-reverse",
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 h-6 w-6 rounded flex items-center justify-center text-[10px] font-bold transition-colors duration-300",
                          isSystem
                            ? `${currentTheme.bg} ${currentTheme.text}`
                            : "bg-zinc-800 text-zinc-400",
                        )}
                      >
                        {isSystem ? "SYS" : "USR"}
                      </div>
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 max-w-[80%]",
                          isSystem
                            ? "bg-zinc-900/50 border border-zinc-800"
                            : "bg-zinc-800 border border-zinc-700",
                        )}
                      >
                        {content}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-4 space-y-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder={currentTheme.placeholder}
              className={cn(
                "w-full h-32 bg-transparent resize-none outline-none placeholder:text-zinc-600 text-zinc-200 leading-relaxed selection:bg-white/10",
                "scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent",
              )}
              spellCheck={false}
            />

            {/* Corner Accent */}
            <div
              className={cn(
                "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-50",
                currentTheme.text,
              )}
            />
          </div>

          {/* Mode Selector Tabs (Relocated) */}
          <div className="flex justify-center gap-2 pb-4">
            {(["discovery", "software", "web", "agent"] as const).map((m) => {
              const isActive = mode === m;
              const tConfig = theme[m];
              const Icon = tConfig.icon;

              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300",
                    isActive
                      ? `${tConfig.bg} ${tConfig.border} ${tConfig.text} ring-1 ${tConfig.ring}`
                      : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50",
                  )}
                >
                  <Icon className="h-3 w-3" />
                  <span className="text-xs font-medium capitalize">
                    {t(`terminal.modes.${m}`)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            {/* Scope Selector (Only for Agent) - REMOVED, handled globally */}
            {/* {mode === 'agent' && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800"
              >
                <button
                  onClick={() => setAgentScope('enterprise')}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all",
                    agentScope === 'enterprise' 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                      : "text-zinc-500 hover:text-emerald-500"
                  )}
                >
                  <Briefcase className="h-3 w-3" />
                  {t('terminal.scopes.enterprise')}
                </button>
                <button
                  onClick={() => setAgentScope('personal')}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all",
                    agentScope === 'personal' 
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                      : "text-zinc-500 hover:text-amber-500"
                  )}
                >
                  <Heart className="h-3 w-3" />
                  {t('terminal.scopes.personal')}
                </button>
              </motion.div>
            )} */}
            <div className="flex-1" /> {/* Spacer */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed",
                currentTheme.bg,
                currentTheme.text,
                currentTheme.ring,
                "hover:ring-1 ring-offset-2 ring-offset-zinc-950",
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t("cta.start")
                )}
                {!isLoading && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-current",
                )}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
