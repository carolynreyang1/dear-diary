from typing import Annotated

from fastapi import FastAPI, Form
from pydantic import BaseModel

app = FastAPI()

#Input user data model
class inputUserData(BaseModel):
    diaryEntry: str

#output model
class stay22Listing(BaseModel):
    name: str
    thumbnail: str | None = None
    rating: float | None = None
    url: str

class outputUserData(BaseModel):
    archetype: str
    city: str
    reflection: str
    listings: list[stay22Listing]


#LLM API request model
class llmInputData(BaseModel):
    diaryEntry: str

class Interpretation(BaseModel):
    archetype: str
    city: str
    understandingMessage: str


#Stay22 API response model
class stay22Response(BaseModel):
    listings: list[stay22Listing]

