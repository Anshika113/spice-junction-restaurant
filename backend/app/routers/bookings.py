from fastapi import APIRouter

from .. import store
from ..schemas import BookingOut, PartyBookingIn, TableBookingIn

router = APIRouter(tags=["bookings"])

PER_PLATE = {"buffet": 449, "party": 649, "corporate": 549}


@router.post("/bookings/table", response_model=BookingOut)
def book_table(payload: TableBookingIn):
    record = store.save_booking({"kind": "table",
                                 "booking_id": store.next_ref("TB"),
                                 **payload.model_dump()})
    return BookingOut(
        booking_id=record["booking_id"],
        status="held",
        message=(f"Table for {payload.guests} held on {payload.date} at {payload.slot}. "
                 f"We hold it for 15 minutes past the slot."),
    )


@router.post("/bookings/party", response_model=BookingOut)
def book_party(payload: PartyBookingIn):
    plate = PER_PLATE.get(payload.kind, 449)
    if payload.veg_only:
        plate -= 50
    if payload.guests >= 100:
        plate -= 30
    record = store.save_booking({"kind": payload.kind,
                                 "booking_id": store.next_ref("PB"),
                                 "per_plate": plate,
                                 **payload.model_dump()})
    return BookingOut(
        booking_id=record["booking_id"],
        status="quoted",
        message=(f"Estimate for {payload.guests} guests at Rs {plate} per plate. "
                 f"Our manager confirms the final menu on call."),
        estimate=plate * payload.guests,
    )


@router.get("/bookings")
def list_bookings():
    return store.all_bookings()
