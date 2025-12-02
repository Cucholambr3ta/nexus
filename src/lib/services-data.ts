export interface ServiceContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    image: string;
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

export type ServiceMode = 'software' | 'web' | 'agent';

export const SERVICES_DATA: Record<
  ServiceMode,
  { enterprise: ServiceContent; personal: ServiceContent }
> = {
  software: {
    enterprise: {
      hero: {
        title: "Enterprise-Grade Software Architecture",
        subtitle: "Mission-Critical Systems for High-Scale Operations",
        description:
          "We engineer robust, scalable, and secure software ecosystems designed to handle millions of transactions. Our focus is on modernizing legacy infrastructure and ensuring ISO 27001 compliance while maintaining 99.99% availability.",
        cta: "Schedule Architecture Review",
        image: "/service-software.png",
        gradient: "from-blue-500 to-cyan-500",
      },
      diagnosis: {
        title: "Is Your Infrastructure Holding You Back?",
        problems: [
          "Legacy systems creating technical debt and slowing innovation.",
          "Security vulnerabilities risking ISO 27001 non-compliance.",
          "Inability to scale horizontally during peak load events.",
          "Fragmented data silos preventing unified analytics.",
        ],
        painPoint: "Technical Debt & Risk",
        solution: "Modernization & Compliance",
        comparison: [
          { them: "Patchwork Fixes", us: "Holistic Architecture" },
          { them: "Security Afterthought", us: "Security First" },
          { them: "Manual Scaling", us: "Auto-Scaling" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Audit & Discovery",
            description:
              "Deep-dive analysis of current architecture, security posture, and code quality.",
          },
          {
            title: "Strategic Migration Plan",
            description:
              "Phased roadmap to transition from monoliths to microservices without downtime.",
          },
          {
            title: "Core Implementation",
            description:
              "Development of high-availability backend services and secure API gateways.",
          },
          {
            title: "Optimization & Handoff",
            description:
              "Performance tuning, load testing, and comprehensive documentation for internal teams.",
          },
        ],
      },
      deliverables: [
        "Microservices Architecture Blueprint",
        "ISO 27001 Compliance Report",
        "High-Availability Cluster Setup",
        "Legacy Migration Strategy",
        "Automated CI/CD Pipelines",
      ],
      guarantee:
        "We guarantee zero data loss during migration and a minimum 20% improvement in system throughput, or we continue optimization at no cost.",
      faq: [
        {
          question: "How do you handle legacy data migration?",
          answer:
            "We use a strangler fig pattern to incrementally migrate functionality and data, ensuring zero downtime and data integrity verification at every step.",
        },
        {
          question: "Can you work with our internal security team?",
          answer:
            "Absolutely. We integrate directly with your SecOps processes to ensure all code meets your specific compliance and security standards.",
        },
      ],
    },
    personal: {
      hero: {
        title: "Rapid MVP Development",
        subtitle: "From Concept to Market in Weeks, Not Months",
        description:
          "Launch your startup idea with a scalable, cost-efficient MVP. We prioritize speed to market and core functionality, giving you the traction you need to secure funding and grow.",
        cta: "Start Your Build",
        image: "/service-software.png",
        gradient: "from-blue-500 to-cyan-500",
      },
      diagnosis: {
        title: "Struggling to Launch?",
        problems: [
          "Overwhelmed by technical complexity and choice paralysis.",
          "Fear of building features that users don't want.",
          "Limited budget requiring strict cost efficiency.",
          "Slow development cycles missing market windows.",
        ],
        painPoint: "Complexity & Cost",
        solution: "Lean MVP Strategy",
        comparison: [
          { them: "Over-Engineering", us: "Core Value Focus" },
          { them: "Slow Development", us: "Rapid Iteration" },
          { them: "High Initial Cost", us: "Cost-Effective" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Concept Validation",
            description:
              "Refining your idea into a lean technical specification focused on core value.",
          },
          {
            title: "Rapid Prototyping",
            description:
              "Building a functional prototype to test user flows and gather initial feedback.",
          },
          {
            title: "MVP Development",
            description:
              "Agile development of the production-ready MVP using scalable cloud-native tech.",
          },
          {
            title: "Launch & Iterate",
            description:
              "Deployment to production and setup of analytics to measure user behavior.",
          },
        ],
      },
      deliverables: [
        "Fully Functional MVP",
        "Scalable Cloud Architecture",
        "Mobile-Responsive UI",
        "Admin Dashboard",
        "Analytics Integration",
      ],
      guarantee:
        "We deliver a working MVP within the agreed timeline and budget. If we miss the deadline, we work for free until it's live.",
      faq: [
        {
          question: "What tech stack do you use?",
          answer:
            "We choose the best tool for the job, typically modern stacks like React, Node.js, and Supabase for rapid development and easy scalability.",
        },
        {
          question: "Can I scale this later?",
          answer:
            "Yes. We build with scale in mind, using modular code and cloud infrastructure that can grow with your user base.",
        },
      ],
    },
  },
  web: {
    enterprise: {
      hero: {
        title: "Global Digital Experience Platforms",
        subtitle: "Dominating Brand Presence at Scale",
        description:
          "We build enterprise-grade web platforms that enforce brand authority and deliver lightning-fast experiences globally. Utilizing advanced design systems and edge-network CDNs, we ensure consistency and performance across all markets.",
        cta: "Elevate Your Brand",
        image: "/service-web.png",
        gradient: "from-purple-500 to-pink-500",
      },
      diagnosis: {
        title: "Is Your Digital Presence Fragmented?",
        problems: [
          "Inconsistent brand representation across regional sites.",
          "Slow page loads damaging SEO and user retention.",
          "Difficulty managing content updates globally.",
          "Lack of accessibility compliance (WCAG) exposing legal risk.",
        ],
        painPoint: "Brand Fragmentation",
        solution: "Unified Design System",
        comparison: [
          { them: "Inconsistent UI", us: "Pixel-Perfect Consistency" },
          { them: "Slow Performance", us: "Edge-Network Speed" },
          { them: "Hard to Manage", us: "Headless CMS" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Global Audit",
            description:
              "Review of current web estate, performance metrics, and brand consistency.",
          },
          {
            title: "Design System Creation",
            description:
              "Developing a unified component library to ensure brand integrity everywhere.",
          },
          {
            title: "Platform Engineering",
            description:
              "Building a headless CMS architecture with global CDN distribution.",
          },
          {
            title: "Rollout & Training",
            description:
              "Phased launch of regional sites and training for content teams.",
          },
        ],
      },
      deliverables: [
        "Global Design System",
        "Headless CMS Integration",
        "Global CDN Configuration",
        "WCAG 2.1 AA Compliance",
        "Advanced Analytics Dashboard",
      ],
      guarantee:
        "We guarantee a Google Lighthouse performance score of 90+ and full WCAG compliance, ensuring your brand leads the market.",
      faq: [
        {
          question: "How do you handle multi-language support?",
          answer:
            "We implement robust internationalization (i18n) frameworks deeply integrated with the CMS, allowing for seamless content localization.",
        },
        {
          question: "Will this integrate with our CRM?",
          answer:
            "Yes, we build custom connectors to sync user data and leads directly into Salesforce, HubSpot, or your preferred CRM.",
        },
      ],
    },
    personal: {
      hero: {
        title: "High-Impact Personal Branding",
        subtitle: "Visual Identity That Commands Attention",
        description:
          "Stand out in a crowded market with a stunning, high-performance portfolio site. We focus on visual impact and storytelling to elevate your personal brand and convert visitors into opportunities.",
        cta: "Build Your Brand",
        image: "/service-web.png",
        gradient: "from-purple-500 to-pink-500",
      },
      diagnosis: {
        title: "Are You Invisible Online?",
        problems: [
          "Generic website templates that fail to impress.",
          "Portfolio not effectively showcasing your best work.",
          "Low conversion rates from site visitors.",
          "Difficulty updating content without technical help.",
        ],
        painPoint: "Generic Online Presence",
        solution: "Custom Brand Identity",
        comparison: [
          { them: "Cookie-Cutter Templates", us: "Bespoke Design" },
          { them: "Static Content", us: "Dynamic Storytelling" },
          { them: "Low Conversion", us: "High Impact" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Brand Discovery",
            description:
              "Defining your unique value proposition and visual identity.",
          },
          {
            title: "Visual Design",
            description:
              "Creating high-fidelity mockups that capture your personality and professional edge.",
          },
          {
            title: "Development",
            description:
              "Coding a pixel-perfect, responsive website with smooth animations.",
          },
          {
            title: "Content Strategy",
            description:
              "Optimizing your copy and project case studies for maximum impact.",
          },
        ],
      },
      deliverables: [
        "Custom Portfolio Website",
        "Visual Identity Kit",
        "CMS for Easy Updates",
        "SEO Optimization",
        "Social Media Integration",
      ],
      guarantee:
        "You will love your new site. We offer unlimited design revisions during the design phase until you are 100% satisfied.",
      faq: [
        {
          question: "Do I need to know how to code?",
          answer:
            "Not at all. We provide an easy-to-use content management system so you can update your text and images anytime.",
        },
        {
          question: "How long does it take?",
          answer:
            "Typically, we can launch a high-impact personal site in 2-4 weeks, depending on the complexity and content readiness.",
        },
      ],
    },
  },
  agent: {
    enterprise: {
      hero: {
        title: "Enterprise AI Workforce",
        subtitle: "Automating Operations for Massive ROI",
        description:
          "Deploy intelligent AI agents that operate 24/7 to optimize workflows, analyze big data, and drive efficiency. We build secure, private AI solutions that integrate with your enterprise stack to deliver measurable ROI.",
        cta: "Automate Your Enterprise",
        image: "/service-agent.png",
        gradient: "from-emerald-500 to-green-500",
      },
      diagnosis: {
        title: "Drowning in Operational Inefficiency?",
        problems: [
          "High operational costs due to repetitive manual tasks.",
          "Slow response times affecting customer satisfaction.",
          "Inability to derive actionable insights from massive datasets.",
          "Human error risks in critical workflows.",
        ],
        painPoint: "Operational Inefficiency",
        solution: "AI Automation",
        comparison: [
          { them: "Manual Labor", us: "AI Workforce" },
          { them: "Reactive Support", us: "Proactive Agents" },
          { them: "Data Silos", us: "Actionable Insights" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Workflow Analysis",
            description:
              "Identifying high-value targets for automation within your operations.",
          },
          {
            title: "Agent Architecture",
            description:
              "Designing secure AI agents tailored to specific business functions.",
          },
          {
            title: "Integration & Training",
            description:
              "Connecting agents to your data lakes and APIs, and fine-tuning models.",
          },
          {
            title: "Deployment & Monitoring",
            description:
              "Rolling out agents with comprehensive oversight and performance tracking.",
          },
        ],
      },
      deliverables: [
        "Custom AI Agent Suite",
        "Private LLM Deployment",
        "Real-time Analytics Dashboard",
        "24/7 Operational Uptime",
        "ROI Impact Report",
      ],
      guarantee:
        "We guarantee a minimum 30% reduction in processing time for automated workflows within the first quarter of deployment.",
      faq: [
        {
          question: "Is our data secure?",
          answer:
            "Yes. We deploy private instances of AI models within your secure infrastructure, ensuring no data ever leaves your control.",
        },
        {
          question: "Can agents handle complex decision making?",
          answer:
            "Our agents are designed with 'human-in-the-loop' protocols for complex scenarios, escalating to human experts when confidence thresholds aren't met.",
        },
      ],
    },
    personal: {
      hero: {
        title: "Your Personal Digital Butler",
        subtitle: "Reclaim Your Time and Mental Health",
        description:
          "Imagine a life where mundane tasks are handled automatically. Our personal AI agents act as your digital butler, managing schedules, emails, and research, giving you back the freedom to focus on what matters.",
        cta: "Get Your Assistant",
        image: "/service-agent.png",
        gradient: "from-emerald-500 to-green-500",
      },
      diagnosis: {
        title: "Feeling Overwhelmed?",
        problems: [
          "Constant context switching killing your productivity.",
          "Email inbox always overflowing.",
          "Missing important appointments or deadlines.",
          "Zero time for personal growth or relaxation.",
        ],
        painPoint: "Time Scarcity",
        solution: "Personal AI Butler",
        comparison: [
          { them: "Disorganized Chaos", us: "Automated Order" },
          { them: "Missed Opportunities", us: "Perfect Timing" },
          { them: "Burnout", us: "Peace of Mind" },
        ],
      },
      roadmap: {
        steps: [
          {
            title: "Lifestyle Assessment",
            description:
              "Understanding your daily friction points and automation needs.",
          },
          {
            title: "Agent Configuration",
            description:
              "Setting up your personal AI with access to your calendar and tools.",
          },
          {
            title: "Automation Setup",
            description:
              "Creating workflows for email filtering, scheduling, and information retrieval.",
          },
          {
            title: "Onboarding",
            description:
              "Teaching you how to interact effectively with your new digital assistant.",
          },
        ],
      },
      deliverables: [
        "Personalized AI Assistant",
        "Email & Calendar Integration",
        "Automated Research Tools",
        "Daily Briefing System",
        "Mobile Access App",
      ],
      guarantee:
        "If you don't save at least 10 hours a week in your first month, we'll refund your setup fee.",
      faq: [
        {
          question: "Is it difficult to set up?",
          answer:
            "No, we handle all the technical configuration. You just connect your accounts and start chatting with your assistant.",
        },
        {
          question: "What about my privacy?",
          answer:
            "Your personal agent is configured with strict privacy controls. We do not sell or share your personal data.",
        },
      ],
    },
  },
};
