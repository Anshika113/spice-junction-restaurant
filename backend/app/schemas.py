from typing import List, Optional
from pydantic import BaseModel, Field


class CartLine(BaseModel):
    id: str
    name: str
    portion: str = "full"          # "full" | "half"
    qty: int = Field(ge=1, le=50)
    price: int                      # unit price in rupees


class OrderIn(BaseModel):
    mode: str = "delivery"          # "delivery" | "takeaway"
    name: str
    phone: str
    address: Optional[str] = None
    note: Optional[str] = None
    items: List[CartLine]


class OrderOut(BaseModel):
    order_id: str
    status: str
    subtotal: int
    delivery_fee: int
    total: int
    eta_minutes: int
    whatsapp_text: str


class TableBookingIn(BaseModel):
    name: str
    phone: str
    date: str
    slot: str
    guests: int = Field(ge=1, le=40)
    note: Optional[str] = None


class PartyBookingIn(BaseModel):
    name: str
    phone: str
    date: str
    guests: int = Field(ge=10, le=400)
    kind: str = "buffet"            # "buffet" | "party" | "corporate"
    veg_only: bool = False
    note: Optional[str] = None


class BookingOut(BaseModel):
    booking_id: str
    status: str
    message: str
    estimate: Optional[int] = None
