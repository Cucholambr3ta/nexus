"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Plus,
  LogOut,
  Moon,
  Sun,
  Search,
} from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-[9999]"
    >
      <div className="flex items-center border-b border-zinc-800 px-3">
        <Search className="w-5 h-5 text-zinc-500 mr-2" />
        <Command.Input
          placeholder="Type a command or search..."
          className="flex-1 h-12 bg-transparent outline-none text-zinc-200 placeholder:text-zinc-500 font-mono text-sm"
        />
      </div>

      <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <Command.Empty className="py-6 text-center text-sm text-zinc-500">
          No results found.
        </Command.Empty>

        <Command.Group
          heading="Navigation"
          className="text-xs font-medium text-zinc-500 px-2 py-1.5 mb-2"
        >
          <Command.Item
            onSelect={() => runCommand(() => router.push("/dashboard"))}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push("/dashboard/sales"))}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            <span>Sales CRM</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push("/dashboard/team"))}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Team</span>
          </Command.Item>
        </Command.Group>

        <Command.Group
          heading="Actions"
          className="text-xs font-medium text-zinc-500 px-2 py-1.5 mb-2"
        >
          <Command.Item
            onSelect={() =>
              runCommand(() => router.push("/dashboard/sales?action=new"))
            }
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Deal</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => setTheme("dark"))}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <Moon className="w-4 h-4" />
            <span>Dark Mode</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => setTheme("light"))}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <Sun className="w-4 h-4" />
            <span>Light Mode</span>
          </Command.Item>
        </Command.Group>

        <Command.Group
          heading="Active Projects"
          className="text-xs font-medium text-zinc-500 px-2 py-1.5 mb-2"
        >
          {/* Mock Projects for now */}
          <Command.Item
            onSelect={() => runCommand(() => router.push("/projects/alpha"))}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Project Alpha</span>
          </Command.Item>
          <Command.Item
            onSelect={() => runCommand(() => router.push("/projects/beta"))}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer aria-selected:bg-zinc-900 aria-selected:text-white transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Project Beta</span>
          </Command.Item>
        </Command.Group>

        <Command.Separator className="h-px bg-zinc-800 my-2" />

        <Command.Group heading="System">
          <Command.Item
            onSelect={() => runCommand(() => {})}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer aria-selected:bg-red-500/10 aria-selected:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
