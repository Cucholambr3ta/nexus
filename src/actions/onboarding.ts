"use server";

export async function onboardClient(dealId: string, clientDetails: { name: string; email: string; username: string }) {
  try {
    // 1. Generate random password
    const password = Math.random().toString(36).slice(-12);
    
    // 2. Create User (Simulated for now due to DB issues)
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = await prisma.user.create({
    //   data: {
    //     name: clientDetails.name,
    //     email: clientDetails.email,
    //     password: hashedPassword,
    //     role: 'CLIENT',
    //     isClient: true
    //   }
    // });

    // 3. Link User to Deal (Optional, if schema supported it directly or via Project)
    
    // 4. Send Email (Simulated)
    console.log(`[Onboarding] Sending credentials to ${clientDetails.email}`);
    console.log(`[Onboarding] Username: ${clientDetails.username}`);
    console.log(`[Onboarding] Password: ${password}`);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { 
      success: true, 
      message: "Client onboarded successfully", 
      credentials: { 
        email: clientDetails.email, 
        password 
      } 
    };
  } catch (error) {
    console.error("Onboarding failed:", error);
    return { success: false, error: "Failed to onboard client" };
  }
}
