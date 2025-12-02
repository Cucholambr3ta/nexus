export interface ServiceContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    gradient: string;
  };
  diagnosis: {
    title: string;
    problems: string[];
    painPoint: string;
    solution: string;
    comparison: { them: string; us: string }[];
  };
  roadmap: {
    steps: { title: string; description: string }[];
  };
  deliverables: string[];
  guarantee: string;
  faq: { question: string; answer: string }[];
}

export interface ServiceGroup {
  image: string;
  enterprise: ServiceContent;
  personal: ServiceContent;
}

export type ServiceMode = 'software' | 'web' | 'agent';

export const SERVICES_DATA: Record<ServiceMode, ServiceGroup> = {
  software: {
    image: "/service-software.png",
    enterprise: {
      hero: {
        title: "Ingeniería de Grado Militar",
        subtitle: "Sistemas de Misión Crítica para Operaciones de Alta Escala",
        description:
          "Diseñamos ecosistemas de software robustos, escalables y seguros. Modernizamos infraestructura heredada garantizando cumplimiento ISO 27001 y disponibilidad del 99.99%.",
        cta: "Agendar Revisión de Arquitectura",
        gradient: "from-blue-500 to-cyan-500",
      },
      diagnosis: {
        title: "¿Tu Infraestructura te está Frenando?",
        problems: [
          "Sistemas heredados generando deuda técnica.",
          "Vulnerabilidades de seguridad y riesgo de cumplimiento.",
          "Incapacidad de escalar horizontalmente en picos de carga.",
          "Silos de datos fragmentados que impiden analítica unificada.",
        ],
        painPoint: "Deuda Técnica",
        solution: "Microservicios Inmutables",
        comparison: [
          { them: "Parches Temporales", us: "Arquitectura Holística" },
          { them: "Seguridad Reactiva", us: "Security First" },
          { them: "Escalado Manual", us: "Auto-Scaling Nativo" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Auditoría y Descubrimiento",
            description:
              "Análisis profundo de arquitectura actual, postura de seguridad y calidad de código.",
          },
          {
            title: "Plan de Migración Estratégico",
            description:
              "Roadmap por fases para transicionar de monolitos a microservicios sin downtime.",
          },
          {
            title: "Implementación Core",
            description:
              "Desarrollo de servicios backend de alta disponibilidad y API gateways seguros.",
          },
          {
            title: "Optimización y Entrega",
            description:
              "Tuning de rendimiento, pruebas de carga y documentación exhaustiva para equipos internos.",
          },
        ],
      },
      deliverables: [
        "Blueprint de Microservicios",
        "Reporte de Cumplimiento ISO 27001",
        "Cluster de Alta Disponibilidad",
        "Estrategia de Migración",
        "Pipelines CI/CD Automatizados",
      ],
      guarantee:
        "Garantizamos cero pérdida de datos durante la migración y una mejora mínima del 20% en throughput, o continuamos optimizando sin costo.",
      faq: [
        {
          question: "¿Cómo manejan la migración de datos legacy?",
          answer:
            "Usamos el patrón 'Strangler Fig' para migrar funcionalidad incrementalmente, asegurando cero downtime y verificación de integridad de datos paso a paso.",
        },
        {
          question: "¿Pueden trabajar con nuestro equipo de seguridad?",
          answer:
            "Absolutamente. Nos integramos con tus procesos de SecOps para asegurar que todo el código cumpla con tus estándares específicos.",
        },
      ],
    },
    personal: {
      hero: {
        title: "Materializa tu Startup",
        subtitle: "De Concepto a Mercado en Semanas, No Meses",
        description:
          "Lanza tu idea con un MVP escalable y costo-eficiente. Priorizamos velocidad de mercado y funcionalidad core para que logres tracción y financiamiento.",
        cta: "Iniciar Construcción",
        gradient: "from-blue-500 to-cyan-500",
      },
      diagnosis: {
        title: "¿Luchando por Lanzar?",
        problems: [
          "Abrumado por complejidad técnica y parálisis por análisis.",
          "Miedo a construir features que los usuarios no quieren.",
          "Presupuesto limitado requiriendo eficiencia extrema.",
          "Ciclos de desarrollo lentos perdiendo ventanas de mercado.",
        ],
        painPoint: "Agencias lentas",
        solution: "MVP en semanas",
        comparison: [
          { them: "Sobre-Ingeniería", us: "Foco en Valor Core" },
          { them: "Desarrollo Lento", us: "Iteración Rápida" },
          { them: "Costo Inicial Alto", us: "Costo-Efectivo" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Validación de Concepto",
            description:
              "Refinamiento de tu idea en una especificación técnica lean enfocada en valor.",
          },
          {
            title: "Prototipado Rápido",
            description:
              "Construcción de prototipo funcional para testear flujos de usuario y feedback inicial.",
          },
          {
            title: "Desarrollo de MVP",
            description:
              "Desarrollo ágil del MVP listo para producción usando tecnología cloud-native.",
          },
          {
            title: "Lanzamiento e Iteración",
            description:
              "Despliegue a producción y configuración de analítica para medir comportamiento.",
          },
        ],
      },
      deliverables: [
        "MVP Totalmente Funcional",
        "Arquitectura Cloud Escalable",
        "UI Mobile-Responsive",
        "Dashboard de Administración",
        "Integración de Analítica",
      ],
      guarantee:
        "Entregamos un MVP funcional en el tiempo y presupuesto acordado. Si fallamos, trabajamos gratis hasta que esté vivo.",
      faq: [
        {
          question: "¿Qué stack tecnológico usan?",
          answer:
            "Elegimos la mejor herramienta, típicamente stacks modernos como React, Node.js y Supabase para desarrollo rápido y escalabilidad.",
        },
        {
          question: "¿Puedo escalar esto después?",
          answer:
            "Sí. Construimos pensando en escala, usando código modular e infraestructura cloud que crece con tu base de usuarios.",
        },
      ],
    },
  },
  web: {
    image: "/service-web.png",
    enterprise: {
      hero: {
        title: "Identidad Corporativa Blindada",
        subtitle: "Presencia de Marca Dominante a Escala Global",
        description:
          "Construimos plataformas web de grado empresarial que imponen autoridad de marca y entregan experiencias ultra-rápidas globalmente. Usando design systems avanzados y CDNs edge-network.",
        cta: "Elevar tu Marca",
        gradient: "from-purple-500 to-pink-500",
      },
      diagnosis: {
        title: "¿Tu Presencia Digital está Fragmentada?",
        problems: [
          "Representación de marca inconsistente en sitios regionales.",
          "Cargas lentas dañando SEO y retención de usuarios.",
          "Dificultad gestionando actualizaciones de contenido global.",
          "Falta de cumplimiento de accesibilidad (WCAG) exponiendo riesgo legal.",
        ],
        painPoint: "Sitios lentos dañan la marca",
        solution: "Design Systems Globales",
        comparison: [
          { them: "UI Inconsistente", us: "Consistencia Pixel-Perfect" },
          { them: "Performance Lenta", us: "Velocidad Edge-Network" },
          { them: "Difícil de Gestionar", us: "Headless CMS" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Auditoría Global",
            description:
              "Revisión del estado web actual, métricas de performance y consistencia de marca.",
          },
          {
            title: "Creación de Design System",
            description:
              "Desarrollo de librería de componentes unificada para asegurar integridad de marca.",
          },
          {
            title: "Ingeniería de Plataforma",
            description:
              "Construcción de arquitectura Headless CMS con distribución CDN global.",
          },
          {
            title: "Rollout y Entrenamiento",
            description:
              "Lanzamiento por fases de sitios regionales y capacitación a equipos de contenido.",
          },
        ],
      },
      deliverables: [
        "Design System Global",
        "Integración Headless CMS",
        "Configuración CDN Global",
        "Cumplimiento WCAG 2.1 AA",
        "Dashboard de Analítica Avanzada",
      ],
      guarantee:
        "Garantizamos un puntaje Google Lighthouse de 90+ y cumplimiento WCAG total, asegurando que tu marca lidere el mercado.",
      faq: [
        {
          question: "¿Cómo manejan el soporte multi-idioma?",
          answer:
            "Implementamos frameworks de internacionalización (i18n) robustos integrados profundamente con el CMS.",
        },
        {
          question: "¿Se integrará con nuestro CRM?",
          answer:
            "Sí, construimos conectores a medida para sincronizar datos de usuarios y leads directamente a Salesforce, HubSpot, etc.",
        },
      ],
    },
    personal: {
      hero: {
        title: "Tu Portafolio, Tu Legado",
        subtitle: "Identidad Visual que Comanda Atención",
        description:
          "Destaca en un mercado saturado con un sitio de portafolio impresionante y de alto rendimiento. Nos enfocamos en impacto visual y storytelling para elevar tu marca personal.",
        cta: "Construir mi Marca",
        gradient: "from-purple-500 to-pink-500",
      },
      diagnosis: {
        title: "¿Eres Invisible Online?",
        problems: [
          "Plantillas genéricas que no impresionan a nadie.",
          "Portafolio que no muestra tu mejor trabajo efectivamente.",
          "Bajas tasas de conversión de visitantes.",
          "Dificultad para actualizar contenido sin ayuda técnica.",
        ],
        painPoint: "Ser invisible",
        solution: "Impacto Visual Inmediato",
        comparison: [
          { them: "Plantillas Genéricas", us: "Diseño A Medida" },
          { them: "Contenido Estático", us: "Storytelling Dinámico" },
          { them: "Bajo Impacto", us: "Conversión Alta" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Descubrimiento de Marca",
            description:
              "Definición de tu propuesta de valor única e identidad visual.",
          },
          {
            title: "Diseño Visual",
            description:
              "Creación de mockups de alta fidelidad que capturan tu personalidad y profesionalismo.",
          },
          {
            title: "Desarrollo",
            description:
              "Codificación de un sitio pixel-perfect, responsivo y con animaciones fluidas.",
          },
          {
            title: "Estrategia de Contenido",
            description:
              "Optimización de tu copy y casos de estudio para máximo impacto.",
          },
        ],
      },
      deliverables: [
        "Sitio Web de Portafolio Custom",
        "Kit de Identidad Visual",
        "CMS para Actualizaciones Fáciles",
        "Optimización SEO",
        "Integración Redes Sociales",
      ],
      guarantee:
        "Amarás tu nuevo sitio. Ofrecemos revisiones de diseño ilimitadas hasta que estés 100% satisfecho.",
      faq: [
        {
          question: "¿Necesito saber programar?",
          answer:
            "Para nada. Proveemos un CMS fácil de usar para que actualices textos e imágenes cuando quieras.",
        },
        {
          question: "¿Cuánto tiempo toma?",
          answer:
            "Típicamente lanzamos un sitio personal de alto impacto en 2-4 semanas.",
        },
      ],
    },
  },
  agent: {
    image: "/service-agent.png",
    enterprise: {
      hero: {
        title: "Revolución de Productividad",
        subtitle: "Automatizando Operaciones para ROI Masivo",
        description:
          "Despliega agentes de IA inteligentes que operan 24/7 para optimizar flujos, analizar big data e impulsar eficiencia. Soluciones seguras y privadas que se integran a tu stack.",
        cta: "Automatizar Empresa",
        gradient: "from-emerald-500 to-green-500",
      },
      diagnosis: {
        title: "¿Ahogado en Ineficiencia Operativa?",
        problems: [
          "Altos costos operativos por tareas manuales repetitivas.",
          "Tiempos de respuesta lentos afectando satisfacción del cliente.",
          "Incapacidad de derivar insights de grandes volúmenes de datos.",
          "Riesgos de error humano en flujos críticos.",
        ],
        painPoint: "Costos operativos altos",
        solution: "Fuerza Laboral Autónoma 24/7",
        comparison: [
          { them: "Labor Manual", us: "Fuerza de Trabajo IA" },
          { them: "Soporte Reactivo", us: "Agentes Proactivos" },
          { them: "Silos de Datos", us: "Insights Accionables" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Análisis de Flujos",
            description:
              "Identificación de objetivos de alto valor para automatización en tus operaciones.",
          },
          {
            title: "Arquitectura de Agentes",
            description:
              "Diseño de agentes de IA seguros adaptados a funciones de negocio específicas.",
          },
          {
            title: "Integración y Entrenamiento",
            description:
              "Conexión de agentes a tus data lakes y APIs, y fine-tuning de modelos.",
          },
          {
            title: "Despliegue y Monitoreo",
            description:
              "Rollout de agentes con supervisión integral y tracking de performance.",
          },
        ],
      },
      deliverables: [
        "Suite de Agentes IA Custom",
        "Despliegue de LLM Privado",
        "Dashboard de Analítica Real-time",
        "Uptime Operacional 24/7",
        "Reporte de Impacto ROI",
      ],
      guarantee:
        "Garantizamos una reducción mínima del 30% en tiempo de procesamiento para flujos automatizados en el primer trimestre.",
      faq: [
        {
          question: "¿Nuestros datos están seguros?",
          answer:
            "Sí. Desplegamos instancias privadas de modelos IA dentro de tu infraestructura segura.",
        },
        {
          question: "¿Pueden los agentes tomar decisiones complejas?",
          answer:
            "Nuestros agentes tienen protocolos 'human-in-the-loop' para escalar a expertos humanos cuando la confianza es baja.",
        },
      ],
    },
    personal: {
      hero: {
        title: "Recupera tu Tiempo",
        subtitle: "Tu Mayordomo Digital Personal",
        description:
          "Imagina una vida donde las tareas mundanas se manejan solas. Nuestros agentes personales gestionan agendas, correos e investigación, devolviéndote la libertad.",
        cta: "Obtener Asistente",
        gradient: "from-emerald-500 to-green-500",
      },
      diagnosis: {
        title: "¿Sintiéndote Abrumado?",
        problems: [
          "Cambio de contexto constante matando tu productividad.",
          "Bandeja de entrada siempre desbordada.",
          "Perdiendo citas o fechas límite importantes.",
          "Cero tiempo para crecimiento personal o relajación.",
        ],
        painPoint: "Burnout por tareas repetitivas",
        solution: "Asistente Personal Digital",
        comparison: [
          { them: "Caos Desorganizado", us: "Orden Automatizado" },
          { them: "Oportunidades Perdidas", us: "Timing Perfecto" },
          { them: "Burnout", us: "Paz Mental" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Evaluación de Estilo de Vida",
            description:
              "Entendimiento de tus puntos de fricción diarios y necesidades de automatización.",
          },
          {
            title: "Configuración del Agente",
            description:
              "Setup de tu IA personal con acceso a tu calendario y herramientas.",
          },
          {
            title: "Setup de Automatización",
            description:
              "Creación de flujos para filtrado de email, agendamiento y búsqueda de información.",
          },
          {
            title: "Onboarding",
            description:
              "Enseñándote a interactuar efectivamente con tu nuevo asistente digital.",
          },
        ],
      },
      deliverables: [
        "Asistente IA Personalizado",
        "Integración Email y Calendario",
        "Herramientas de Investigación Auto",
        "Sistema de Briefing Diario",
        "App de Acceso Móvil",
      ],
      guarantee:
        "Si no ahorras al menos 10 horas a la semana en tu primer mes, te devolvemos el fee de setup.",
      faq: [
        {
          question: "¿Es difícil de configurar?",
          answer:
            "No, manejamos toda la configuración técnica. Solo conectas tus cuentas y empiezas a chatear.",
        },
        {
          question: "¿Qué hay de mi privacidad?",
          answer:
            "Tu agente personal está configurado con controles de privacidad estrictos. No vendemos ni compartimos tus datos.",
        },
      ],
    },
  },
};
