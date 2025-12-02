"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ServiceContent } from "@/lib/services-data";
import { useTranslations } from "next-intl";

interface ServiceViewProps {
  mode: 'software' | 'web' | 'agent';
  scope: 'enterprise' | 'personal';
  content: ServiceContent;
  image: string;
  onBack: () => void;
}

export function ServiceView({ mode, scope, content, image, onBack }: ServiceViewProps) {
  const t = useTranslations("ServicesPage");

  const themes = {
    software: {
      bg: "bg-indigo-950/30",
      border: "border-indigo-500/20",
      text: "text-indigo-400",
      gradient: "from-indigo-500/20 via-purple-500/20 to-blue-500/20",
    },
    web: {
      bg: "bg-rose-950/30",
      border: "border-rose-500/20",
      text: "text-rose-400",
      gradient: "from-rose-500/20 via-orange-500/20 to-red-500/20",
    },
    agent: {
      bg: "bg-emerald-950/30",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      gradient: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
    },
  };

  const theme = themes[mode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen w-full bg-background relative z-20 pt-12 pb-24"
    >
      {/* Close Button */}
      <div className="container mx-auto px-4 mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="p-2 rounded-full bg-muted group-hover:bg-muted/80 transition-colors">
            <X className="w-4 h-4" />
          </div>
          <span className="font-medium">Close Details</span>
        </Button>
      </div>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", content.hero.gradient)}>
                  {content.hero.title}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                {content.hero.subtitle}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground/80 leading-relaxed max-w-xl"
            >
              {content.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button size="lg" className={cn("rounded-full font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all", theme.bg.replace('/30', ''))}>
                {content.hero.cta}
              </Button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 z-10", theme.gradient)} />
            <Image
              src={image}
              alt={content.hero.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Diagnosis Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">{content.diagnosis.title}</h2>
            <p className="text-muted-foreground text-lg">{t('diagnosisSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Problems List */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-red-400">
                <X className="w-5 h-5" />
                {t('painPoint')}
              </h3>
              <div className="space-y-4">
                {content.diagnosis.problems.map((problem, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-lg border border-red-500/10 bg-red-950/5 flex items-start gap-3"
                  >
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/50 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Comparison / Solution */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-400">
                <Check className="w-5 h-5" />
                {t('solution')}
              </h3>
              <div className="space-y-4">
                {content.diagnosis.comparison.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-lg border border-emerald-500/10 bg-emerald-950/5"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-red-400/70 line-through">{item.them}</span>
                      <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
                      <span className="text-sm font-medium text-emerald-400">{item.us}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">{t('roadmap')}</h2>
          </div>

          <div className="space-y-8 relative z-10">
            {content.roadmap.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6 rounded-2xl border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2",
                  theme.border,
                  theme.text,
                  theme.bg
                )}>
                  {i + 1}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deliverables & Guarantee */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Check className="w-6 h-6 text-primary" />
              {t('deliverables')}
            </h3>
            <ul className="space-y-4">
              {content.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
            <h3 className="text-2xl font-bold mb-6 text-emerald-400">
              {t('guarantee')}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {content.guarantee}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">{t('faq')}</h2>
          <div className="space-y-4">
            {content.faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <h3 className="font-bold mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('ready')}</h2>
          <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all">
            {t('initProtocol')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
