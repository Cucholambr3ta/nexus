"use server";

import { z } from "zod";

const projectRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.enum([
    "Web Development",
    "Software Engineering",
    "AI Integration",
    "Consulting",
  ]),
  budget: z.string().optional(),
  description: z.string().min(10, "Please provide a brief description"),
});

export type ProjectRequestData = z.infer<typeof projectRequestSchema>;

export async function submitProjectRequest(data: ProjectRequestData) {
  const result = projectRequestSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid form data" };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("N8N_WEBHOOK_URL is not defined. Simulating success.");
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Request received (Simulation)" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...result.data,
        timestamp: new Date().toISOString(),
        source: "CuchoLambreta Nexus",
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    return { success: true, message: "Request sent successfully" };
  } catch (error) {
    console.error("Failed to submit to n8n:", error);
    return {
      success: false,
      error: "Failed to submit request. Please try again later.",
    };
  }
}
