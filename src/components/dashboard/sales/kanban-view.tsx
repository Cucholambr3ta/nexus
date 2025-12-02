"use client";

import { useState } from "react";
import { Deal } from "@prisma/client";
import { updateDeal, deleteDeal } from "@/actions/crm";
import { formatDistanceToNow } from "date-fns";
import {
  Loader2,
  MoreHorizontal,
  Trash2,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { OnboardClientDialog } from "./onboard-client-dialog";

interface KanbanViewProps {
  initialDeals: Deal[];
}

const STAGES = ["Lead", "Meeting", "Won", "Lost"];

export function KanbanView({ initialDeals }: KanbanViewProps) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleStageChange = async (dealId: string, newStage: string) => {
    setLoadingId(dealId);
    // Optimistic update
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d)),
    );

    const result = await updateDeal(dealId, { stage: newStage as any });

    if (!result.success) {
      // Revert on failure
      setDeals(initialDeals);
      alert("Failed to update deal stage");
    }
    setLoadingId(null);
    router.refresh();
  };

  const handleDelete = async (dealId: string) => {
    if (!confirm("Are you sure you want to delete this deal?")) return;

    setLoadingId(dealId);
    const result = await deleteDeal(dealId);

    if (result.success) {
      setDeals((prev) => prev.filter((d) => d.id !== dealId));
    } else {
      alert("Failed to delete deal");
    }
    setLoadingId(null);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full min-h-[500px]">
      {STAGES.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage);
        const totalValue = stageDeals.reduce((acc, d) => acc + d.value, 0);

        return (
          <div
            key={stage}
            className="flex flex-col h-full rounded-xl border border-zinc-800 bg-zinc-900/30"
          >
            {/* Column Header */}
            <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    stage === "Lead"
                      ? "bg-blue-500"
                      : stage === "Meeting"
                        ? "bg-amber-500"
                        : stage === "Won"
                          ? "bg-emerald-500"
                          : "bg-red-500"
                  }`}
                />
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  {stage}
                </h3>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded-full">
                  {stageDeals.length}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                ${totalValue.toLocaleString()}
              </span>
            </div>

            {/* Deals List */}
            <div className="flex-1 p-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
              {stageDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="group relative p-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-all hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-zinc-200 text-sm line-clamp-2">
                      {deal.title}
                    </h4>
                    {loadingId === deal.id ? (
                      <Loader2 className="w-3 h-3 animate-spin text-zinc-500" />
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          onClick={() => handleDelete(deal.id)}
                          className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-zinc-500 mb-3">
                    {deal.clientName}
                  </div>

                    <div className="flex justify-between items-end">
                    <div className="font-mono text-sm text-emerald-400 font-medium">
                      ${deal.value.toLocaleString()}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-[10px] text-zinc-600">
                        {formatDistanceToNow(new Date(deal.updatedAt), {
                          addSuffix: true,
                        })}
                      </div>
                      {stage === "Won" && (
                        <OnboardClientDialog deal={deal} />
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-3 pt-2 border-t border-zinc-800/50 flex gap-1 overflow-x-auto pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {STAGES.filter((s) => s !== stage).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStageChange(deal.id, s)}
                        className="text-[10px] px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 whitespace-nowrap"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {stageDeals.length === 0 && (
                <div className="h-24 flex items-center justify-center border-2 border-dashed border-zinc-800/50 rounded-lg">
                  <span className="text-xs text-zinc-700">Empty</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
