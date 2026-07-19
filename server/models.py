from typing import Annotated

from fastapi import FastAPI, Form
from pydantic import BaseModel

app = FastAPI()

#Input user data model
class inputUserData(BaseModel):
    text: str

#output model
class stay22Listing(BaseModel):
    name: str | None = None
    thumbnail: str | None = None
    price: float | None = None
    source: str | None = None
    rating: int | None = None
    url: str | None = None
    lat: float | None
    lng: float | None

#Stay22 API response model
class stay22Response(BaseModel):
    listings: list[stay22Listing]

class outputUserData(BaseModel):
    reflection: str
    city: str
    archetype: str
    listings: list[stay22Listing]



#LLM API request model
class llmInputData(BaseModel):
    diaryEntry: str

class Interpretation(BaseModel):
    archetype: str
    archetypeDescriptor: str
    city: str
    understandingMessage: str

