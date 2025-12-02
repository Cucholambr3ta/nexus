"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface DynamicDescriptionProps {
  mode: "discovery" | "software" | "web" | "agent";
  scope: "enterprise" | "personal";
}

export function DynamicDescription({ mode, scope }: DynamicDescriptionProps) {
  const t = useTranslations("DynamicDescription");

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={`${mode}-${scope}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-mono text-zinc-400 text-center"
        >
          {t(`${mode}.${scope}`)}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
