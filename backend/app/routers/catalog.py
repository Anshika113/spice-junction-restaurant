from fastapi import APIRouter, HTTPException

from ..data import content

router = APIRouter(tags=["catalog"])


@router.get("/info")
def get_info():
    return content.INFO


@router.get("/offers")
def get_offers():
    return content.OFFERS


@router.get("/menu")
def get_menu(category: str | None = None, q: str | None = None):
    items = content.MENU
    if category and category != "all":
        valid = {c["id"] for c in content.CATEGORIES}
        if category not in valid:
            raise HTTPException(404, f"No category '{category}'")
        items = [i for i in items if i["cat"] == category]
    if q:
        needle = q.strip().lower()
        items = [i for i in items
                 if needle in i["name"].lower() or needle in i["desc"].lower()]
    return {"categories": content.CATEGORIES, "items": items}


@router.get("/reviews")
def get_reviews():
    total = sum(r["rating"] for r in content.REVIEWS)
    count = len(content.REVIEWS)
    return {
        "average": round(total / count, 1) if count else 0,
        "count": count,
        "reviews": content.REVIEWS,
    }
