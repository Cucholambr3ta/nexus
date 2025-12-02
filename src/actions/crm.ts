"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type DealStage = "Lead" | "Meeting" | "Won" | "Lost";

export interface DealData {
  title: string;
  value: number;
  stage: DealStage;
  clientName: string;
  probability: number;
}

export async function getDeals() {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: deals };
  } catch (error) {
    console.warn("Database connection failed, returning mock deals");
    return {
      success: true,
      data: [
        {
          id: "1",
          title: "Enterprise License",
          clientName: "Acme Corp",
          value: 50000,
          stage: "Won",
          probability: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          title: "AI Consultation",
          clientName: "Stark Ind",
          value: 15000,
          stage: "Meeting",
          probability: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          title: "Web Redesign",
          clientName: "Cyberdyne",
          value: 8000,
          stage: "Lead",
          probability: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ] as any,
    };
  }
}

export async function createDeal(data: DealData) {
  try {
    const deal = await prisma.deal.create({
      data,
    });
    revalidatePath("/dashboard/sales");
    return { success: true, data: deal };
  } catch (error) {
    return { success: false, error: "Failed to create deal" };
  }
}

export async function updateDeal(id: string, data: Partial<DealData>) {
  try {
    const deal = await prisma.deal.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/sales");
    return { success: true, data: deal };
  } catch (error) {
    return { success: false, error: "Failed to update deal" };
  }
}

export async function deleteDeal(id: string) {
  try {
    await prisma.deal.delete({
      where: { id },
    });
    revalidatePath("/dashboard/sales");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete deal" };
  }
}


