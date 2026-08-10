import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./pages/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import TrendAnalysisPage from "./pages/TrendAnalysisPage";
import ProfitPredictionPage from "./pages/ProfitPredictionPage";
import ChurnPredictionPage from "./pages/ChurnPredictionPage";
import CLVPredictionPage from "./pages/CLVPredictionPage";
import RevenueExpensePage from "./pages/RevenueExpensePage";
import CashFlowPage from "./pages/CashFlowPage";
import ProductionPlanningPage from "./pages/ProductionPlanningPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import InventoryPage from "./pages/InventoryPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PlaceholderDashPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <h2 className="text-xl font-display font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="trends" element={<TrendAnalysisPage />} />
            <Route path="profit" element={<ProfitPredictionPage />} />
            <Route path="churn" element={<ChurnPredictionPage />} />
            <Route path="clv" element={<CLVPredictionPage />} />
            <Route path="revenue" element={<RevenueExpensePage />} />
            <Route path="cashflow" element={<CashFlowPage />} />
            <Route path="production" element={<ProductionPlanningPage />} />
            <Route path="assistant" element={<AIAssistantPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
