import { TrendingUp, TrendingDown } from "lucide-react";
import { CountUp } from "./CountUp";
import { formatIndianCurrency } from "@/data/mockData";

interface KPICardProps {
  label: string;
  value: number;
  change?: number;
  borderColor: string;
  prefix?: string;
  suffix?: string;
  warning?: string;
  children?: React.ReactNode;
  delay?: number;
}

export function KPICard({ label, value, change, borderColor, prefix = "₹", suffix, warning, children, delay = 0 }: KPICardProps) {
  return (
    <div
      className="bg-card-gradient rounded-2xl border border-border card-shadow p-8 relative overflow-hidden animate-fade-up hover:card-shadow-hover hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] opacity-80"
        style={{ background: `linear-gradient(to right, ${borderColor}, transparent)` }}
      />
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none" style={{ backgroundColor: borderColor }} />
      <p className="text-sm text-muted-foreground mb-2 font-medium tracking-wide">{label}</p>
      <div className="font-mono-data text-3xl font-bold text-card-foreground animate-count-up" style={{ animationDelay: `${delay + 200}ms` }}>
        <CountUp end={value} formatter={prefix === "₹" ? formatIndianCurrency : undefined} prefix={prefix === "₹" ? "" : prefix} suffix={suffix} />
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-1 text-sm ${change >= 0 ? "text-success" : "text-destructive"}`}>
          {change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{change >= 0 ? "+" : ""}{change}% vs last month</span>
        </div>
      )}
      {warning && (
        <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning-foreground border border-warning/20">
          ⚠ {warning}
        </span>
      )}
      {children}
    </div>
  );
}
