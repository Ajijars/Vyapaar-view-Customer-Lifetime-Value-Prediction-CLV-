from fastapi import APIRouter
import pandas as pd
from app.utils import get_sales_df, get_expense_df

router = APIRouter(prefix="/finance")

@router.get("/summary")
def summary():
    sales = get_sales_df()
    expenses = get_expense_df()
    revenue = sales["revenue"].sum()
    expense = expenses["amount"].sum()
    return {"revenue": float(revenue), "expense": float(expense), "profit": float(revenue - expense)}

@router.get("/kpi")
def kpi():
    sales = get_sales_df()
    expenses = get_expense_df()
    
    rev = float(sales["revenue"].sum())
    exp = float(expenses["amount"].sum())
    profit = rev - exp
    
    # Simple derivation of health score via margin mapping
    margin = (profit / rev) * 100 if rev > 0 else 0
    health = min(int(margin * 3), 100) # pseudo formula
    
    return {
        "kpiData": {
            "totalRevenue": { "value": rev, "change": 12.4, "label": "Total Revenue", "sparkline": [62, 65, 68, 71, 74, 78, 84] },
            "netProfit": { "value": profit, "change": 8.2, "label": "Net Profit", "sparkline": [10, 12, 11, 14, 13, 15, 12] },
            "cashBalance": { "value": profit * 1.5, "warningDays": 12, "label": "Cash Balance" }, # Mock logic
            "healthScore": { "value": max(health, 0), "max": 100, "label": "Business Health Score", "status": "Good — Room to improve" if health > 60 else "At Risk" }
        }
    }

@router.get("/monthly")
def monthly():
    sales = get_sales_df()
    expenses = get_expense_df()
    
    sales['month_abbr'] = pd.to_datetime(sales['date']).dt.strftime('%b')
    expenses['month_abbr'] = pd.to_datetime(expenses['date']).dt.strftime('%b')
    
    monthly_sales = sales.groupby('month_abbr')['revenue'].sum().reset_index()
    monthly_exp = expenses.groupby('month_abbr')['amount'].sum().reset_index()
    
    merged = pd.merge(monthly_sales, monthly_exp, on='month_abbr', how='outer').fillna(0)
    
    result = []
    months_order = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    # Sort logically
    merged['m'] = pd.Categorical(merged['month_abbr'], categories=months_order, ordered=True)
    merged = merged.sort_values('m')
    
    for _, row in merged.iterrows():
        r = float(row['revenue'])
        e = float(row['amount'])
        result.append({
            "month": row['month_abbr'],
            "revenue": r,
            "expense": e,
            "profit": r - e,
            "anomaly": False
        })
        
    return {"monthlyRevenueExpense": result}

@router.get("/payments")
def payments():
    sales = get_sales_df()
    
    total = sales['revenue'].sum()
    if total == 0: total = 1 # avoid division zero
    
    modes = sales.groupby('payment_mode')['revenue'].sum()
    
    colors = ["#8B5CF6", "#6366F1", "#F59E0B", "#F43F5E", "#10B981"]
    
    result = []
    for i, (mode, amount) in enumerate(modes.items()):
        result.append({
            "name": str(mode),
            "value": round((amount / total) * 100, 1),
            "color": colors[i % len(colors)]
        })
        
    return {"paymentModes": result}
