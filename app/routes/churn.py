from fastapi import APIRouter
from app.utils import get_customer_df
from ml.churn_model import train_churn_model

router = APIRouter(prefix="/churn")

@router.get("/predict")
def churn():
    df = get_customer_df()

    model = train_churn_model(df)

    df["churn_prob"] = model.predict_proba(df[["total_orders", "total_spent"]])[:,1]

    return df[["customer_id", "churn_prob"]].to_dict(orient="records")