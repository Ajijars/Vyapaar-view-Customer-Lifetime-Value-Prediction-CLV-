import json
import os

CONFIG_FILE = "telegram_config.json"

def get_telegram_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r") as f:
            return json.load(f)
    return {"chat_id": ""}

def save_telegram_config(chat_id: str):
    with open(CONFIG_FILE, "w") as f:
        json.dump({"chat_id": chat_id}, f)
