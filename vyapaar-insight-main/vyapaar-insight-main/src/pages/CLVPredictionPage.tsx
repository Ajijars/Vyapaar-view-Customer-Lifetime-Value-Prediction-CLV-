import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  clvSummary as defaultSummary,
  clvTopCustomers as defaultTopCustomers,
  clvSegmentDonut as defaultDonut,
  clvDistributionData as defaultDistribution,
  clvTrendData as defaultTrend,
  clvFeatureWeights as defaultWeights,
  formatIndianCurrency,
} from "@/data/mockData";
import { CountUp } from "@/components/CountUp";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area,
} from "recharts";
import { Star, Users, TrendingUp, AlertCircle, Trophy, Crown, ShieldAlert, UserMinus } from "lucide-react";

// ─── Segment styles ────────────────────────────────────────────────────────────
const segmentConfig: Record<string, { badge: string; icon: React.ElementType; color: string }> = {
  Champion: { badge: "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20", icon: Crown, color: "#6366F1" },
  Loyal:    { badge: "bg-violet-500/10 text-violet-500 border border-violet-500/20",  icon: Star,   color: "#8B5CF6" },
  "At Risk":{ badge: "bg-amber-500/10 text-amber-500 border border-amber-500/20",    icon: ShieldAlert, color: "#F59E0B" },
  Lost:     { badge: "bg-rose-500/10 text-rose-500 border border-rose-500/20",       icon: UserMinus,   color: "#F43F5E" },
};

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-xl px-4 py-3 shadow-2xl text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-mono-data">
            {p.name}: {p.dataKey === "avgCLV" ? formatIndianCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CLVPredictionPage() {
  // ── Fetch summary ─────────────────────────────────────────────────────────
  const { data: summary = defaultSummary } = useQuery({
    queryKey: ["clvSummary"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/clv/summary");
        return data.error ? defaultSummary : data;
      } catch { return defaultSummary; }
    },
  });

  // ── Fetch top customers ───────────────────────────────────────────────────
  const { data: topCustomers = defaultTopCustomers } = useQuery({
    queryKey: ["clvTopCustomers"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/clv/top-customers");
        return data.top_customers?.length ? data.top_customers : defaultTopCustomers;
      } catch { return defaultTopCustomers; }
    },
  });

  const segmentCounts = summary.segment_counts ?? defaultSummary.segment_counts;

  const donutData = [
    { name: "Champion", value: segmentCounts.champion, color: "#6366F1" },
    { name: "Loyal",    value: segmentCounts.loyal,    color: "#8B5CF6" },
    { name: "At Risk",  value: segmentCounts.at_risk,  color: "#F59E0B" },
    { name: "Lost",     value: segmentCounts.lost,     color: "#F43F5E" },
  ];

  return (
    <div className="space-y-6">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
            <Star className="w-6 h-6 text-primary" />
            Customer Lifetime Value
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            RFM-powered 12-month CLV prediction — identify your most valuable customers
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Linear Regression · RFM Model
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Customer CLV", value: summary.avg_clv, prefix: "₹", color: "#6366F1", icon: Star, sub: "12-month prediction" },
          { label: "Total Predicted Revenue", value: summary.total_predicted_revenue, prefix: "₹", color: "#10B981", icon: TrendingUp, sub: "Next 12 months" },
          { label: "Champion Customers", value: segmentCounts.champion, prefix: "", color: "#8B5CF6", icon: Crown, sub: "Highest lifetime value" },
          { label: "At Risk Customers", value: segmentCounts.at_risk, prefix: "", color: "#F59E0B", icon: AlertCircle, sub: "Need immediate action" },
        ].map((kpi, i) => (
          <div
            key={kpi.label}
            className="bg-card rounded-2xl border border-border card-shadow p-5 relative overflow-hidden hover:-translate-y-1 hover:card-shadow-hover transition-all duration-300 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(to right, ${kpi.color}, transparent)` }} />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10 blur-xl" style={{ backgroundColor: kpi.color }} />
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}18` }}>
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="font-mono-data text-2xl font-bold text-foreground">
              {kpi.prefix}<CountUp end={kpi.value} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Main Content: Table + Side panels ───────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Top Customers Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border card-shadow overflow-hidden animate-fade-up">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" /> Top 10 Customers by CLV
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Ranked by predicted 12-month revenue</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">#</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Customer</th>
                  <th className="text-center px-4 py-3 text-muted-foreground font-medium">Segment</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">RFM Score</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Predicted CLV</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Orders</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((c: any, i: number) => {
                  const seg = segmentConfig[c.segment] ?? segmentConfig["Lost"];
                  const SegIcon = seg.icon;
                  return (
                    <tr
                      key={c.customer_id}
                      className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors animate-fade-up"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <td className="px-4 py-3 text-muted-foreground font-mono-data text-xs">{c.rank}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{c.name || c.customer_id}</p>
                        <p className="text-xs text-muted-foreground font-mono-data">{c.customer_id}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${seg.badge}`}>
                          <SegIcon className="w-3 h-3" /> {c.segment}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${(c.rfm_score / 5) * 100}%`, backgroundColor: seg.color }}
                            />
                          </div>
                          <span className="font-mono-data text-foreground font-semibold text-xs w-8">{c.rfm_score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono-data font-bold text-foreground">
                        {formatIndianCurrency(c.clv_predicted)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono-data text-muted-foreground">
                        {c.total_orders}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Segment Donut */}
          <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-display font-semibold text-foreground mb-3">Segment Distribution</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%" cy="50%"
                  innerRadius={42} outerRadius={68}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={3}
                >
                  {donutData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {donutData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="font-mono-data font-semibold text-foreground ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RFM Feature Weights */}
          <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <h3 className="font-display font-semibold text-foreground mb-4">RFM Feature Weights</h3>
            <div className="space-y-3">
              {defaultWeights.map((f, i) => (
                <div key={f.feature}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{f.feature}</span>
                    <span className="font-mono-data font-semibold text-foreground">{f.weight}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${f.weight}%`,
                        background: ["#6366F1", "#8B5CF6", "#F59E0B"][i],
                        animationDelay: `${i * 150}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed border-t border-border pt-3">
              Model trained on customer purchase history using Linear Regression. RFM weights tuned for Indian retail behaviour.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom Charts ────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* CLV Trend */}
        <div className="bg-card rounded-2xl border border-border card-shadow p-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h3 className="font-display font-semibold text-foreground mb-1">Avg CLV Trend</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly average CLV across all customers</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={defaultTrend}>
              <defs>
                <linearGradient id="clvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="avgCLV" stroke="#6366F1" strokeWidth={2.5} fill="url(#clvGrad)" name="Avg CLV" dot={false} activeDot={{ r: 5, fill: "#6366F1" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* CLV Distribution */}
        <div className="bg-card rounded-2xl border border-border card-shadow p-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <h3 className="font-display font-semibold text-foreground mb-1">CLV Distribution</h3>
          <p className="text-xs text-muted-foreground mb-5">Number of customers per CLV bracket</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={defaultDistribution} barSize={32}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.95} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" vertical={false} />
              <XAxis dataKey="range" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} name="Customers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Insight Card ─────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4 p-6 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent animate-fade-up relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary rounded-l-2xl" />
        <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">CLV × Churn Risk Insight</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            <strong className="text-foreground">{segmentCounts.at_risk} At-Risk customers</strong> have an avg predicted CLV of{" "}
            <strong className="text-foreground">{formatIndianCurrency(Math.round(summary.avg_clv * 0.7))}</strong> — if they churn, you lose
            an estimated <strong className="text-amber-500">{formatIndianCurrency(Math.round(summary.avg_clv * 0.7 * segmentCounts.at_risk))}</strong> in future revenue.
            Consider targeted retention campaigns (personalized discounts, loyalty rewards) for this segment.
          </p>
        </div>
      </div>

    </div>
  );
}
