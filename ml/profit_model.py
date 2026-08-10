import pandas as pd
from sklearn.linear_model import LinearRegression

def train_profit_model(sales_df, expense_df):
    sales_df['date'] = pd.to_datetime(sales_df['date'])
    expense_df['date'] = pd.to_datetime(expense_df['date'])

    revenue = sales_df.groupby(sales_df['date'].dt.month)['revenue'].sum()
    expenses = expense_df.groupby(expense_df['date'].dt.month)['amount'].sum()

    df = pd.DataFrame({"revenue": revenue, "expenses": expenses}).fillna(0)
    df["profit"] = df["revenue"] - df["expenses"]

    model = LinearRegression()
    model.fit(df[["revenue", "expenses"]], df["profit"])

    return model