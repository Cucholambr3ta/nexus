export type ServiceMode = 'software' | 'web' | 'agent';

export const SERVICES_DATA: Record<ServiceMode, { image: string }> = {
  software: {
    image: "/service-software.png",
  },
  web: {
    image: "/service-web.png",
  },
  agent: {
    image: "/service-agent.png",
  },
};
