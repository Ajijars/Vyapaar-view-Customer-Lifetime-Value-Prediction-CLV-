import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler


def compute_rfm(df: pd.DataFrame) -> pd.DataFrame:
    """
    Compute RFM (Recency, Frequency, Monetary) features from customer DataFrame.
    Expects columns: customer_id, total_orders, total_spent, last_purchase_date (or days_since_last_purchase)
    """
    df = df.copy()

    # Recency: days since last purchase (lower = better)
    if "days_since_last_purchase" in df.columns:
        df["recency"] = pd.to_numeric(df["days_since_last_purchase"], errors="coerce").fillna(365)
    elif "last_purchase_date" in df.columns:
        df["last_purchase_date"] = pd.to_datetime(df["last_purchase_date"], errors="coerce")
        reference_date = pd.Timestamp.today()
        df["recency"] = (reference_date - df["last_purchase_date"]).dt.days.fillna(365)
    else:
        df["recency"] = 90  # fallback default

    # Frequency: total orders
    df["frequency"] = pd.to_numeric(df.get("total_orders", 1), errors="coerce").fillna(1)

    # Monetary: total spent
    df["monetary"] = pd.to_numeric(df.get("total_spent", 0), errors="coerce").fillna(0)

    # Avg order value
    df["avg_order_value"] = df["monetary"] / df["frequency"].replace(0, 1)

    return df


def score_rfm(df: pd.DataFrame) -> pd.DataFrame:
    """Assign RFM scores 1-5 and compute composite RFM score."""
    df = df.copy()

    # Recency: lower is better → reverse rank
    df["r_score"] = pd.qcut(df["recency"].rank(method="first"), 5, labels=[5, 4, 3, 2, 1]).astype(int)
    df["f_score"] = pd.qcut(df["frequency"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)
    df["m_score"] = pd.qcut(df["monetary"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)

    # Composite RFM score (weighted: R=40%, F=35%, M=25%)
    df["rfm_score"] = (df["r_score"] * 0.40 + df["f_score"] * 0.35 + df["m_score"] * 0.25).round(2)

    return df


def assign_segment(rfm_score: float) -> str:
    """Map composite RFM score to a business segment."""
    if rfm_score >= 4.0:
        return "Champion"
    elif rfm_score >= 3.0:
        return "Loyal"
    elif rfm_score >= 2.0:
        return "At Risk"
    else:
        return "Lost"


def train_clv_model(df: pd.DataFrame):
    """
    Train a Linear Regression model to predict 12-month CLV.
    Uses RFM features as inputs.
    Returns (model, scaler, feature_columns).
    """
    df = compute_rfm(df)
    df = score_rfm(df)

    feature_cols = ["recency", "frequency", "monetary", "avg_order_value"]
    X = df[feature_cols].fillna(0)

    # Synthetic CLV target: monetary * frequency_multiplier * recency_discount
    # This mimics a real CLV formula when ground-truth isn't available
    recency_discount = np.exp(-df["recency"] / 365)
    frequency_multiplier = np.log1p(df["frequency"])
    df["clv_target"] = df["avg_order_value"] * frequency_multiplier * recency_discount * 12

    y = df["clv_target"]

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    model = LinearRegression()
    model.fit(X_scaled, y)

    return model, scaler, feature_cols


def predict_clv(df: pd.DataFrame):
    """
    Full CLV prediction pipeline.
    Returns enriched DataFrame with clv_predicted, rfm_score, segment columns.
    """
    df = df.copy()
    df = compute_rfm(df)
    df = score_rfm(df)

    feature_cols = ["recency", "frequency", "monetary", "avg_order_value"]
    X = df[feature_cols].fillna(0)

    model, scaler, _ = train_clv_model(df)
    X_scaled = scaler.transform(X)

    df["clv_predicted"] = model.predict(X_scaled).clip(min=0).round(2)
    df["segment"] = df["rfm_score"].apply(assign_segment)

    return df
