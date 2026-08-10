from fastapi import APIRouter
import pandas as pd
from app.utils import get_inventory_df

router = APIRouter(prefix="/inventory")

@router.get("/")
def get_inventory():
    try:
        df = get_inventory_df()
        df = df.fillna("")
        for col in df.select_dtypes(include=['datetime64', 'datetimetz']).columns:
            df[col] = df[col].dt.strftime('%Y-%m-%d')
        
        # basic analysis
        total_items = len(df)
        
        if "current_stock" in df.columns:
            low_stock_items = len(df[pd.to_numeric(df["current_stock"], errors="coerce") < 20])
        else:
            low_stock_items = 0
            
        if "total_stock_value" in df.columns:
            total_value = pd.to_numeric(df["total_stock_value"], errors="coerce").sum()
        elif "purchase_price" in df.columns and "current_stock" in df.columns:
            total_value = (pd.to_numeric(df["purchase_price"], errors="coerce") * pd.to_numeric(df["current_stock"], errors="coerce")).sum()
        else:
            total_value = 0

        return {
            "summary": {
                "total_items": total_items,
                "low_stock": int(low_stock_items),
                "total_value": float(total_value)
            },
            "items": df.to_dict(orient="records")
        }
    except Exception as e:
        return {"error": str(e)}
