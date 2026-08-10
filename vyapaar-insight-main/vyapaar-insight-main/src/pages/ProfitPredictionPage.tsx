import { profitChartData } from "@/data/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, BarChart, Bar, ReferenceLine, ComposedChart
} from "recharts";

const featureImportance = [
  { feature: "Revenue trend", weight: 42 },
  { feature: "Seasonal factor", weight: 28 },
  { feature: "Expense control", weight: 18 },
  { feature: "Customer count", weight: 12 },
];

export default function ProfitPredictionPage() {
  return (
    <div className="space-y-6">
      {/* Hero Metric */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-6 border-l-4 border-l-primary animate-fade-up">
        <p className="text-sm text-muted-foreground">Predicted Profit Next Month</p>
        <p className="font-mono-data text-4xl font-bold text-primary mt-1">₹1,38,200</p>
        <p className="text-sm text-muted-foreground mt-1">Range: ₹1,12,000 – ₹1,64,000</p>
        <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-accent-foreground font-medium">Linear Regression</span>
      </div>

      {/* Prediction Chart */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <h3 className="font-display font-semibold text-foreground mb-4">Profit Forecast</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={profitChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000)}k`} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
            <Area dataKey="upper" stroke="none" fill="#8B5CF6" fillOpacity={0.06} />
            <Area dataKey="lower" stroke="none" fill="#FFFFFF" fillOpacity={1} />
            <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2.5} dot={false} name="Actual" />
            <Line type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={2.5} strokeDasharray="6 4" dot={false} name="Predicted" />
            <ReferenceLine x="Mar 25" stroke="#6B7280" strokeDasharray="4 4" label={{ value: "Today", fill: "#6B7280", fontSize: 11 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Model Selector */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl border-2 border-primary card-shadow p-5 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-display font-semibold text-foreground">Linear Regression</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-accent-foreground">Active</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><p className="font-mono-data text-sm font-bold text-foreground">₹4,200</p><p className="text-xs text-muted-foreground">MAE</p></div>
            <div><p className="font-mono-data text-sm font-bold text-foreground">0.87</p><p className="text-xs text-muted-foreground">R²</p></div>
            <div><p className="font-mono-data text-sm font-bold text-foreground">Fast</p><p className="text-xs text-muted-foreground">Speed</p></div>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-display font-semibold text-foreground">Random Forest</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">More Accurate</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><p className="font-mono-data text-sm font-bold text-foreground">₹2,800</p><p className="text-xs text-muted-foreground">MAE</p></div>
            <div><p className="font-mono-data text-sm font-bold text-foreground">0.93</p><p className="text-xs text-muted-foreground">R²</p></div>
            <div><p className="font-mono-data text-sm font-bold text-foreground">Moderate</p><p className="text-xs text-muted-foreground">Speed</p></div>
          </div>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "320ms" }}>
        <h3 className="font-display font-semibold text-foreground mb-4">Feature Importance</h3>
        <div className="space-y-3">
          {featureImportance.map((f) => (
            <div key={f.feature} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-32 flex-shrink-0">{f.feature}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${f.weight}%` }} />
              </div>
              <span className="font-mono-data text-sm font-medium text-foreground w-10 text-right">{f.weight}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-5 border-l-4 border-l-primary animate-fade-up" style={{ animationDelay: "400ms" }}>
        <p className="font-mono-data text-lg text-primary bg-accent/50 inline-block px-4 py-2 rounded-lg">y = a + bt</p>
        <p className="text-sm text-muted-foreground mt-2">Where: t = time period · y = predicted demand · b = growth rate</p>
      </div>
    </div>
  );
}
