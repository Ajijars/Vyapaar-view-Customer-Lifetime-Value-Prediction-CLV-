from fastapi import APIRouter
from pydantic import BaseModel
import time

router = APIRouter(prefix="/bot")

class ChatMessage(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatMessage):
    msg = request.message.lower()
    time.sleep(1.0) # Simulate AI thinking time
    
    if "expense" in msg and "march" in msg:
        reply = "In March 2024, your total expenses were ₹71,000 — significantly higher than your 6-month average of ₹57,000 (a 24.5% spike). The main cause was an emergency Raw Material purchase of ₹35,000 (vs. avg ₹17,000). This was a one-time event and expenses normalized in April.\n\n💡 Recommendation: Maintain a raw material buffer stock of 2 weeks to avoid emergency buys at higher prices."
    elif "best selling" in msg or "best-selling" in msg or "highest sell" in msg or "best sell" in msg:
        reply = "Your best selling product by revenue is Amul Milk 1L, generating ₹42,800 recently. By units sold, Parle-G leads with 2,341 units. Both are classified as 'Hot' items with rising demand."
    elif "lowest profit" in msg or "margin" in msg:
        reply = "Amul Butter 500g currently has the lowest profit margin at 10.4%, despite rising sales. We recommend bundling it with high-margin items to boost overall profitability."
    elif "promote" in msg or "deal" in msg or ("which product" in msg and "promote" in msg):
        reply = "Based on trend analysis, I recommend promoting Amul Butter 500g. Sales are rising (+18% MoM) but profit margin is only 10.4% — the lowest among top sellers. A combo offer (Butter + Milk) can boost average order value.\n\nAlso consider Paracetamol Strip — highest margin at 31.8% with consistent demand."
    elif "cash" in msg or "run out" in msg:
        reply = "Based on your current cash flow and upcoming fixed expenses, you have a projected cash shortage in 12 days. Delaying non-essential purchases and collecting receivables can help extend your runway."
    elif "customer" in msg or "churn" in msg:
        reply = "Currently, there are 78 customers at high risk of churning. For example, CUST0001 hasn't purchased in 211 days despite previously spending ₹11,141. I recommend sending a customized 15% discount SMS to the 'High Risk' segment."
    else:
        reply = f"I'm evaluating your dataset... Based on your current Vyapaar data, everything is looking stable. I don't have a specific insight for '{request.message}' right now. Try asking about expenses, products to promote, cash out dates, or churn risk!"
    
    return {"reply": reply}
