"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, User, UserPlus, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { onboardClient } from "@/actions/onboarding";

// Local interface to avoid dependency on @prisma/client which might be broken
interface Deal {
  id: string;
  title: string;
  clientName: string;
  value: number;
  stage: string;
  updatedAt: Date;
}

interface OnboardClientDialogProps {
  deal: Deal;
}

export function OnboardClientDialog({ deal }: OnboardClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;

    try {
      const result = await onboardClient(deal.id, { name, email, username });

      if (result.success && result.credentials) {
        setCredentials(result.credentials);
        toast.success("Client onboarded successfully!");
      } else {
        toast.error(result.error || "Failed to onboard client");
      }
    } catch (error) {
      console.error(error); // Log error to use the variable
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (!credentials) return;
    const text = `Email: ${credentials.email}\nPassword: ${credentials.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Credentials copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setOpen(false);
    setCredentials(null);
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 text-xs border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300">
          <UserPlus className="w-3 h-3 mr-1" />
          Onboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Onboard Client</DialogTitle>
          <DialogDescription>
            Create a client account for <strong>{deal.clientName}</strong>. This will generate credentials and email them to the client.
          </DialogDescription>
        </DialogHeader>

        {!credentials ? (
          <form onSubmit={onSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  id="name"
                  name="name"
                  defaultValue={deal.clientName}
                  className="pl-9 bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="client@company.com"
                  className="pl-9 bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  id="username"
                  name="username"
                  placeholder="username"
                  className="pl-9 bg-zinc-900 border-zinc-800"
                  required
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Credentials"
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-4 space-y-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-bold text-emerald-400 mb-1">Account Created!</h3>
              <p className="text-xs text-zinc-400">
                Credentials have been sent to {credentials.email}.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Generated Password</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-800 font-mono text-sm text-zinc-300">
                  {credentials.password}
                </code>
                <Button type="button" size="icon" variant="outline" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-[10px] text-zinc-500">
                Make sure to copy this now if you need to manually share it. It won&apos;t be shown again.
              </p>
            </div>

            <DialogFooter className="pt-4">
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
