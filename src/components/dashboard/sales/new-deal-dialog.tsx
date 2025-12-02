"use client";

import { useState } from "react";
import { createDeal, DealStage } from "@/actions/crm";
import { Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewDealDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    value: "",
    probability: "50",
    stage: "Lead" as DealStage,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createDeal({
      title: formData.title,
      clientName: formData.clientName,
      value: parseFloat(formData.value) || 0,
      probability: parseInt(formData.probability) || 0,
      stage: formData.stage,
    });

    if (result.success) {
      setIsOpen(false);
      setFormData({
        title: "",
        clientName: "",
        value: "",
        probability: "50",
        stage: "Lead",
      });
      router.refresh();
    } else {
      alert("Failed to create deal");
    }
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        New Deal
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">New Deal</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase">
              Deal Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g. Enterprise License Q4"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase">
              Client Name
            </label>
            <input
              required
              type="text"
              value={formData.clientName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientName: e.target.value }))
              }
              placeholder="e.g. Acme Corp"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase">
                Value ($)
              </label>
              <input
                required
                type="number"
                min="0"
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, value: e.target.value }))
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase">
                Probability (%)
              </label>
              <input
                required
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    probability: e.target.value,
                  }))
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase">
              Initial Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  stage: e.target.value as DealStage,
                }))
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Lead">Lead</option>
              <option value="Meeting">Meeting</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
