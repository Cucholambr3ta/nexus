"use client";

import { useState } from "react";
import { ClientSettings } from "@/components/dashboard/client-settings";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface ClientDashboardViewProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ClientDashboardView({ user }: ClientDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "settings">("overview");

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-mono selection:bg-indigo-900/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-white tracking-tight">
              Nexus<span className="text-zinc-500">Client</span>
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "overview" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "settings" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Settings
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                {user.name?.[0] || "C"}
              </div>
              <span className="text-sm text-zinc-400">{user.name || "Client"}</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {activeTab === "overview" ? (
          <div className="space-y-12">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {user.name?.split(" ")[0] || "Partner"}
                </h1>
                <p className="text-zinc-400">
                  Here is the status of your active protocols.
                </p>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2">
                <LifeBuoy className="w-4 h-4" />
                Request Support
              </Button>
            </div>

            {/* Section A: Projects Grid */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Active Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mock Project Card 1 */}
                <div className="group relative bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all hover:-translate-y-1">
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                    <Zap className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Enterprise CRM Core
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                    Custom CRM implementation with automated workflows and AI-driven insights.
                  </p>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[75%]" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-zinc-500">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                </div>

                {/* Mock Project Card 2 */}
                <div className="group relative bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 hover:border-rose-500/50 transition-all hover:-translate-y-1">
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Planning
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors">
                    <LayoutDashboard className="w-6 h-6 text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Marketing Analytics Dashboard
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                    Real-time visualization of marketing campaigns and conversion metrics.
                  </p>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[15%]" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-zinc-500">
                    <span>Progress</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section B: Documents Table */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Recent Documents
              </h2>
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/60">
                      <th className="px-6 py-4 font-medium text-zinc-400">Document Name</th>
                      <th className="px-6 py-4 font-medium text-zinc-400">Type</th>
                      <th className="px-6 py-4 font-medium text-zinc-400">Date</th>
                      <th className="px-6 py-4 font-medium text-zinc-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr className="group hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                        <FileText className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                        Q4 Service Agreement.pdf
                      </td>
                      <td className="px-6 py-4 text-zinc-400">Contract</td>
                      <td className="px-6 py-4 text-zinc-500">Oct 24, 2024</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="group hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                        <FileText className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                        CRM User Manual v1.0.pdf
                      </td>
                      <td className="px-6 py-4 text-zinc-400">Manual</td>
                      <td className="px-6 py-4 text-zinc-500">Nov 02, 2024</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr className="group hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                        <FileText className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                        Invoice #INV-2024-001.pdf
                      </td>
                      <td className="px-6 py-4 text-zinc-400">Invoice</td>
                      <td className="px-6 py-4 text-zinc-500">Nov 15, 2024</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
             <div className="mb-8 flex items-center gap-2 text-zinc-500">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Account Settings</span>
             </div>
            <ClientSettings />
          </div>
        )}
      </main>
    </div>
  );
}
