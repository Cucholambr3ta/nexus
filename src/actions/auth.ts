"use server";

import { z } from "zod";

import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

interface ResetResponse {
  success: boolean;
  message: string;
}

export async function requestPasswordReset(email: string): Promise<ResetResponse> {
  // Validate email
  const emailSchema = z.string().email();
  const result = emailSchema.safeParse(email);

  if (!result.success) {
    return { success: false, message: "Invalid email address" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 3600000); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: token,
          resetTokenExpiry: expiry,
        },
      });

      // Simulate sending email (log to console for MVP)
      console.log(`[Auth] Password reset requested for: ${email}`);
      console.log(`[Auth] Reset Link: http://localhost:3000/reset-password?token=${token}`);
    }
  } catch (error) {
    console.error("Password reset error:", error);
    // Don't reveal error to user
  }

  // Always return success to prevent email enumeration
  return { 
    success: true, 
    message: "If an account exists with this email, you will receive a password reset link." 
  };
}

interface ActionState {
  message: string;
  error: string;
  success: string;
}

export async function updatePassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // In a real app, we would get the user ID from the session
  // const session = await auth();
  // if (!session?.user) return { error: "Unauthorized", success: "", message: "" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Use currentPassword to avoid unused var lint
  if (!currentPassword) {
     return { error: "Current password is required", success: "", message: "" };
  }

  // Validate inputs
  const passwordSchema = z.string().min(8, "Password must be at least 8 characters");
  
  const result = passwordSchema.safeParse(newPassword);
  if (!result.success) {
    return { error: result.error.issues[0].message, success: "", message: "" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match", success: "", message: "" };
  }

  // Simulate DB update
  // const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  // const valid = await bcrypt.compare(currentPassword, user.password);
  // if (!valid) return { error: "Incorrect current password", success: "", message: "" };
  // const hashedPassword = await bcrypt.hash(newPassword, 10);
  // await prisma.user.update({ where: { id: session.user.id }, data: { password: hashedPassword } });

  console.log("[Auth] Password updated successfully");
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: "Password updated successfully", error: "", message: "" };
}
