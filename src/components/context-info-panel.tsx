"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Mode = "discovery" | "software" | "web" | "agent";
type Scope = "personal" | "enterprise";

interface ContextInfoPanelProps {
  mode: Mode;
  scope: Scope;
}

export function ContextInfoPanel({ mode, scope }: ContextInfoPanelProps) {
  const content = {
    discovery: {
      text: "Nuestro Analista IA diagnosticará tu cuello de botella y recomendará la solución exacta.",
      icon: Sparkles,
      color: "text-amber-400",
      showButton: false,
    },
    software: {
      enterprise: {
        text: "Arquitectura de misión crítica y migración de legados.",
        color: "text-indigo-400",
      },
      personal: {
        text: "Desarrollo MVP rápido y escalable.",
        color: "text-indigo-400",
      },
    },
    web: {
      enterprise: {
        text: "Sistemas de diseño global y autoridad de marca.",
        color: "text-rose-400",
      },
      personal: {
        text: "Portafolios de alto impacto y marca personal.",
        color: "text-rose-400",
      },
    },
    agent: {
      enterprise: {
        text: "Automatización operativa y ROI masivo.",
        color: "text-emerald-400",
      },
      personal: {
        text: "Asistente digital personal y bienestar digital.",
        color: "text-amber-400",
      },
    },
  };

  const currentContent =
    mode === "discovery" ? content.discovery : content[mode][scope];

  const Icon = mode === "discovery" ? Sparkles : Info;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${mode}-${scope}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl mx-auto mt-4"
      >
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-zinc-950/40 backdrop-blur-md p-4 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-full bg-white/5",
                  currentContent.color,
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-sm text-zinc-300 font-medium">
                {currentContent.text}
              </p>
            </div>

            {mode !== "discovery" && (
              <Link
                href={`/services/${mode}?scope=${scope}`}
                className={cn(
                  "flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors hover:underline",
                  currentContent.color,
                )}
              >
                Saber más
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          {/* Decorative gradient line */}
          <div
            className={cn(
              "absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20",
              currentContent.color,
            )}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
