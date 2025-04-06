from pydantic import BaseModel
from typing import List, Optional

class JokesRequest(BaseModel):
    text: str
    topics: List[str]
    age: int
    gender: str
    qualities: List[str]
    joke: Optional[str] = None
    language: str = "English"  # Default language is English