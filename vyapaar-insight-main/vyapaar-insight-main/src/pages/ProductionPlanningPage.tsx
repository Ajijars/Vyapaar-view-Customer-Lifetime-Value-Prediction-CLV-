import { productionData, formatNumber } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, CheckCircle } from "lucide-react";

const priorityStyles: Record<string, { bg: string; text: string; rowBg: string }> = {
  urgent: { bg: "bg-destructive/10", text: "text-destructive", rowBg: "bg-destructive/[0.03]" },
  soon: { bg: "bg-warning/10", text: "text-warning", rowBg: "" },
  monitor: { bg: "bg-warning/5", text: "text-warning", rowBg: "" },
  good: { bg: "bg-success/10", text: "text-success", rowBg: "" },
};

const priorityLabels: Record<string, string> = { urgent: "🔴 Urgent", soon: "🟠 Soon", monitor: "🟡 Monitor", good: "✅ Good" };

const demandForecast = [
  { month: "Jan", Maggi: 90, ToorDal: 60, ParleG: 150 },
  { month: "Feb", Maggi: 95, ToorDal: 65, ParleG: 155 },
  { month: "Mar", Maggi: 100, ToorDal: 70, ParleG: 165 },
  { month: "Apr", Maggi: 110, ToorDal: 75, ParleG: 180 },
  { month: "May", Maggi: 120, ToorDal: 81, ParleG: 192 },
];

const reorderAlerts = [
  { product: "Maggi Noodles", qty: 75, days: 11, color: "#F43F5E", urgent: true },
  { product: "Toor Dal 1kg", qty: 53, days: 10, color: "#F43F5E", urgent: true },
  { product: "Parle-G", qty: 103, days: 14, color: "#F59E0B", urgent: false },
];

export default function ProductionPlanningPage() {
  return (
    <div className="space-y-6">
      {/* Formula Hero */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-6 border-t-[3px] border-t-primary animate-fade-up">
        <p className="font-mono-data text-lg text-primary mb-2">Required Production = Predicted Demand − Current Inventory</p>
        <p className="text-sm text-muted-foreground">
          Example: <span className="font-mono-data text-foreground">Maggi Noodles: 450 − 120 = 330 units to order</span>
        </p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border card-shadow overflow-hidden animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Production Planning</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Product</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Stock</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Avg/Day</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Days Left</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Demand (30d)</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Order Qty</th>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {productionData.map((p, i) => (
                <tr key={p.product} className={`border-b border-border last:border-0 hover:bg-accent/30 transition ${priorityStyles[p.priority].rowBg}`}>
                  <td className="px-4 py-3 font-medium text-foreground">{p.product}</td>
                  <td className="px-4 py-3 text-right font-mono-data">{formatNumber(p.stock)}</td>
                  <td className="px-4 py-3 text-right font-mono-data">{p.avgDaily}</td>
                  <td className="px-4 py-3 text-right font-mono-data">{p.daysLeft}</td>
                  <td className="px-4 py-3 text-right font-mono-data">{formatNumber(p.demand30d)}</td>
                  <td className="px-4 py-3 text-right font-mono-data font-medium">{p.orderQty > 0 ? `${p.orderQty} units` : "OK"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${priorityStyles[p.priority].bg} ${priorityStyles[p.priority].text}`}>
                      {priorityLabels[p.priority]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demand Chart */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "160ms" }}>
        <h3 className="font-display font-semibold text-foreground mb-4">Demand Forecast — <span className="font-mono-data text-primary text-sm">y = a + bt</span></h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={demandForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
            <Line type="monotone" dataKey="Maggi" stroke="#6366F1" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ToorDal" stroke="#F43F5E" strokeWidth={2} dot={false} name="Toor Dal" />
            <Line type="monotone" dataKey="ParleG" stroke="#F59E0B" strokeWidth={2} dot={false} name="Parle-G" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Reorder Alerts */}
      <div className="grid sm:grid-cols-3 gap-4">
        {reorderAlerts.map((a, i) => (
          <div
            key={a.product}
            className="bg-card rounded-2xl border border-border card-shadow p-4 border-l-4 animate-fade-up"
            style={{ borderLeftColor: a.color, animationDelay: `${240 + i * 80}ms` }}
          >
            <div className="flex items-center gap-2 mb-1">
              {a.urgent ? <AlertTriangle className="w-4 h-4 text-destructive" /> : <CheckCircle className="w-4 h-4 text-warning" />}
              <h4 className="font-display font-semibold text-sm text-foreground">{a.product}</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Order <span className="font-mono-data text-foreground font-medium">{a.qty} units</span> {a.urgent ? "NOW" : "soon"} ({a.days} days left)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
