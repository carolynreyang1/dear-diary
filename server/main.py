from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReadingRequest(BaseModel):
    text: str

class Listing(BaseModel):
    image: str
    price: str
    source: str
    url: str

class ReadingResponse(BaseModel):
    archetype: str
    city: str
    reflection: str
    listings: list[Listing]

@app.post("/api/reading", response_model=ReadingResponse)
async def get_reading(req: ReadingRequest):
    # TODO: call LLM, then Stay22
    return ReadingResponse(
        archetype="stub",
        city="stub",
        reflection="stub reflection",
        listings=[]
    )
