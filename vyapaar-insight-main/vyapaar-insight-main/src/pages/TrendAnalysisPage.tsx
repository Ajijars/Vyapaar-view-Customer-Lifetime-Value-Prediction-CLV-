import { trendProducts, categoryMonthlyData, seasonalInsights, formatIndianCurrency, formatNumber } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CloudRain, PartyPopper, Snowflake, Sun } from "lucide-react";

const statusColors: Record<string, { bg: string; text: string }> = {
  Hot: { bg: "bg-success/10", text: "text-success" },
  Rising: { bg: "bg-primary/10", text: "text-primary" },
  Stable: { bg: "bg-muted", text: "text-muted-foreground" },
  Slowing: { bg: "bg-warning/10", text: "text-warning" },
};

const categoryColors: Record<string, string> = {
  Dairy: "#8B5CF6", Snacks: "#F59E0B", Groceries: "#6366F1", Hygiene: "#10B981", Medicine: "#F43F5E",
};

const seasonIcons = { CloudRain, PartyPopper, Snowflake, Sun };
const borderColors = { indigo: "#6366F1", amber: "#F59E0B", rose: "#F43F5E", emerald: "#10B981" };

export default function TrendAnalysisPage() {
  return (
    <div className="space-y-6">
      {/* Products Table */}
      <div className="bg-card rounded-2xl border border-border card-shadow overflow-hidden animate-fade-up">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Top Selling Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">#</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Product</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Category</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Units</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Revenue</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Margin</th>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {trendProducts.map((p, i) => (
                <tr key={p.name} className="border-b border-border last:border-0 hover:bg-accent/30 transition animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <td className="px-4 py-3 text-muted-foreground">{p.rank}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: categoryColors[p.category] + "15", color: categoryColors[p.category] }}>{p.category}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono-data">{formatNumber(p.units)}</td>
                  <td className="px-4 py-3 text-right font-mono-data">{formatIndianCurrency(p.revenue)}</td>
                  <td className="px-4 py-3 text-right font-mono-data">{p.margin}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[p.status].bg} ${statusColors[p.status].text}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Area Chart */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <h3 className="font-display font-semibold text-foreground mb-4">Monthly Sales by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={categoryMonthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000)}k`} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} formatter={(v: number) => formatIndianCurrency(v)} />
            {Object.entries(categoryColors).map(([cat, color]) => (
              <Area key={cat} type="monotone" dataKey={cat} stroke={color} fill={color} fillOpacity={0.15} strokeWidth={2} />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Seasonal Insights */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {seasonalInsights.map((s, i) => {
          const IconComp = seasonIcons[s.icon as keyof typeof seasonIcons];
          return (
            <div
              key={s.title}
              className="bg-card rounded-2xl border border-border card-shadow p-4 border-l-4 animate-fade-up"
              style={{ borderLeftColor: borderColors[s.color], animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <IconComp className="w-4 h-4" style={{ color: borderColors[s.color] }} />
                <h4 className="font-display font-semibold text-sm text-foreground">{s.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
