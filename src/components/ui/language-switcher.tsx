"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "es" : "en";
    startTransition(() => {
      // Replace the locale in the pathname
      // Assuming pathname starts with /locale or is just /
      // This is a simplified replacement, might need robust handling for complex paths
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      router.replace(segments.join("/"));
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      disabled={isPending}
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-accent",
        isPending && "opacity-50",
      )}
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="uppercase">{locale}</span>
    </motion.button>
  );
}
