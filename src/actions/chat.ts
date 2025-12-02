"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMessages(channelName: string = "general") {
  try {
    // Ensure channel exists
    let channel = await prisma.channel.findUnique({
      where: { name: channelName },
    });

    if (!channel) {
      channel = await prisma.channel.create({
        data: { name: channelName },
      });
    }

    const messages = await prisma.message.findMany({
      where: { channelId: channel.id },
      orderBy: { createdAt: "asc" },
      include: { user: true },
      take: 50,
    });

    return { success: true, data: messages };
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return { success: false, error: "Failed to fetch messages" };
  }
}

export async function sendMessage(
  content: string,
  channelName: string = "general",
) {
  try {
    const channel = await prisma.channel.findUnique({
      where: { name: channelName },
    });

    if (!channel) {
      throw new Error("Channel not found");
    }

    // In a real app, we'd get the user ID from the session.
    // For now, we'll create a message without a user (System/AI) or assume a mock user if needed.
    // To simulate "Hybrid", if the content starts with "AI:", we treat it as AI.

    const message = await prisma.message.create({
      data: {
        content,
        channelId: channel.id,
        // userId: session?.user?.id
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: message };
  } catch (error) {
    console.error("Failed to send message:", error);
    return { success: false, error: "Failed to send message" };
  }
}
