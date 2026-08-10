from fastapi import APIRouter
from app.utils import get_customer_df
from ml.clv_model import predict_clv

router = APIRouter(prefix="/clv")


@router.get("/predict")
def clv_predict():
    try:
        df = get_customer_df()
        if df.empty:
            return {"error": "No customer data found"}

        result_df = predict_clv(df)

        records = []
        for _, row in result_df.iterrows():
            records.append({
                "customer_id": str(row.get("customer_id", "")),
                "name": str(row.get("name", "")),
                "recency": float(row.get("recency", 0)),
                "frequency": float(row.get("frequency", 0)),
                "monetary": float(row.get("monetary", 0)),
                "rfm_score": float(row.get("rfm_score", 0)),
                "r_score": int(row.get("r_score", 1)),
                "f_score": int(row.get("f_score", 1)),
                "m_score": int(row.get("m_score", 1)),
                "clv_predicted": float(row.get("clv_predicted", 0)),
                "segment": str(row.get("segment", "Unknown")),
                "avg_order_value": float(row.get("avg_order_value", 0)),
            })

        return {"customers": records}

    except Exception as e:
        return {"error": str(e)}


@router.get("/summary")
def clv_summary():
    try:
        df = get_customer_df()
        if df.empty:
            return {"error": "No customer data found"}

        result_df = predict_clv(df)

        avg_clv = float(result_df["clv_predicted"].mean())
        total_predicted_revenue = float(result_df["clv_predicted"].sum())
        max_clv = float(result_df["clv_predicted"].max())

        segment_counts = result_df["segment"].value_counts().to_dict()

        return {
            "avg_clv": round(avg_clv, 2),
            "total_predicted_revenue": round(total_predicted_revenue, 2),
            "max_clv": round(max_clv, 2),
            "total_customers": len(result_df),
            "segment_counts": {
                "champion": int(segment_counts.get("Champion", 0)),
                "loyal": int(segment_counts.get("Loyal", 0)),
                "at_risk": int(segment_counts.get("At Risk", 0)),
                "lost": int(segment_counts.get("Lost", 0)),
            }
        }

    except Exception as e:
        return {"error": str(e)}


@router.get("/top-customers")
def top_customers():
    try:
        df = get_customer_df()
        if df.empty:
            return {"error": "No customer data found"}

        result_df = predict_clv(df)

        top = result_df.nlargest(10, "clv_predicted")

        records = []
        for rank, (_, row) in enumerate(top.iterrows(), 1):
            records.append({
                "rank": rank,
                "customer_id": str(row.get("customer_id", "")),
                "name": str(row.get("name", "")),
                "segment": str(row.get("segment", "Unknown")),
                "rfm_score": round(float(row.get("rfm_score", 0)), 2),
                "clv_predicted": round(float(row.get("clv_predicted", 0)), 2),
                "total_spent": round(float(row.get("monetary", 0)), 2),
                "total_orders": int(row.get("frequency", 0)),
            })

        return {"top_customers": records}

    except Exception as e:
        return {"error": str(e)}
