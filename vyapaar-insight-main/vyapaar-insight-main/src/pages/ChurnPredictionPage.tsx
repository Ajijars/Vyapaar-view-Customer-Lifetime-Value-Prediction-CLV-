import { churnSummary, churnCustomers, churnDonut, churnFeatureWeights, formatIndianCurrency } from "@/data/mockData";
import { KPICard } from "@/components/KPICard";
import { CountUp } from "@/components/CountUp";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const riskStyles: Record<string, { badge: string; btn: string; btnText: string }> = {
  high: { badge: "bg-destructive/10 text-destructive border border-destructive/20", btn: "bg-destructive text-destructive-foreground", btnText: "Send Offer" },
  medium: { badge: "bg-warning/10 text-warning border border-warning/20", btn: "bg-warning text-warning-foreground", btnText: "Follow Up" },
  low: { badge: "bg-warning/5 text-warning border border-warning/10", btn: "bg-muted text-muted-foreground", btnText: "Monitor" },
  safe: { badge: "bg-success/10 text-success border border-success/20", btn: "", btnText: "" },
};

const riskIcons: Record<string, string> = { high: "🔴", medium: "🟠", low: "🟡", safe: "🟢" };

export default function ChurnPredictionPage() {
  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard label="Total Customers" value={churnSummary.total} borderColor="#6366F1" prefix="" delay={0} />
        <KPICard label="Active" value={churnSummary.active} borderColor="#10B981" prefix="" delay={80} />
        <KPICard label="At Risk" value={churnSummary.atRisk} borderColor="#F59E0B" prefix="" delay={160} />
        <KPICard label="Churned" value={churnSummary.churned} borderColor="#F43F5E" prefix="" delay={240} />
        <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ borderTopWidth: 3, borderTopColor: "#6366F1", animationDelay: "320ms" }}>
          <p className="text-sm text-muted-foreground mb-1">Retention Rate</p>
          <p className="font-mono-data text-2xl font-bold text-foreground"><CountUp end={62} suffix=".3%" /></p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Churn Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border card-shadow overflow-hidden animate-fade-up">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Churn Risk Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Last Purchase</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Days</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Spent</th>
                  <th className="text-center px-4 py-3 text-muted-foreground font-medium">Risk</th>
                  <th className="text-center px-4 py-3 text-muted-foreground font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {churnCustomers.map((c, i) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                    <td className="px-4 py-3 font-mono-data text-foreground font-medium">{c.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.lastPurchase}</td>
                    <td className="px-4 py-3 text-right font-mono-data">{c.daysSince}</td>
                    <td className="px-4 py-3 text-right font-mono-data">{formatIndianCurrency(c.totalSpent)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${riskStyles[c.level].badge}`}>
                        {riskIcons[c.level]} {c.risk}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {riskStyles[c.level].btnText && (
                        <button className={`text-xs px-3 py-1 rounded-lg ${riskStyles[c.level].btn}`}>
                          {riskStyles[c.level].btnText}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side panels */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-display font-semibold text-foreground mb-3">Churn Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={churnDonut} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                  {churnDonut.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {churnDonut.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />{d.name}: {d.value}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <h3 className="font-display font-semibold text-foreground mb-4">Feature Weights</h3>
            <div className="space-y-3">
              {churnFeatureWeights.map((f) => (
                <div key={f.feature}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{f.feature}</span>
                    <span className="font-mono-data font-medium text-foreground">{f.weight}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${f.weight}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
