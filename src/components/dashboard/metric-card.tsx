import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
}

export function MetricCard({
  title,
  value,
  trend,
  trendLabel,
}: MetricCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-zinc-100">{value}</div>
        {trend !== undefined && (
          <div
            className={`flex items-center text-xs font-medium ${isPositive ? "text-emerald-400" : isNegative ? "text-red-400" : "text-zinc-500"}`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-1" />
            ) : isNegative ? (
              <ArrowDownRight className="w-3 h-3 mr-1" />
            ) : (
              <Minus className="w-3 h-3 mr-1" />
            )}
            {Math.abs(trend)}% {trendLabel}
          </div>
        )}
      </div>
    </div>
  );
}
