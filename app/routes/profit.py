from fastapi import APIRouter
from app.utils import get_sales_df, get_expense_df
import pandas as pd

router = APIRouter(prefix="/profit")

@router.get("/predict")
def predict_profit():
    try:
        sales = get_sales_df()
        expenses = get_expense_df()

        print("Sales Columns:", sales.columns)
        print("Expenses Columns:", expenses.columns)

        sales["revenue"] = pd.to_numeric(sales["revenue"], errors="coerce")
        expenses["amount"] = pd.to_numeric(expenses["amount"], errors="coerce")

        revenue = sales["revenue"].sum()
        expense = expenses["amount"].sum()

        return {
            "predicted_profit": float(revenue - expense)
        }

    except Exception as e:
        return {"error": str(e)}