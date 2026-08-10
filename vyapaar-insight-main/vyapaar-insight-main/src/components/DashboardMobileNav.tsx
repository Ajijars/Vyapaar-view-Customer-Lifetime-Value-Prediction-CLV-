import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, TrendingUp, Brain, UserX, Bot, Star } from "lucide-react";

const items = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { path: "/dashboard/trends", icon: TrendingUp, label: "Trends" },
  { path: "/dashboard/profit", icon: Brain, label: "Predict" },
  { path: "/dashboard/churn", icon: UserX, label: "Churn" },
  { path: "/dashboard/clv", icon: Star, label: "CLV" },
  { path: "/dashboard/assistant", icon: Bot, label: "AI" },
];

export function DashboardMobileNav() {
  const location = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-2 z-50">
      {items.map((item) => {
        const active = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
