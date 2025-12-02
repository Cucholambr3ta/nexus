// import { auth } from "@/auth";
import prisma from "@/lib/prisma";
// import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// import bcrypt from "bcryptjs";

export default async function TeamPage() {
  // const session = await auth();

  // Basic RBAC: Only allow access if logged in (and ideally if role is ADMIN, but for now just logged in)
  // if (!session?.user) {
  //   redirect("/api/auth/signin");
  // }

  let users;
  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to fetch users:", e);
    // Mock data for build resilience
    users = [
      { id: "1", name: "Admin User", email: "admin@example.com", role: "ADMIN", createdAt: new Date() },
      { id: "2", name: "Dev User", email: "dev@example.com", role: "DEV", createdAt: new Date() },
    ];
  }

  /*
  async function createUser(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!email || !password) return;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });
      revalidatePath("/dashboard/team");
    } catch (e) {
      console.error("Failed to create user:", e);
    }
  }
  */

  return (
    <div className="p-8 max-w-4xl mx-auto text-zinc-100">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
        Team Management
      </h1>

      {/* Create User Form */}
      {/*
      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl mb-12 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-zinc-300">
          Add New Member
        </h2>
        <form
          action={createUser}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500/50 outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500/50 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500/50 outline-none"
          />
          <select
            name="role"
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-indigo-500/50 outline-none"
          >
            <option value="DEV">Developer</option>
            <option value="ADMIN">Admin</option>
            <option value="CLIENT">Client</option>
          </select>
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Create User
          </button>
        </form>
      </div>
      */}

      {/* User List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-zinc-300">
          Active Members
        </h2>
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-lg hover:border-zinc-700 transition-colors"
            >
              <div>
                <p className="font-medium text-zinc-200">
                  {user.name || "Unnamed"}
                </p>
                <p className="text-sm text-zinc-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    user.role === "ADMIN"
                      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                      : user.role === "CLIENT"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {user.role}
                </span>
                <span className="text-xs text-zinc-600 font-mono">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
