from fastapi import APIRouter
from app.utils import get_sales_df, get_inventory_df
from ml.demand_model import demand_model

router = APIRouter(prefix="/demand")

@router.get("/predict")
def demand():
    sales = get_sales_df()
    inventory = get_inventory_df()

    model = demand_model(sales)

    predicted = model.predict([[len(sales)]])[0]
    stock = inventory["current_stock"].sum()

    return {
        "predicted_demand": float(predicted),
        "required_stock": float(predicted - stock)
    }