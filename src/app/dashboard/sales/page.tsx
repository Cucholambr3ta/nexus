import { getDeals } from "@/actions/crm";
import { KanbanView } from "@/components/dashboard/sales/kanban-view";
import { NewDealDialog } from "@/components/dashboard/sales/new-deal-dialog";
import { Deal } from "@prisma/client";

export default async function SalesPage() {
  const { data } = await getDeals();
  const deals = (data as Deal[]) || [];

  const totalPipeline = deals?.reduce((acc, deal) => acc + deal.value, 0) || 0;
  const weightedValue =
    deals?.reduce(
      (acc, deal) => acc + deal.value * (deal.probability / 100),
      0,
    ) || 0;

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen text-zinc-200 font-mono selection:bg-emerald-900/30">
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 w-full">
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
              Total Pipeline
            </h3>
            <div className="text-2xl font-bold text-emerald-400">
              ${totalPipeline.toLocaleString()}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
              Weighted Value
            </h3>
            <div className="text-2xl font-bold text-zinc-100">
              ${weightedValue.toLocaleString()}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
            <h3 className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
              Active Deals
            </h3>
            <div className="text-2xl font-bold text-zinc-100">
              {deals?.length || 0}
            </div>
          </div>
        </div>

        <NewDealDialog />
      </div>

      {/* Kanban Board */}
      <div className="h-[calc(100vh-250px)]">
        <KanbanView initialDeals={deals} />
      </div>
    </div>
  );
}
