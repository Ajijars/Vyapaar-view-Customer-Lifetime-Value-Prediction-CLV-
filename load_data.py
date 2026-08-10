import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://root:password@localhost/retail_db")

files = {
    "sales": "data/Sales_Table.xlsx",
    "customers": "data/Customers_Table.xlsx",
    "products": "data/Products_Table.xlsx",
    "inventory": "data/Inventory_Table.xlsx",
    "expenses": "data/Expenses_Table.xlsx"
}

for table, path in files.items():
    df = pd.read_excel(path)
    df.columns = df.columns.str.lower()
    df.to_sql(table, engine, if_exists="replace", index=False)

print("Data Loaded Successfully")