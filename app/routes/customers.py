from fastapi import APIRouter
import pandas as pd
from app.utils import get_customer_df

router = APIRouter(prefix="/customers")

@router.get("/")
def get_all_customers():
    try:
        df = get_customer_df()
        # Clean up timestamps and NaN values to be JSON serializable
        df = df.fillna("")
        for col in df.select_dtypes(include=['datetime64', 'datetimetz']).columns:
            df[col] = df[col].dt.strftime('%Y-%m-%d')
        return {"customers": df.to_dict(orient="records")}
    except Exception as e:
        return {"error": str(e)}
