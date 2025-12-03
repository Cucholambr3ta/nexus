import { SERVICES_DATA, ServiceMode } from "@/lib/services-data";
import { notFound } from "next/navigation";
import { ServiceContent } from "@/components/services/service-content";

// Generate static params for all services
export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug: slug,
  }));
}

interface ServicePageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Validate slug
  if (!["software", "web", "agent"].includes(slug)) {
    notFound();
  }

  const serviceMode = slug as ServiceMode;
  const data = SERVICES_DATA[serviceMode];

  return <ServiceContent mode={serviceMode} image={data.image} />;
}
