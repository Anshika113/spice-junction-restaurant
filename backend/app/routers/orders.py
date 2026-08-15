from fastapi import APIRouter, HTTPException

from .. import store
from ..data import content
from ..schemas import OrderIn, OrderOut

router = APIRouter(tags=["orders"])


@router.post("/orders", response_model=OrderOut)
def place_order(payload: OrderIn):
    if not payload.items:
        raise HTTPException(400, "Cart is empty. Add at least one item.")
    if payload.mode == "delivery" and not (payload.address or "").strip():
        raise HTTPException(400, "Delivery orders need an address.")

    subtotal = sum(line.price * line.qty for line in payload.items)
    d = content.INFO["delivery"]
    fee = 0 if (payload.mode == "takeaway" or subtotal >= d["free_above"]) else d["fee"]
    total = subtotal + fee
    order_id = store.next_ref("SJ")

    lines = "%0A".join(
        f"{l.qty} x {l.name}" + (" (half)" if l.portion == "half" else "")
        for l in payload.items
    )
    wa = (f"Hi Spice Junction, order {order_id}%0A{lines}%0A"
          f"Total Rs {total} — {payload.mode}")

    record = store.save_order({
        "order_id": order_id, "mode": payload.mode, "name": payload.name,
        "phone": payload.phone, "address": payload.address, "note": payload.note,
        "items": [l.model_dump() for l in payload.items], "total": total,
    })

    return OrderOut(
        order_id=record["order_id"],
        status="placed",
        subtotal=subtotal,
        delivery_fee=fee,
        total=total,
        eta_minutes=d["avg_minutes"] if payload.mode == "delivery" else 20,
        whatsapp_text=wa,
    )


@router.get("/orders")
def list_orders():
    """Stands in for the admin panel. Empty after every restart — no DB."""
    return store.all_orders()
