import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, Brain, UserX, IndianRupee,
  ArrowLeftRight, Factory, Package, Bot, Settings,
  ChevronLeft, ChevronRight, Star
} from "lucide-react";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { path: "/dashboard/trends", icon: TrendingUp, label: "Trend Analysis" },
  { path: "/dashboard/profit", icon: Brain, label: "Profit Prediction" },
  { path: "/dashboard/churn", icon: UserX, label: "Churn Risk" },
  { path: "/dashboard/clv", icon: Star, label: "CLV Prediction" },
  { path: "/dashboard/revenue", icon: IndianRupee, label: "Revenue & Expenses" },
  { path: "/dashboard/cashflow", icon: ArrowLeftRight, label: "Cash Flow" },
  { path: "/dashboard/production", icon: Factory, label: "Production Planning" },
  { path: "/dashboard/inventory", icon: Package, label: "Inventory" },
  { path: "/dashboard/assistant", icon: Bot, label: "AI Assistant" },
  { path: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`hidden md:flex flex-col bg-card/70 backdrop-blur-xl border-r border-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center gap-2 px-4 h-16 border-b border-border">
        <Logo className="w-8 h-8 text-foreground flex-shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="font-display font-bold text-foreground text-lg">Vyapaar-View</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-all duration-300 ${
                isActive
                  ? "bg-primary/10 text-primary font-medium border-l-[3px] border-primary shadow-[inset_4px_0_12px_rgba(99,102,241,0.05)]"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-3 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
