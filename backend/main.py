"""Spice Junction — demo API.

Run:  uvicorn main:app --reload --port 8000
Docs: http://localhost:8000/docs

No database is connected. All content is in app/data/content.py and orders /
bookings live in memory only (app/store.py). The frontend runs fine without
this server at all — see frontend/src/api/client.js.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import bookings, catalog, orders

app = FastAPI(title="Spice Junction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(catalog.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(bookings.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"ok": True, "db": "not connected (demo)"}
