import { KPICard } from "@/components/KPICard";
import { kpiData as defaultKpi, monthlyRevenueExpense as defaultMonthly, topProducts as defaultProducts, paymentModes as defaultPaymentModes, formatIndianCurrency } from "@/data/mockData";
import { CountUp } from "@/components/CountUp";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function OverviewPage() {
  const [showAnomaly, setShowAnomaly] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseDay = async () => {
    setIsClosing(true);
    try {
      await api.post("/notify/close-day");
      toast.success("Daily summary sent to Telegram! 📊", { style: { background: "#10B981", color: "white", border: "none" } });
    } catch (e: any) {
      toast.error("Failed to send. Please ensure your Telegram ID is set in Settings.");
    } finally {
      setIsClosing(false);
    }
  };

  const { data: topProducts = defaultProducts } = useQuery({
    queryKey: ["topProducts"],
    queryFn: async () => {
      const { data } = await api.get("/analytics/top-products");
      return data;
    }
  });

  const { data: kpiData = defaultKpi } = useQuery({
    queryKey: ["kpiData"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/finance/kpi");
        return data.kpiData || defaultKpi;
      } catch (e) {
        return defaultKpi;
      }
    }
  });

  const { data: monthlyRevenueExpense = defaultMonthly } = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/finance/monthly");
        return data.monthlyRevenueExpense || defaultMonthly;
      } catch (e) {
        return defaultMonthly;
      }
    }
  });

  const { data: paymentModes = defaultPaymentModes } = useQuery({
    queryKey: ["paymentModes"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/finance/payments");
        return data.paymentModes || defaultPaymentModes;
      } catch (e) {
        return defaultPaymentModes;
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <button
          onClick={handleCloseDay}
          disabled={isClosing}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_16px_rgba(99,102,241,0.4)] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className={`w-4 h-4 ${isClosing ? "animate-pulse" : ""}`} />
          {isClosing ? "Sending Report..." : "Close for the Day"}
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label={kpiData.totalRevenue.label} value={kpiData.totalRevenue.value} change={kpiData.totalRevenue.change} borderColor="#10B981" delay={0} />
        <KPICard label={kpiData.netProfit.label} value={kpiData.netProfit.value} change={kpiData.netProfit.change} borderColor="#6366F1" delay={80} />
        <KPICard label={kpiData.cashBalance.label} value={kpiData.cashBalance.value} borderColor="#F59E0B" warning={`Shortage in ${kpiData.cashBalance.warningDays} days`} delay={160} />
        <div
          className="bg-card-gradient rounded-2xl border border-border card-shadow p-8 relative overflow-hidden animate-fade-up hover:card-shadow-hover hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out"
          style={{ animationDelay: "240ms" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] opacity-80" style={{ background: `linear-gradient(to right, #6366F1, transparent)` }} />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none" style={{ backgroundColor: "#6366F1" }} />
          <p className="text-sm text-muted-foreground mb-2 font-medium tracking-wide">{kpiData.healthScore.label}</p>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 88 88">
                <circle cx="44" cy="44" r="38" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                <circle
                  cx="44" cy="44" r="38" fill="none" stroke="#6366F1" strokeWidth="6"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - kpiData.healthScore.value / 100)}
                  strokeLinecap="round"
                  style={{ animation: "ring-fill 1.5s ease-out forwards" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono-data text-sm font-bold text-foreground">
                <CountUp end={kpiData.healthScore.value} />
              </span>
            </div>
            <div>
              <p className="font-mono-data text-xl font-bold text-foreground">{kpiData.healthScore.value} / {kpiData.healthScore.max}</p>
              <p className="text-xs text-muted-foreground">{kpiData.healthScore.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly */}
      {showAnomaly && (
        <div className="flex items-start gap-4 p-6 rounded-2xl border border-warning/20 shadow-[0_4px_24px_rgba(245,158,11,0.12)] bg-gradient-to-r from-warning/5 to-transparent animate-fade-up relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-warning" />
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Expense spike detected in March</p>
            <p className="text-xs text-muted-foreground">₹71,000 vs avg ₹57,000 (↑24.5%). Raw material emergency purchase flagged.</p>
          </div>
          <button onClick={() => setShowAnomaly(false)} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
        </div>
      )}

      {/* Main Chart + Side Panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card-gradient rounded-2xl border border-border card-shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-foreground tracking-wide">Revenue vs Expenses — Last 12 Months</h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyRevenueExpense} barGap={4}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", backdropFilter: "blur(12px)", backgroundColor: "rgba(255,255,255,0.8)" }}
                formatter={(value: number) => formatIndianCurrency(value)}
              />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[6, 6, 0, 0]} name="Revenue" />
              <Bar dataKey="expense" fill="url(#colorExpense)" radius={[6, 6, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-card-gradient rounded-2xl border border-border card-shadow p-8 hover:card-shadow-hover transition-all duration-300">
            <h3 className="font-display font-semibold text-foreground mb-4 tracking-wide">Top 5 Products</h3>
            <div className="space-y-2">
              {topProducts.map((p) => (
                <div key={p.name} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <span className="text-xs text-muted-foreground w-4">{p.rank}</span>
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: p.trend === "up" ? "#10B981" : p.trend === "down" ? "#F43F5E" : "#9CA3AF" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <p className="font-mono-data text-xs text-muted-foreground">{formatIndianCurrency(p.revenue)}</p>
                  </div>
                  {p.trend === "up" ? <TrendingUp className="w-4 h-4 text-success" /> :
                   p.trend === "down" ? <TrendingDown className="w-4 h-4 text-destructive" /> :
                   <Minus className="w-4 h-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Mode */}
          <div className="bg-card-gradient rounded-2xl border border-border card-shadow p-8 hover:card-shadow-hover transition-all duration-300">
            <h3 className="font-display font-semibold text-foreground mb-4 tracking-wide">Payment Mode Split</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={paymentModes} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                  {paymentModes.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {paymentModes.map((p) => (
                <div key={p.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
                  {p.name} ({p.value}%)
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
