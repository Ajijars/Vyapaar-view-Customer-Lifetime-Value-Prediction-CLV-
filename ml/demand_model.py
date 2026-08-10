from sklearn.linear_model import LinearRegression

def demand_model(df):
    df = df.sort_values("date")
    df["t"] = range(len(df))

    model = LinearRegression()
    model.fit(df[["t"]], df["quantity_sold"])

    return model