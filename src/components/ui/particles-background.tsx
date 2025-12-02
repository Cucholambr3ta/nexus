"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  mode: "discovery" | "software" | "web" | "agent";
  agentScope?: "enterprise" | "personal";
}

export function ParticlesBackground({
  mode,
  agentScope = "enterprise",
}: ParticlesBackgroundProps) {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const color = useMemo(() => {
    switch (mode) {
      case "discovery":
        return "#a1a1aa"; // Zinc-400
      case "software":
        return "#6366f1"; // Indigo
      case "web":
        return "#f43f5e"; // Rose
      case "agent":
        return agentScope === "personal" ? "#d97706" : "#10b981"; // Amber (Personal) or Emerald (Enterprise)
      default:
        return "#a1a1aa";
    }
  }, [mode, agentScope]);

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        // Key forces re-initialization when mode or scope changes
        key={`${mode}-${agentScope}`}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              grab: {
                distance: 200, // Increased distance
                links: {
                  opacity: 0.8, // Increased opacity
                },
              },
            },
          },
          particles: {
            color: {
              value: color,
            },
            links: {
              color: color,
              distance: 150,
              enable: true,
              opacity: 0.6, // Increased opacity
              width: 1.5, // Increased width
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5, // Slightly faster
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 60, // Increased count
            },
            opacity: {
              value: 0.6, // Increased opacity
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 2, max: 4 }, // Increased size
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
