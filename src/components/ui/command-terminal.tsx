"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Terminal } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  command: z.string().min(1),
})

interface CommandTerminalProps {
  onExecute: (command: string) => void
  isExecuting: boolean
}

export function CommandTerminal({ onExecute, isExecuting }: CommandTerminalProps) {
  const t = useTranslations("Index")
  const [isFocused, setIsFocused] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      command: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onExecute(values.command)
    form.reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-2xl rounded-xl border bg-card p-4 shadow-sm transition-all duration-300",
        isFocused ? "border-primary/50 shadow-md ring-1 ring-primary/20" : "border-border"
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/50 pb-3 mb-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/20" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
          <div className="h-3 w-3 rounded-full bg-green-500/20" />
        </div>
        <div className="flex items-center gap-1.5 ml-2 text-xs text-muted-foreground font-mono">
          <Terminal className="h-3 w-3" />
          <span>nexus-cli — v1.0.0</span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="relative">
          <span className="absolute left-0 top-0 text-primary font-mono text-lg">{">"}</span>
          <textarea
            {...form.register("command")}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={t("placeholder")}
            className="w-full resize-none bg-transparent pl-6 text-lg font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none min-h-[80px]"
            spellCheck={false}
            disabled={isExecuting}
          />
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isExecuting || !form.formState.isValid}
            className={cn(
              "relative overflow-hidden rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
              isExecuting && "pl-10"
            )}
          >
            <AnimatePresence mode="wait">
              {isExecuting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <span>{isExecuting ? t("establishing") : t("action")}</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}
