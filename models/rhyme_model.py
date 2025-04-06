from pydantic import BaseModel
from typing import List, Optional

class RhymesRequest(BaseModel):
    text: str
    topics: List[str]
    age: int
    gender: str
    qualities: List[str]
    rhyme: Optional[str] = None
    language: str = "English"  # Default language is English