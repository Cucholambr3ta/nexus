"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { ServiceContent } from "@/lib/services-data";
import { cn } from "@/lib/utils";

interface ServiceViewProps {
  content: ServiceContent;
  mode: string;
  scope: string;
}

export function ServiceView({ content, mode, scope }: ServiceViewProps) {
  const themeColors = {
    software: "indigo",
    web: "rose",
    agent: scope === "enterprise" ? "emerald" : "amber",
  };

  const color = themeColors[mode as keyof typeof themeColors] || "indigo";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* HERO SECTION */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border",
                  `bg-${color}-500/10 text-${color}-400 border-${color}-500/20`,
                )}
              >
                {scope} Edition
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
            >
              {content.hero.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-zinc-400 leading-relaxed max-w-lg"
            >
              {content.hero.description}
            </motion.p>

            <motion.button
              variants={itemVariants}
              className={cn(
                "group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105",
                `bg-${color}-600 hover:bg-${color}-500 text-white shadow-lg shadow-${color}-500/25`,
              )}
            >
              {content.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <motion.div variants={itemVariants} className="relative">
            {/* Backlight Glow */}
            <div
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] opacity-40 pointer-events-none",
                `bg-${color}-500`,
              )}
            />

            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 backdrop-blur-sm">
              {/* Placeholder for 3D render if image fails or is missing */}
              <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-mono text-sm">
                3D RENDER PLACEHOLDER
              </div>
              <Image
                src={content.hero.image}
                alt={content.hero.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* DIAGNOSIS SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <AlertCircle className={cn("w-8 h-8", `text-${color}-400`)} />
              {content.diagnosis.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.diagnosis.problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0",
                      `bg-${color}-500`,
                    )}
                  />
                  <p className="text-zinc-300">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ROADMAP SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            Execution Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.roadmap.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div
                  className={cn(
                    "absolute -left-4 top-0 bottom-0 w-[1px] md:w-full md:h-[1px] md:left-0 md:-top-8 bg-zinc-800",
                    "group-first:bg-gradient-to-b md:group-first:bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800",
                  )}
                />
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-4 relative z-10 border-2 bg-black",
                    `border-${color}-500 text-${color}-400`,
                  )}
                >
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* DELIVERABLES & GUARANTEE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Deliverables</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2
                    className={cn("w-5 h-5", `text-${color}-400`)}
                  />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-8 border relative overflow-hidden",
              `bg-${color}-950/20 border-${color}-500/30`,
            )}
          >
            <div
              className={cn(
                "absolute inset-0 opacity-10 bg-gradient-to-br",
                `from-${color}-500 to-transparent`,
              )}
            />
            <h3
              className={cn(
                "text-2xl font-bold mb-4 relative z-10",
                `text-${color}-400`,
              )}
            >
              Ironclad Guarantee
            </h3>
            <p className="text-zinc-300 relative z-10 leading-relaxed">
              {content.guarantee}
            </p>
          </motion.div>
        </div>

        {/* FAQ SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {content.faq.map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900/30 border border-white/5 rounded-xl p-6"
              >
                <h4 className="font-bold mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                  {item.question}
                </h4>
                <p className="text-zinc-400 pl-8">{item.answer}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
