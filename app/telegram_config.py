import json
import os
import tempfile

# Use /tmp on Vercel or temporary directory for writing if the root is read-only
CONFIG_FILE = os.path.join(tempfile.gettempdir(), "telegram_config.json")

# Fallback for local dev if file exists in local root
LOCAL_CONFIG = "telegram_config.json"

def get_telegram_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r") as f:
            return json.load(f)
    elif os.path.exists(LOCAL_CONFIG):
        with open(LOCAL_CONFIG, "r") as f:
            return json.load(f)
    return {"chat_id": ""}

def save_telegram_config(chat_id: str):
    with open(CONFIG_FILE, "w") as f:
        json.dump({"chat_id": chat_id}, f)
