import pandas as pd

BASE_PATH = "data"

def clean_df(df):
    df.columns = df.columns.str.strip().str.lower()
    return df

def filter_df(df, shop_id="SHOP_001", year=2024):
    if 'store_id' in df.columns:
        df = df[df['store_id'] == shop_id]
    if 'year' in df.columns:
        df = df[df['year'] == year]
    return df

def get_sales_df():
    try:
        df = pd.read_excel(f"{BASE_PATH}/Sales_Table.xlsx", header=1)
        return filter_df(clean_df(df))
    except Exception:
        return pd.DataFrame()

def get_expense_df():
    try:
        df = pd.read_excel(f"{BASE_PATH}/Expenses_Table.xlsx", header=1)
        return filter_df(clean_df(df))
    except Exception:
        return pd.DataFrame()

def get_customer_df():
    try:
        df = pd.read_excel(f"{BASE_PATH}/Customers_Table.xlsx", header=1)
        return filter_df(clean_df(df))
    except Exception:
        return pd.DataFrame()

def get_inventory_df():
    try:
        df = pd.read_excel(f"{BASE_PATH}/Inventory_Table.xlsx", header=1)
        return filter_df(clean_df(df))
    except Exception:
        return pd.DataFrame()
