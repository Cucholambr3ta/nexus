"use client";

import * as React from "react";
import { User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Scope = "personal" | "enterprise";

interface ScopeContextType {
  scope: Scope;
  setScope: (scope: Scope) => void;
}

const ScopeContext = React.createContext<ScopeContextType | undefined>(
  undefined,
);

export function ScopeProvider({ children }: { children: React.ReactNode }) {
  const [scope, setScope] = React.useState<Scope>("personal");

  return (
    <ScopeContext.Provider value={{ scope, setScope }}>
      {children}
    </ScopeContext.Provider>
  );
}

export function useScope() {
  const context = React.useContext(ScopeContext);
  if (context === undefined) {
    throw new Error("useScope must be used within a ScopeProvider");
  }
  return context;
}

export function ScopeSwitcher() {
  const { scope, setScope } = useScope();

  return (
    <div className="flex items-center bg-zinc-950/50 p-1 rounded-full border border-zinc-800/50 backdrop-blur-md shadow-lg">
      <button
        onClick={() => setScope("personal")}
        className={cn(
          "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
          scope === "personal"
            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_-5px_rgba(251,191,36,0.3)]"
            : "text-zinc-500 hover:text-zinc-300 border border-transparent",
        )}
      >
        <User className="w-3.5 h-3.5" />
        <span>Personal</span>
      </button>
      <button
        onClick={() => setScope("enterprise")}
        className={cn(
          "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
          scope === "enterprise"
            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]"
            : "text-zinc-500 hover:text-zinc-300 border border-transparent",
        )}
      >
        <Building2 className="w-3.5 h-3.5" />
        <span>Enterprise</span>
      </button>
    </div>
  );
}
