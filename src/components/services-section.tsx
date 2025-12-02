"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layout, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ServicesSection() {
  const t = useTranslations("Index");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const services = [
    {
      id: "software",
      title: t("services.software.title"),
      subtitle: t("services.software.subtitle"),
      description: t("services.software.description"),
      tags: ["Node.js", "Python", "Kubernetes"],
      icon: Cpu,
      color: "indigo",
      theme: {
        border: "border-indigo-500/50",
        bg: "bg-indigo-500/10",
        text: "text-indigo-400",
        ring: "ring-indigo-500/50",
      },
    },
    {
      id: "web",
      title: t("services.web.title"),
      subtitle: t("services.web.subtitle"),
      description: t("services.web.description"),
      tags: ["Next.js 14", "Tailwind", "Framer Motion"],
      icon: Layout,
      color: "rose",
      theme: {
        border: "border-rose-500/50",
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        ring: "ring-rose-500/50",
      },
    },
    {
      id: "agent",
      title: t("services.agent.title"),
      subtitle: t("services.agent.subtitle"),
      description: t("services.agent.description"),
      tags: ["OpenAI", "n8n", "RAG"],
      icon: Bot,
      color: "emerald",
      theme: {
        border: "border-emerald-500/50",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        ring: "ring-emerald-500/50",
      },
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-24 relative z-10">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {t("team.title")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          {t("team.subtitle")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => {
          const isSelected = selectedId === service.id;
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              layout
              onClick={() => setSelectedId(isSelected ? null : service.id)}
              className={cn(
                "relative overflow-hidden rounded-xl border bg-card/40 backdrop-blur-sm cursor-pointer transition-colors duration-300",
                isSelected
                  ? service.theme.border
                  : "border-border hover:border-primary/50",
              )}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Icon & Header */}
                <motion.div
                  layout="position"
                  className="flex items-start justify-between mb-4"
                >
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      service.theme.bg,
                      service.theme.text,
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={cn(
                        "text-xs font-mono px-2 py-1 rounded-full border",
                        service.theme.border,
                        service.theme.text,
                      )}
                    >
                      ACTIVE
                    </motion.div>
                  )}
                </motion.div>

                <motion.h3
                  layout="position"
                  className="text-xl font-bold text-card-foreground mb-1"
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  layout="position"
                  className="text-sm text-muted-foreground font-medium"
                >
                  {service.subtitle}
                </motion.p>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border/50"
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-muted border border-border text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
