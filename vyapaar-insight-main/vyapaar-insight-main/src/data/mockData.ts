// ===== REVENUE VS EXPENSE DATA =====
export const monthlyRevenueExpense = [
  { month: "Jan", revenue: 68000, expense: 52000, profit: 16000 },
  { month: "Feb", revenue: 71000, expense: 54000, profit: 17000 },
  { month: "Mar", revenue: 65000, expense: 71000, profit: -6000, anomaly: true },
  { month: "Apr", revenue: 79000, expense: 55000, profit: 24000 },
  { month: "May", revenue: 82000, expense: 57000, profit: 25000 },
  { month: "Jun", revenue: 88000, expense: 59000, profit: 29000 },
  { month: "Jul", revenue: 91000, expense: 61000, profit: 30000 },
  { month: "Aug", revenue: 87000, expense: 58000, profit: 29000 },
  { month: "Sep", revenue: 94000, expense: 62000, profit: 32000 },
  { month: "Oct", revenue: 98000, expense: 64000, profit: 34000 },
  { month: "Nov", revenue: 103000, expense: 67000, profit: 36000 },
  { month: "Dec", revenue: 89000, expense: 60000, profit: 29000 },
];

// ===== KPI DATA =====
export const kpiData = {
  totalRevenue: { value: 842350, change: 12.4, label: "Total Revenue", sparkline: [62, 65, 68, 71, 74, 78, 84] },
  netProfit: { value: 124580, change: 8.2, label: "Net Profit", sparkline: [10, 12, 11, 14, 13, 15, 12] },
  cashBalance: { value: 218900, warningDays: 12, label: "Cash Balance" },
  healthScore: { value: 78, max: 100, label: "Business Health Score", status: "Good — Room to improve" },
};

// ===== TOP PRODUCTS =====
export const topProducts = [
  { rank: 1, name: "Amul Milk 1L", revenue: 42800, trend: "up" as const },
  { rank: 2, name: "Maggi Noodles", revenue: 38200, trend: "up" as const },
  { rank: 3, name: "Toor Dal 1kg", revenue: 31500, trend: "flat" as const },
  { rank: 4, name: "Basmati Rice 5kg", revenue: 28900, trend: "down" as const },
  { rank: 5, name: "Colgate 200g", revenue: 21400, trend: "up" as const },
];

// ===== PAYMENT MODE =====
export const paymentModes = [
  { name: "UPI", value: 42, color: "#8B5CF6" },
  { name: "Cash", value: 38, color: "#6366F1" },
  { name: "Card", value: 15, color: "#F59E0B" },
  { name: "Credit", value: 5, color: "#F43F5E" },
];

// ===== PROFIT PREDICTION =====
export const profitActual = [
  { month: "Jan 24", value: 16000 },
  { month: "Feb 24", value: 17000 },
  { month: "Mar 24", value: -6000, loss: true },
  { month: "Apr 24", value: 24000 },
  { month: "May 24", value: 25000 },
  { month: "Jun 24", value: 29000 },
  { month: "Jul 24", value: 30000 },
  { month: "Aug 24", value: 29000 },
  { month: "Sep 24", value: 32000 },
  { month: "Oct 24", value: 34000 },
  { month: "Nov 24", value: 36000 },
  { month: "Dec 24", value: 29000 },
  { month: "Jan 25", value: 31000 },
  { month: "Feb 25", value: 33000 },
  { month: "Mar 25", value: 35000 },
];

export const profitPredicted = [
  { month: "Mar 25", value: 35000 },
  { month: "Apr 25", value: 34000 },
  { month: "May 25", value: 38000 },
  { month: "Jun 25", value: 41000 },
];

export const profitChartData = [
  ...profitActual.map(d => ({ ...d, predicted: undefined as number | undefined, upper: undefined as number | undefined, lower: undefined as number | undefined })),
  { month: "Apr 25", value: undefined as number | undefined, predicted: 34000, upper: 42000, lower: 26000 },
  { month: "May 25", value: undefined as number | undefined, predicted: 38000, upper: 47000, lower: 29000 },
  { month: "Jun 25", value: undefined as number | undefined, predicted: 41000, upper: 51000, lower: 31000 },
];

// ===== TREND ANALYSIS =====
export const trendProducts = [
  { rank: 1, name: "Amul Milk 1L", category: "Dairy", units: 1842, revenue: 114204, margin: 12.9, status: "Hot" as const },
  { rank: 2, name: "Maggi Noodles", category: "Snacks", units: 1204, revenue: 156520, margin: 16.9, status: "Rising" as const },
  { rank: 3, name: "Toor Dal 1kg", category: "Groceries", units: 987, revenue: 83895, margin: 19.1, status: "Stable" as const },
  { rank: 4, name: "Basmati Rice 5kg", category: "Groceries", units: 743, revenue: 334350, margin: 13.3, status: "Rising" as const },
  { rank: 5, name: "Colgate 200g", category: "Hygiene", units: 612, revenue: 58140, margin: 21.5, status: "Hot" as const },
  { rank: 6, name: "Parle-G", category: "Snacks", units: 2341, revenue: 23410, margin: 25.0, status: "Stable" as const },
  { rank: 7, name: "Sunflower Oil 1L", category: "Groceries", units: 521, revenue: 91175, margin: 16.6, status: "Slowing" as const },
  { rank: 8, name: "Dettol Soap", category: "Hygiene", units: 489, revenue: 26895, margin: 23.6, status: "Stable" as const },
  { rank: 9, name: "Amul Butter 500g", category: "Dairy", units: 398, revenue: 103480, margin: 10.4, status: "Rising" as const },
  { rank: 10, name: "Paracetamol Strip", category: "Medicine", units: 876, revenue: 19272, margin: 31.8, status: "Hot" as const },
];

export const categoryMonthlyData = [
  { month: "Jan", Groceries: 42000, Dairy: 18000, Snacks: 12000, Hygiene: 8000, Medicine: 5000 },
  { month: "Feb", Groceries: 44000, Dairy: 19000, Snacks: 13000, Hygiene: 8500, Medicine: 5500 },
  { month: "Mar", Groceries: 40000, Dairy: 17000, Snacks: 11000, Hygiene: 7500, Medicine: 4800 },
  { month: "Apr", Groceries: 48000, Dairy: 20000, Snacks: 14000, Hygiene: 9000, Medicine: 5800 },
  { month: "May", Groceries: 50000, Dairy: 22000, Snacks: 15000, Hygiene: 9500, Medicine: 6000 },
  { month: "Jun", Groceries: 52000, Dairy: 24000, Snacks: 18000, Hygiene: 9800, Medicine: 6200 },
  { month: "Jul", Groceries: 54000, Dairy: 23000, Snacks: 19000, Hygiene: 10000, Medicine: 6500 },
  { month: "Aug", Groceries: 51000, Dairy: 22000, Snacks: 18000, Hygiene: 9500, Medicine: 6000 },
  { month: "Sep", Groceries: 55000, Dairy: 24000, Snacks: 16000, Hygiene: 10200, Medicine: 6800 },
  { month: "Oct", Groceries: 58000, Dairy: 26000, Snacks: 17000, Hygiene: 11000, Medicine: 7000 },
  { month: "Nov", Groceries: 60000, Dairy: 27000, Snacks: 18000, Hygiene: 11500, Medicine: 7200 },
  { month: "Dec", Groceries: 53000, Dairy: 23000, Snacks: 15000, Hygiene: 10000, Medicine: 6200 },
];

export const seasonalInsights = [
  { icon: "CloudRain", title: "Monsoon Boost", description: "Maggi sales ↑ 34% Jun–Aug", color: "indigo" as const },
  { icon: "PartyPopper", title: "Festival Spike", description: "Oct revenue highest of year (+18%)", color: "amber" as const },
  { icon: "Snowflake", title: "Jan Slump", description: "Post-holiday drop across all categories (-12%)", color: "rose" as const },
  { icon: "Sun", title: "Summer Peak", description: "Cold drinks & dairy demand peaks May–Jun", color: "emerald" as const },
];

// ===== CHURN PREDICTION =====
export const churnSummary = {
  total: 300,
  active: 187,
  atRisk: 78,
  churned: 35,
  retentionRate: 62.3,
};

export const churnCustomers = [
  { id: "CUST0001", lastPurchase: "15 Aug 2024", daysSince: 211, totalSpent: 11141, orders: 6, risk: 87, level: "high" as const },
  { id: "CUST0045", lastPurchase: "02 Sep 2024", daysSince: 193, totalSpent: 8420, orders: 4, risk: 81, level: "high" as const },
  { id: "CUST0112", lastPurchase: "28 Oct 2024", daysSince: 147, totalSpent: 15230, orders: 9, risk: 63, level: "medium" as const },
  { id: "CUST0087", lastPurchase: "10 Nov 2024", daysSince: 134, totalSpent: 6800, orders: 3, risk: 58, level: "medium" as const },
  { id: "CUST0203", lastPurchase: "22 Jan 2025", daysSince: 61, totalSpent: 22100, orders: 14, risk: 28, level: "low" as const },
  { id: "CUST0156", lastPurchase: "14 Feb 2025", daysSince: 38, totalSpent: 9450, orders: 7, risk: 19, level: "low" as const },
  { id: "CUST0244", lastPurchase: "01 Mar 2025", daysSince: 19, totalSpent: 31200, orders: 21, risk: 5, level: "safe" as const },
  { id: "CUST0089", lastPurchase: "15 Mar 2025", daysSince: 5, totalSpent: 18700, orders: 12, risk: 2, level: "safe" as const },
];

export const churnDonut = [
  { name: "High", value: 35, color: "#F43F5E" },
  { name: "Medium", value: 43, color: "#F59E0B" },
  { name: "Low", value: 78, color: "#EAB308" },
  { name: "Safe", value: 144, color: "#10B981" },
];

export const churnFeatureWeights = [
  { feature: "Days since last purchase", weight: 45 },
  { feature: "Purchase frequency drop", weight: 30 },
  { feature: "Total spend decline", weight: 15 },
  { feature: "Category shift", weight: 10 },
];

// ===== REVENUE & EXPENSE =====
export const expenseBreakdown = [
  { name: "Salary", value: 35, color: "#6366F1" },
  { name: "Raw Material", value: 28, color: "#8B5CF6" },
  { name: "Rent", value: 18, color: "#F59E0B" },
  { name: "Electricity", value: 7, color: "#10B981" },
  { name: "Transport", value: 5, color: "#F43F5E" },
  { name: "Marketing", value: 4, color: "#EC4899" },
  { name: "Other", value: 3, color: "#9CA3AF" },
];

export const transactions = [
  { date: "20 Mar", type: "expense" as const, category: "Raw Material", amount: -18200, note: "Monthly stock" },
  { date: "19 Mar", type: "income" as const, category: "Sales", amount: 4200, note: "Daily sales" },
  { date: "18 Mar", type: "income" as const, category: "Sales", amount: 3800, note: "Daily sales" },
  { date: "15 Mar", type: "expense" as const, category: "Salary", amount: -8000, note: "Staff - Raju" },
  { date: "15 Mar", type: "expense" as const, category: "Salary", amount: -7500, note: "Staff - Meena" },
  { date: "10 Mar", type: "expense" as const, category: "Electricity", amount: -2100, note: "MSEDCL bill" },
  { date: "05 Mar", type: "expense" as const, category: "Rent", amount: -12000, note: "Monthly rent" },
  { date: "03 Mar", type: "income" as const, category: "Sales", amount: 5100, note: "Weekend peak" },
  { date: "01 Mar", type: "income" as const, category: "Sales", amount: 4600, note: "Monday sales" },
  { date: "28 Feb", type: "expense" as const, category: "Marketing", amount: -2000, note: "Facebook ads" },
];

// ===== CASH FLOW =====
export const cashFlowWaterfall = [
  { name: "Opening", value: 180000, type: "neutral" as const },
  { name: "Revenue", value: 842350, type: "positive" as const },
  { name: "Expenses", value: -617770, type: "negative" as const },
  { name: "Closing", value: 404580, type: "result" as const },
];

export const cashFlowWeekly = [
  { week: "W1", inflow: 42000, outflow: 38000 },
  { week: "W2", inflow: 38000, outflow: 45000 },
  { week: "W3", inflow: 51000, outflow: 35000 },
  { week: "W4", inflow: 44000, outflow: 42000 },
];

// ===== PRODUCTION PLANNING =====
export const productionData = [
  { product: "Amul Milk 1L", stock: 263, avgDaily: 7.9, daysLeft: 33, demand30d: 237, orderQty: 0, priority: "good" as const },
  { product: "Maggi Noodles", stock: 45, avgDaily: 4.0, daysLeft: 11, demand30d: 120, orderQty: 75, priority: "urgent" as const },
  { product: "Toor Dal 1kg", stock: 28, avgDaily: 2.7, daysLeft: 10, demand30d: 81, orderQty: 53, priority: "urgent" as const },
  { product: "Basmati Rice 5kg", stock: 140, avgDaily: 3.9, daysLeft: 36, demand30d: 117, orderQty: 0, priority: "good" as const },
  { product: "Parle-G", stock: 89, avgDaily: 6.4, daysLeft: 14, demand30d: 192, orderQty: 103, priority: "soon" as const },
  { product: "Colgate 200g", stock: 34, avgDaily: 1.7, daysLeft: 20, demand30d: 51, orderQty: 17, priority: "monitor" as const },
  { product: "Sunflower Oil 1L", stock: 18, avgDaily: 1.4, daysLeft: 13, demand30d: 42, orderQty: 24, priority: "soon" as const },
];

// ===== AI CHAT =====
export const aiChatMessages = [
  {
    role: "user" as const,
    text: "Why did my expenses spike in March?",
  },
  {
    role: "ai" as const,
    text: "In March 2024, your total expenses were ₹71,000 — significantly higher than your 6-month average of ₹57,000 (a 24.5% spike). The main cause was an emergency Raw Material purchase of ₹35,000 (vs. avg ₹17,000). This was a one-time event and expenses normalized in April.\n\n💡 Recommendation: Maintain a raw material buffer stock of 2 weeks to avoid emergency buys at higher prices.",
  },
  {
    role: "user" as const,
    text: "Which product should I promote this month?",
  },
  {
    role: "ai" as const,
    text: "Based on trend analysis, I recommend promoting Amul Butter 500g. Sales are rising (+18% MoM) but profit margin is only 10.4% — the lowest among top sellers. A combo offer (Butter + Milk) can boost average order value.\n\nAlso consider Paracetamol Strip — highest margin at 31.8% with consistent demand.",
  },
];

export const aiQuickChips = [
  "Best selling product?",
  "When will I run out of cash?",
  "At-risk customers?",
  "Should I restock raw material?",
];

// ===== CLV PREDICTION =====
export const clvSummary = {
  avg_clv: 18420,
  total_predicted_revenue: 5526000,
  max_clv: 84200,
  total_customers: 300,
  segment_counts: {
    champion: 42,
    loyal: 89,
    at_risk: 114,
    lost: 55,
  },
};

export const clvTopCustomers = [
  { rank: 1, customer_id: "CUST0244", name: "Ravi Sharma", segment: "Champion", rfm_score: 4.8, clv_predicted: 84200, total_spent: 31200, total_orders: 21 },
  { rank: 2, customer_id: "CUST0203", name: "Priya Nair", segment: "Champion", rfm_score: 4.6, clv_predicted: 72800, total_spent: 22100, total_orders: 14 },
  { rank: 3, customer_id: "CUST0089", name: "Arjun Patel", segment: "Champion", rfm_score: 4.5, clv_predicted: 68500, total_spent: 18700, total_orders: 12 },
  { rank: 4, customer_id: "CUST0156", name: "Sunita Joshi", segment: "Loyal", rfm_score: 3.9, clv_predicted: 41200, total_spent: 9450, total_orders: 7 },
  { rank: 5, customer_id: "CUST0312", name: "Mohan Das", segment: "Loyal", rfm_score: 3.7, clv_predicted: 36800, total_spent: 14200, total_orders: 9 },
  { rank: 6, customer_id: "CUST0078", name: "Kavitha Reddy", segment: "Loyal", rfm_score: 3.4, clv_predicted: 29100, total_spent: 11800, total_orders: 8 },
  { rank: 7, customer_id: "CUST0112", name: "Deepak Verma", segment: "Loyal", rfm_score: 3.2, clv_predicted: 24700, total_spent: 15230, total_orders: 9 },
  { rank: 8, customer_id: "CUST0051", name: "Anjali Mehta", segment: "At Risk", rfm_score: 2.8, clv_predicted: 18400, total_spent: 8900, total_orders: 6 },
  { rank: 9, customer_id: "CUST0087", name: "Ramesh Kumar", segment: "At Risk", rfm_score: 2.5, clv_predicted: 14200, total_spent: 6800, total_orders: 3 },
  { rank: 10, customer_id: "CUST0045", name: "Fatima Sheikh", segment: "At Risk", rfm_score: 2.1, clv_predicted: 9800, total_spent: 8420, total_orders: 4 },
];

export const clvSegmentDonut = [
  { name: "Champion", value: 42, color: "#6366F1" },
  { name: "Loyal", value: 89, color: "#8B5CF6" },
  { name: "At Risk", value: 114, color: "#F59E0B" },
  { name: "Lost", value: 55, color: "#F43F5E" },
];

export const clvDistributionData = [
  { range: "₹0–5k", count: 48 },
  { range: "₹5–10k", count: 62 },
  { range: "₹10–20k", count: 74 },
  { range: "₹20–35k", count: 58 },
  { range: "₹35–50k", count: 32 },
  { range: "₹50k+", count: 26 },
];

export const clvTrendData = [
  { month: "Jan", avgCLV: 14200 },
  { month: "Feb", avgCLV: 14800 },
  { month: "Mar", avgCLV: 13900 },
  { month: "Apr", avgCLV: 15400 },
  { month: "May", avgCLV: 16200 },
  { month: "Jun", avgCLV: 17100 },
  { month: "Jul", avgCLV: 17600 },
  { month: "Aug", avgCLV: 16800 },
  { month: "Sep", avgCLV: 18200 },
  { month: "Oct", avgCLV: 19100 },
  { month: "Nov", avgCLV: 19800 },
  { month: "Dec", avgCLV: 18420 },
];

export const clvFeatureWeights = [
  { feature: "Recency (days since last purchase)", weight: 40 },
  { feature: "Frequency (total orders)", weight: 35 },
  { feature: "Monetary (total spend)", weight: 25 },
];

// ===== HELPERS =====
export function formatIndianCurrency(num: number): string {
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";
  if (abs >= 10000000) return sign + "₹" + (abs / 10000000).toFixed(1) + "Cr";
  if (abs >= 100000) return sign + "₹" + (abs / 100000).toFixed(2) + "L";
  const str = abs.toLocaleString("en-IN");
  return sign + "₹" + str;
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-IN");
}
