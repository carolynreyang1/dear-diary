from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import inputUserData, outputUserData, stay22Listing
from stay22 import get_listings
from archetypes import ARCHETYPES

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

async def parse_listings(raw_response: dict) -> list[stay22Listing]:
    return [
        stay22Listing(
            name=item.get("name"),
            thumbnail=item.get("thumbnail", {}).get("thumbnail"),
            rating=item.get("rating", {}).get("value"),
            url=item.get("url"),
        )
        for item in raw_response["results"]
    ]


@app.post("/diarytext/")
async def get_diarytext(req: inputUserData):
    #Gemni response
    interpretation = await get_interpretation(userInput.text, ARCHETYPES)

    #Stay22 for each city
    hotels = await get_listings(city)

    listings = await parse_listings(hotels)

    first_hotel = listings[0]
    second_hotel = listings[1]
    third_hotel = listings[2]


    #return callback
    return {
        "archetype": interpretation["archetype"],
        "city": interpretation["city"],

        "hotel1Name": first_hotel.name,
        "hotel1Image": first_hotel.thumbnail,
        "hotel1Rating": first_hotel.rating,
        "hotel1Url": first_hotel.url,

        "hotel2Name": second_hotel.name,
        "hotel2Image": second_hotel.thumbnail,
        "hotel2Rating": second_hotel.rating,
        "hotel2Url": second_hotel.url,

        "hotel3Name": third_hotel.name,
        "hotel3Image": third_hotel.thumbnail,
        "hotel3Rating": third_hotel.rating,
        "hotel3Url": third_hotel.url,

        "message": interpretation["understandingMessage"]
    }
