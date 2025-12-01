"use client";

import { useState } from "react";
import Image from "next/image";
import { NexusTerminal } from "@/components/nexus-terminal";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ServicesSection } from "@/components/services-section";

type Mode = 'software' | 'web' | 'agent';

export default function Home() {
  const [mode, setMode] = useState<Mode>('software');

  return (
    // Contenedor Principal con fondo oscuro y centrado
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden bg-zinc-950 selection:bg-zinc-800 selection:text-white">
      
      {/* Interactive Particles Background */}
      <ParticlesBackground mode={mode} />

      {/* Fondo de Cuadrícula Sutil (Grid Pattern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-100 pointer-events-none" />

      {/* Contenido Central (zIndex para estar sobre el fondo) */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl w-full py-12">

        {/* ---> HEADER CON AVATAR CUCHO (Adaptado a PNG 694x631) <--- */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/*
            Contenedor del Avatar:
            Define un tamaño cuadrado fijo (w-24 h-24 en móvil, w-32 h-32 en escritorio).
            'rounded-full' y 'overflow-hidden' crean el círculo perfecto.
          */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl shadow-zinc-900/50 border-2 border-zinc-800 group flex-shrink-0 bg-white">
            <Image
              // ⚠️ Nombre actualizado a .png
              src="/cuchoprofile.jpg"
              alt="CuchoLambreta AI Avatar"
              // 'fill' hace que la imagen ocupe todo el contenedor cuadrado
              fill
              // 'object-cover' es la CLAVE: adapta tus 694x631 al círculo sin deformar.
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              // Prioridad alta para carga instantánea
              priority
              sizes="(max-width: 768px) 96px, 128px"
            />
            {/* Anillo de brillo sutil sobre la imagen */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>

          {/* Textos de Cabecera */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
              CuchoLambreta Nexus
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              Operador del Ecosistema Enterprise. <br className="hidden md:block" />
              Cuéntame tu idea, yo orquestaré la arquitectura.
            </p>
          </div>
        </div>
        {/* ---> FIN HEADER <--- */}

        {/* La Terminal Interactiva */}
        <div className="w-full mt-6">
          <NexusTerminal mode={mode} setMode={setMode} />
        </div>

        {/* Services Section */}
        <div className="w-full mt-32">
          <ServicesSection />
        </div>

        {/* Footer simple */}
        <footer className="absolute bottom-4 text-xs text-zinc-600 font-mono">
          © {new Date().getFullYear()} CuchoLambreta Corp. Neural Systems.
        </footer>
      </div>
    </main>
  );
}