import { useState } from "react";
import { expenseBreakdown, transactions, formatIndianCurrency } from "@/data/mockData";
import { KPICard } from "@/components/KPICard";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Plus, X } from "lucide-react";

export default function RevenueExpensePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Revenue" value={842350} borderColor="#10B981" delay={0} />
        <KPICard label="Total Expenses" value={617770} borderColor="#F43F5E" delay={80} />
        <KPICard label="Net Profit" value={224580} borderColor="#6366F1" delay={160} />
        <KPICard label="Profit Margin" value={26} borderColor="#F59E0B" prefix="" suffix=".7%" delay={240} />
      </div>

      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-1.5 gradient-indigo text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add Transaction
        </button>
      </div>

      {/* Form slide-in */}
      {showForm && (
        <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-semibold text-foreground">New Transaction</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Type</label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                <option>Income</option><option>Expense</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Amount (₹)</label>
              <input type="number" placeholder="0" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                <option>Sales</option><option>Raw Material</option><option>Salary</option><option>Rent</option><option>Electricity</option><option>Transport</option><option>Marketing</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="gradient-indigo text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium w-full">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border card-shadow overflow-hidden animate-fade-up">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Category</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Note</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/30 transition">
                    <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${t.type === "income" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                        {t.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground">{t.category}</td>
                    <td className={`px-4 py-3 text-right font-mono-data font-medium ${t.amount >= 0 ? "text-success" : "text-destructive"}`}>
                      {t.amount >= 0 ? "+" : ""}{formatIndianCurrency(t.amount)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expense Donut */}
        <div className="bg-card rounded-2xl border border-border card-shadow p-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h3 className="font-display font-semibold text-foreground mb-3">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-3">
            {expenseBreakdown.map((e) => (
              <div key={e.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: e.color }} />{e.name}
                </div>
                <span className="font-mono-data text-foreground">{e.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
