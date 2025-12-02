import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layout, Bot, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ServiceMode } from "@/lib/services-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  onSelect?: (mode: ServiceMode) => void;
}

export function ServicesSection({ onSelect }: ServicesSectionProps) {
  const t = useTranslations("Index");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const services = [
    {
      id: "software",
      title: t("services.software.title"),
      subtitle: t("services.software.subtitle"),
      description: t("services.software.description"),
      tags: ["Node.js", "Python", "Kubernetes"],
      icon: Cpu,
      colSpan: "md:col-span-2",
      gradient: "from-indigo-500/20 via-purple-500/20 to-blue-500/20",
      border: "hover:border-indigo-500/50",
    },
    {
      id: "web",
      title: t("services.web.title"),
      subtitle: t("services.web.subtitle"),
      description: t("services.web.description"),
      tags: ["Next.js 14", "Tailwind", "Framer Motion"],
      icon: Layout,
      colSpan: "md:col-span-1",
      gradient: "from-rose-500/20 via-orange-500/20 to-red-500/20",
      border: "hover:border-rose-500/50",
    },
    {
      id: "agent",
      title: t("services.agent.title"),
      subtitle: t("services.agent.subtitle"),
      description: t("services.agent.description"),
      tags: ["OpenAI", "n8n", "RAG"],
      icon: Bot,
      colSpan: "md:col-span-3",
      gradient: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
      border: "hover:border-emerald-500/50",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            {t("team.title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("team.subtitle")}
          </p>
        </div>
        <div className="hidden md:block pb-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Capabilities v2.0
          </span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              className={cn("group relative", service.colSpan)}
              onHoverStart={() => setHoveredId(service.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className={cn(
                  "h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500",
                  service.border,
                  "hover:shadow-2xl hover:shadow-primary/5"
                )}
              >
                {/* Dynamic Gradient Background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  service.gradient
                )} />

                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-background/50 border border-border/50 backdrop-blur-md">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-primary/80">
                    {service.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-background/50 border border-border/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="relative z-10 pt-0 mt-auto">
                  {onSelect && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between group/btn hover:bg-background/50"
                      onClick={() => onSelect(service.id as ServiceMode)}
                    >
                      <span className="font-medium">Explore Capabilities</span>
                      <Sparkles className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
