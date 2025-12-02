"use client";

import { useActionState } from "react";
import { updatePassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { useEffect } from "react";

const initialState = {
  message: "",
  error: "",
  success: "",
};

export function ClientSettings() {
  const [state, formAction, isPending] = useActionState(updatePassword, initialState);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">Security Settings</h2>
        <p className="text-zinc-400">
          Manage your password and account security preferences.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="currentPassword"
            className="text-sm font-medium text-zinc-300"
          >
            Current Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-zinc-300"
            >
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                minLength={8}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-zinc-300"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
