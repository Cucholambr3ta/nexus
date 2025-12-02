"use client";

import { useState, useRef, useEffect } from "react";
import { NexusTerminal } from "@/components/nexus-terminal";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ServicesSection } from "@/components/services-section";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScopeProvider, ScopeSwitcher, useScope } from "@/components/scope-provider";
import { ProjectRequestModal } from "@/components/project-request-modal";
import { DynamicDescription } from "@/components/dynamic-description";
import { Plus } from "lucide-react";
import { ServiceView } from "@/components/service-view";
import { SERVICES_DATA, ServiceMode } from "@/lib/services-data";
import { HeroSection } from "@/components/hero-section";

type Mode = 'discovery' | 'software' | 'web' | 'agent';

export default function Home() {
  return (
    <ScopeProvider>
      <HomeContent />
    </ScopeProvider>
  );
}

function HomeContent() {
  const [mode, setMode] = useState<Mode>('discovery');
  const { scope } = useScope();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const serviceViewRef = useRef<HTMLDivElement>(null);

  // Scroll to Service View when mode changes to a service
  useEffect(() => {
    if (mode !== 'discovery' && serviceViewRef.current) {
      setTimeout(() => {
        serviceViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [mode]);

  const serviceData = mode !== 'discovery' ? SERVICES_DATA[mode as ServiceMode] : null;

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none fixed" />

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* Immersive Hero Section */}
        <HeroSection />

        {/* Nexus Terminal */}
        <div className="w-full max-w-4xl mt-12 px-6">
          <NexusTerminal 
            mode={mode} 
            setMode={setMode} 
          />
        </div>

        {/* Dynamic Description */}
        <div className="w-full max-w-4xl px-6 mt-8">
          <DynamicDescription mode={mode} scope={scope} />
        </div>

        {/* Services Section */}
        <div className="w-full mt-24">
          <ServicesSection onSelect={(m) => setMode(m)} />
        </div>

        {/* Footer */}
        <footer className="py-12 text-xs text-muted-foreground font-mono text-center w-full border-t border-border/50 mt-24 bg-background/50 backdrop-blur-sm">
          © {new Date().getFullYear()} CuchoLambreta Corp. Neural Systems.
        </footer>
      </div>

      {/* Inline Service View */}
      {serviceData && (
        <div ref={serviceViewRef} className="w-full relative z-20">
          <ServiceView 
            mode={mode as ServiceMode}
            scope={scope}
            content={scope === 'enterprise' ? serviceData.enterprise : serviceData.personal}
            image={serviceData.image}
            onBack={() => setMode('discovery')}
          />
        </div>
      )}
    </main>
    <ProjectRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}