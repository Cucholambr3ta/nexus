"use client";

import { ServiceMode } from "@/lib/services-data";
import { useScope } from "@/components/scope-provider";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { useRef } from "react";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { useTranslations } from "next-intl";

interface ServiceContentProps {
  mode: ServiceMode;
  image: string;
}

export function ServiceContent({ mode, image }: ServiceContentProps) {
  const { scope } = useScope();
  const t = useTranslations(`ServicesData.${mode}.${scope}`);
  const tPage = useTranslations("ServicesPage"); // Assuming some general keys might be here or just hardcoded English in original file?
  // The original file had hardcoded English for "The Diagnosis", "Pain Point", etc.
  // I should probably use translations for those too if I want full i18n.
  // But for now, I will focus on the dynamic content from ServicesData.
  // Actually, I should check if I added those static strings to en.json/es.json.
  // In ServiceView I used "ServicesPage" namespace for "diagnosisSubtitle", "painPoint", etc.
  // I should check if I can reuse them or if I should add them.
  // The original ServiceContent has "The Diagnosis", "Why the traditional approach is failing you.", "Pain Point", "Our Solution", "Traditional Agencies", "Cucho Lambreta", "Execution Roadmap", "Tangible Deliverables", "100% Risk-Free Guarantee", "Ready to Start?", "Initiate the ... protocol...".

  // I will use the keys I added to ServicesPage if they match, or hardcode them if they are not there (but better to add them).
  // Let's check what I have in ServicesPage in es.json/en.json.
  // "diagnosisSubtitle": "Por qué el enfoque tradicional te está fallando.",
  // "painPoint": "Punto de Dolor",
  // "solution": "Nuestra Solución",
  // "roadmap": "Roadmap de Ejecución",
  // "deliverables": "Entregables Tangibles",
  // "guarantee": "Garantía 100% Libre de Riesgo",
  // "ready": "¿Listo para Empezar?",
  // "initProtocol": "Iniciar Protocolo"

  // So I can use these.

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  // Helper for arrays
  const problems = t.raw('diagnosis.problems') as string[];
  const comparison = t.raw('diagnosis.comparison') as { them: string; us: string }[];
  const steps = t.raw('roadmap.steps') as { title: string; description: string }[];
  const deliverables = t.raw('deliverables') as string[];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white overflow-hidden"
    >
      <ParticlesBackground mode={mode} />

      {/* --- 1. HERO SECTION (Split Hero) --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 z-10 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: The Hook */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left order-2 lg:order-1"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-mono uppercase tracking-wider mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Nexus
            </Link>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-xs font-mono uppercase tracking-wider mb-6 text-zinc-400`}
            >
              <span
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${t('hero.gradient')}`}
              ></span>
              {mode.toUpperCase()} PROTOCOL
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-b ${t('hero.gradient')} from-white to-zinc-500`}
              >
                {t('hero.title')}
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-xl leading-relaxed mb-8">
              {t('hero.subtitle')}
            </p>

            <Link href={`/?mode=${mode}`}>
              <button
                className={`group relative px-8 py-4 rounded-full text-base font-bold bg-white text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 overflow-hidden`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${t('hero.gradient')} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
              </button>
            </Link>
          </motion.div>

          {/* Right Column: The Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            {/* Glow Effect */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl opacity-20 bg-gradient-to-r ${t('hero.gradient')} -z-10`}
            ></div>

            {/* Floating Image */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-md aspect-square"
            >
              {/* Using next/image for optimization */}
              <div className="relative w-full h-full">
                <NextImage
                  src={image}
                  alt={t('hero.title')}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity, scale }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-[10px] uppercase tracking-widest">
            Scroll to Initialize
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent"></div>
        </motion.div>
      </section>

      {/* --- 2. THE DIAGNOSIS (Truth Table) --- */}
      <section className="py-32 px-6 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('diagnosis.title')}
            </h2>
            <p className="text-zinc-400 text-lg">
              {tPage('diagnosisSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Pain & Solution Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/5 border border-red-500/10 p-8 rounded-2xl backdrop-blur-sm"
            >
              <h3 className="text-red-400 font-mono text-sm uppercase tracking-wider mb-2">
                {tPage('painPoint')}
              </h3>
              <p className="text-2xl font-bold text-red-100">
                {t('diagnosis.painPoint')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-2xl backdrop-blur-sm"
            >
              <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-wider mb-2">
                {tPage('solution')}
              </h3>
              <p className="text-2xl font-bold text-emerald-100">
                {t('diagnosis.solution')}
              </p>
            </motion.div>
          </div>

          {/* Glassmorphism Truth Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl"
          >
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-950/50">
              <div className="p-6 text-center text-zinc-500 font-mono text-sm uppercase tracking-wider">
                Traditional Agencies
              </div>
              <div
                className={`p-6 text-center font-mono text-sm uppercase tracking-wider bg-zinc-900/80 border-l border-zinc-800 text-white`}
              >
                Cucho Lambreta
              </div>
            </div>
            {comparison.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 border-b border-zinc-800/50 last:border-0 group"
              >
                <div className="p-6 text-zinc-500 flex items-center gap-4 group-hover:bg-red-950/10 transition-colors">
                  <XCircle className="w-5 h-5 text-red-500/40 flex-shrink-0" />
                  <span>{item.them}</span>
                </div>
                <div className="p-6 text-zinc-200 border-l border-zinc-800/50 flex items-center gap-4 font-medium bg-zinc-900/20 group-hover:bg-emerald-950/10 transition-colors">
                  <CheckCircle2
                    className={`w-5 h-5 text-${mode === "software" ? "indigo" : mode === "web" ? "rose" : "emerald"}-500 flex-shrink-0`}
                  />
                  <span>{item.us}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 3. THE ROADMAP (Vertical Timeline) --- */}
      <section className="py-32 px-6 bg-zinc-900/20 border-y border-zinc-800/50 z-10 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            {tPage('roadmap')}
          </h2>

          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-1/2 top-32 bottom-0 w-px bg-zinc-800 -translate-x-1/2"></div>
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className={`absolute left-[15px] md:left-1/2 top-32 bottom-0 w-px bg-gradient-to-b ${t('hero.gradient')} -translate-x-1/2 origin-top`}
          ></motion.div>

          <div className="space-y-24 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 md:text-right md:px-12">
                  {idx % 2 === 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Phase 0{idx + 1}
                      </h3>
                      <p className="text-zinc-400 text-lg">{step.description}</p>
                    </div>
                  )}
                  {/* Mobile View */}
                  <div className="md:hidden pl-12">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Phase 0{idx + 1}
                    </h3>
                    <p className="text-zinc-400">{step.description}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-0 md:left-1/2 -translate-x-[2px] md:-translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,1)]">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${t('hero.gradient')}`}
                  ></div>
                </div>

                <div className="flex-1 md:px-12">
                  {idx % 2 !== 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Phase 0{idx + 1}
                      </h3>
                      <p className="text-zinc-400 text-lg">{step.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. DELIVERABLES (Grid) --- */}
      <section className="py-32 px-6 max-w-6xl mx-auto z-10 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {tPage('deliverables')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {deliverables.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-600 transition-all hover:-translate-y-1 group flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-zinc-400 group-hover:text-white" />
              </div>
              <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* --- 5. GUARANTEE (Trust Badge) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-amber-900/10 to-yellow-900/10 border border-amber-500/20 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto text-center md:text-left"
        >
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <ShieldCheck className="w-10 h-10 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-100 mb-2">
              {tPage('guarantee')}
            </h3>
            <p className="text-amber-200/80 text-lg leading-relaxed">
              {t('guarantee')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- 6. FINAL CTA (The Loop) --- */}
      <section className="py-32 px-6 text-center z-10 relative border-t border-zinc-800/50 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
            {tPage('ready')}
          </h2>
          <p className="text-xl text-zinc-400 mb-12">
            Initiate the {mode} protocol in the terminal to begin your
            transformation.
          </p>

          <Link href={`/?mode=${mode}`}>
            <button
              className={`group relative px-10 py-5 rounded-full text-lg font-bold bg-white text-black hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3 mx-auto overflow-hidden`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {tPage('initProtocol')}{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${t('hero.gradient')} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
