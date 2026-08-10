import { cashFlowWaterfall, cashFlowWeekly, formatIndianCurrency } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AlertTriangle } from "lucide-react";

const waterfallColors: Record<string, string> = { positive: "#10B981", negative: "#F43F5E", neutral: "#9CA3AF", result: "#6366F1" };

// Simple calendar data for March
const calendarDays = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  amount: [1,3,5,8,12,15,19,22,25,28].includes(i+1) ? Math.round((Math.random()-0.3)*8000) : 0,
}));

export default function CashFlowPage() {
  return (
    <div className="space-y-6">
      {/* Formula */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-6 border-l-4 border-l-primary animate-fade-up">
        <p className="font-mono-data text-lg text-primary">Cash Flow = Total Inflow − Total Outflow</p>
        <p className="font-mono-data text-base text-foreground mt-2">₹8,42,350 − ₹6,17,770 = <span className="text-primary font-bold">₹2,24,580</span></p>
      </div>

      {/* Cash Shortage Alert */}
      <div className="flex items-start gap-3 p-4 rounded-xl border-l-4 border-warning bg-warning/5 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Cash Shortage Predicted</p>
          <p className="text-xs text-muted-foreground mt-1">At current burn rate, cash balance drops below ₹50,000 in 18 days.</p>
          <p className="text-xs text-muted-foreground">Recommended: Reduce raw material purchase by ₹15,000 next week</p>
          <button className="mt-2 text-xs border border-warning text-warning px-3 py-1 rounded-lg hover:bg-warning/10 transition">
            View Recommendations →
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Waterfall */}
        <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <h3 className="font-display font-semibold text-foreground mb-4">Cash Flow Waterfall</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cashFlowWaterfall}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${Math.abs(v/1000)}k`} />
              <Tooltip formatter={(v: number) => formatIndianCurrency(Math.abs(v))} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {cashFlowWaterfall.map((e, i) => <Cell key={i} fill={waterfallColors[e.type]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Inflow/Outflow */}
        <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <h3 className="font-display font-semibold text-foreground mb-4">Weekly Inflow vs Outflow</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cashFlowWeekly} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip formatter={(v: number) => formatIndianCurrency(v)} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="inflow" fill="#10B981" radius={[4, 4, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#F43F5E" radius={[4, 4, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Calendar */}
      <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "320ms" }}>
        <h3 className="font-display font-semibold text-foreground mb-4">Cash Flow Calendar — March</h3>
        <div className="grid grid-cols-7 gap-1">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
            <div key={d} className="text-center text-xs text-muted-foreground py-1">{d}</div>
          ))}
          {/* Offset for March starting on Saturday */}
          {Array.from({ length: 5 }).map((_, i) => <div key={`empty-${i}`} />)}
          {calendarDays.map((d) => (
            <div
              key={d.day}
              className={`text-center text-xs py-2 rounded-lg cursor-default transition ${
                d.amount > 0 ? "bg-success/15 text-success" : d.amount < 0 ? "bg-destructive/10 text-destructive" : "bg-muted/30 text-muted-foreground"
              }`}
              title={d.amount !== 0 ? formatIndianCurrency(d.amount) : "No transactions"}
            >
              {d.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
