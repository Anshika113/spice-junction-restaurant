"""In-memory store. Nothing is persisted — the process restart clears it.

This is deliberate for the demo. To go live, replace the three functions with
inserts against a real table; callers do not change.
"""
import itertools
from datetime import datetime

_orders = []
_bookings = []
_counter = itertools.count(1041)


def next_ref(prefix: str) -> str:
    return f"{prefix}-{next(_counter)}"


def save_order(record: dict) -> dict:
    record["created_at"] = datetime.now().isoformat(timespec="seconds")
    _orders.append(record)
    return record


def save_booking(record: dict) -> dict:
    record["created_at"] = datetime.now().isoformat(timespec="seconds")
    _bookings.append(record)
    return record


def all_orders():
    return list(reversed(_orders))


def all_bookings():
    return list(reversed(_bookings))
