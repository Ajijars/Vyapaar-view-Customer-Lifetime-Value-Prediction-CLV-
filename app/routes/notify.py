from fastapi import APIRouter, HTTPException
import urllib.request
import urllib.parse
import json
import pandas as pd
from pydantic import BaseModel
from app.telegram_config import save_telegram_config, get_telegram_config
from app.utils import get_sales_df, get_inventory_df

router = APIRouter(prefix="/notify")

TELEGRAM_TOKEN = "8738135246:AAGeYdcFZOcmIiH3LIp7d0VLXzD3ofhIrWs"

class ConfigRequest(BaseModel):
    chat_id: str

@router.post("/setup")
def setup_telegram(req: ConfigRequest):
    save_telegram_config(req.chat_id)
    return {"status": "success", "message": "Telegram Chat ID saved successfully"}

@router.get("/config")
def get_config():
    return get_telegram_config()

@router.post("/close-day")
async def close_day():
    config = get_telegram_config()
    chat_id = config.get("chat_id")
    if not chat_id:
        raise HTTPException(status_code=400, detail="Telegram Chat ID not configured. Please set it in Settings.")
        
    try:
        sales_df = get_sales_df()
        inv_df = get_inventory_df()
        
        # Get 'today' based on the most recent date in the dataset
        latest_date = pd.to_datetime(sales_df['date']).max()
        daily_sales = sales_df[pd.to_datetime(sales_df['date']) == latest_date]
        
        total_revenue = daily_sales['revenue'].sum()
        total_profit = daily_sales['gross_profit'].sum()
        total_orders = daily_sales['invoice_number'].nunique() if 'invoice_number' in daily_sales.columns else len(daily_sales)
        
        # Format date for display
        display_date = latest_date.strftime("%d %b %Y")
        
        # Low inventory
        low_stock_items = []
        if 'current_stock' in inv_df.columns:
            low_df = inv_df[pd.to_numeric(inv_df['current_stock'], errors='coerce') < 20]
            if not low_df.empty:
                for _, row in low_df.head(5).iterrows():
                    name = row.get('product_name', row.get('name', 'Unknown'))
                    stock = row.get('current_stock', 0)
                    low_stock_items.append(f"• {name}: {stock} left")
                if len(low_df) > 5:
                    low_stock_items.append(f"...and {len(low_df) - 5} more items.")
        
        low_stock_text = "\\n".join(low_stock_items) if low_stock_items else "All items are well stocked! ✅"
        
        message = (
            f"📊 *DAILY SUMMARY REPORT*\\n"
            f"📅 Date: {display_date}\\n\\n"
            f"💰 *Total Sales:* ₹{total_revenue:,.2f}\\n"
            f"📈 *Net Profit:* ₹{total_profit:,.2f}\\n"
            f"🛒 *Total Orders:* {total_orders}\\n\\n"
            f"⚠️ *Low Inventory Alerts:*\\n"
            f"{low_stock_text}\\n\\n"
            f"Good job today! 🎉"
        )
        
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": message,
            "parse_mode": "Markdown"
        }
        
        req_body = json.dumps(payload).encode('utf-8')
        req_obj = urllib.request.Request(url, data=req_body, headers={'Content-Type': 'application/json'})
        
        try:
            with urllib.request.urlopen(req_obj) as resp:
                resp.read()
            return {"status": "success", "message": "Notification sent successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Telegram API Error: {str(e)}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send notification: {str(e)}")
