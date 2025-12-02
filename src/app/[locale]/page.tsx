"use client";

import { useState } from "react";
import Image from "next/image";
import { NexusTerminal } from "@/components/nexus-terminal";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ServicesSection } from "@/components/services-section";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScopeProvider, ScopeSwitcher, useScope } from "@/components/scope-provider";
import { ContextInfoPanel } from "@/components/context-info-panel";
import { ProjectRequestModal } from "@/components/project-request-modal";
import { DynamicDescription } from "@/components/dynamic-description";
import { Plus } from "lucide-react";

type Mode = 'discovery' | 'software' | 'web' | 'agent';

export default function Home() {
  return (
    <ScopeProvider>
      <HomeContent />
    </ScopeProvider>
  );
}

function HomeContent() {
  const t = useTranslations("Index");
  const [mode, setMode] = useState<Mode>('discovery');
  const { scope } = useScope();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition-all text-sm font-medium mr-2"
        >
          <Plus className="w-4 h-4" />
          Start Project
        </button>
        <ScopeSwitcher />
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      {/* Interactive Particles Background */}
      <ParticlesBackground mode={mode} agentScope={scope} />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl w-full py-12">

        {/* Header with Avatar */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl shadow-primary/20 border-2 border-border group flex-shrink-0 bg-card">
            <Image
              src="/cuchoprofile.jpg"
              alt="CuchoLambreta AI Avatar"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
              sizes="(max-width: 768px) 96px, 128px"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>

          {/* Header Text */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/80 to-muted-foreground">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Nexus Terminal */}
        <div className="w-full mt-6">
          <NexusTerminal 
            mode={mode} 
            setMode={setMode} 
          />
        </div>

        {/* Dynamic Description */}
        <DynamicDescription mode={mode} scope={scope} />

        {/* Services Section */}
        <div className="w-full mt-32">
          <ServicesSection />
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} CuchoLambreta Corp. Neural Systems.
        </footer>
      </div>
    </main>
    <ProjectRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}