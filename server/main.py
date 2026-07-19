from fastapi import FastAPI, Request, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from models import inputUserData, stay22Listing
from stay22 import get_listings
from llm import get_interpretation
from imageParse import extract_text_from_image
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
    listings = []
    for item in raw_response["results"]:
        suppliers = item.get("suppliers", {})
        supplier_name, supplier_data = next(iter(suppliers.items()), (None, {}))
        price = supplier_data.get("price", {}).get("total")

        listings.append(stay22Listing(
            name=item.get("name"),
            thumbnail=item.get("media", {}).get("thumbnail"),
            price=price,
            source=supplier_name,
            rating=item.get("rating", {}).get("hotelStars"),
            url=item.get("url"),
        ))
    return listings


@app.post("/api/reading")
async def get_diarytext(request: Request):

    content_type = request.headers.get("content-type", "")
    
    if "application/json" in content_type:
        # existing text path
        body = await request.json()
        req = inputUserData(**body)
        text = req.text

    elif "multipart/form-data" in content_type:
        # new image path
        form = await request.form()
        image_file: UploadFile = form["image"]
        image_bytes = await image_file.read()
        text = await extract_text_from_image(image_bytes, mime_type=image_file.content_type)

    else:
        raise HTTPException(status_code=415, detail="Unsupported content type.")

    interpretation = await get_interpretation(text, ARCHETYPES)
    hotels = await get_listings(interpretation.city)
    listings = await parse_listings(hotels)

    # pad with None if fewer than 3 listings come back, so we don't crash
    while len(listings) < 3:
        listings.append(None)

    first_hotel, second_hotel, third_hotel = listings[0], listings[1], listings[2]

    def hotel_fields(hotel, n):
        if hotel is None:
            return {f"hotel{n}Name": None, f"hotel{n}Image": None, f"hotel{n}Price": None,
                     f"hotel{n}Source": None, f"hotel{n}Rating": None, f"hotel{n}Url": None}
        return {
            f"hotel{n}Name": hotel.name,
            f"hotel{n}Image": hotel.thumbnail,
            f"hotel{n}Price": hotel.price,
            f"hotel{n}Source": hotel.source,
            f"hotel{n}Rating": hotel.rating,
            f"hotel{n}Url": hotel.url,
        }

    return {
        "description": interpretation.understandingMessage,
        "archetype": interpretation.archetype,
        "city": interpretation.city,
        **hotel_fields(first_hotel, 1),
        **hotel_fields(second_hotel, 2),
        **hotel_fields(third_hotel, 3),
        "message": interpretation.understandingMessage,
    }