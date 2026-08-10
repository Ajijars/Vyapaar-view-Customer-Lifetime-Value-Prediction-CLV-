from fastapi import APIRouter
import pandas as pd
from app.utils import get_sales_df

router = APIRouter(prefix="/analytics")

@router.get("/top-products")
def top_products():
    try:
        df = get_sales_df()
        if "revenue" in df.columns:
            df["revenue"] = pd.to_numeric(df["revenue"], errors="coerce")
            result = df.groupby("product_name").agg({"revenue": "sum"}).sort_values(by="revenue", ascending=False).head(5)
            return [
                {"rank": i + 1, "name": name, "revenue": float(row["revenue"]), "trend": "up"}
                for i, (name, row) in enumerate(result.iterrows())
            ]
        else:
            result = df.groupby("product_name")["quantity_sold"].sum().sort_values(ascending=False).head(5)
            return [
                {"rank": i + 1, "name": name, "revenue": float(qty * 100), "trend": "up"}
                for i, (name, qty) in enumerate(result.items())
            ]
    except Exception as e:
        return {"error": str(e)}

@router.get("/trend")
def trend():
    try:
        df = get_sales_df()
        df['date'] = pd.to_datetime(df['date'])
        trend = df.groupby(df['date'].dt.strftime('%b'))['quantity_sold'].sum()
        return [{"month": k, "Sales": float(v)} for k, v in trend.items()]
    except Exception as e:
        return {"error": str(e)}