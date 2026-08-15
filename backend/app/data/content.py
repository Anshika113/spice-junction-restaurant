"""Single source of truth for all demo content.

The actual data lives in content.json next to this file so the React frontend
can read the exact same file (frontend/npm run sync copies it into src/content/).
Edit content.json, not this module. That JSON is also what an admin panel would
write to before a real database is introduced.
"""
import json
from pathlib import Path

_DATA = json.loads((Path(__file__).parent / "content.json").read_text(encoding="utf-8"))

INFO = _DATA["info"]
OFFERS = _DATA["offers"]
CATEGORIES = _DATA["categories"]
MENU = _DATA["menu"]
REVIEWS = _DATA["reviews"]
