from sklearn.linear_model import LogisticRegression

def train_churn_model(df):
    model = LogisticRegression()
    model.fit(df[["total_orders", "total_spent"]], df["is_active"])
    return model