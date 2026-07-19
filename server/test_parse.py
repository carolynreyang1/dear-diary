# test_parse.py
import asyncio
from main import parse_listings

# fake response shaped like a real Stay22 API result
fake_raw_response = {
    "results": [
        {
            "name": "Hoshinoya Kyoto",
            "media": {"thumbnail": "https://example.com/img1.jpg"},
            "suppliers": {
                "booking": {"price": {"total": 420}, "link": "https://booking.com/hoshinoya"}
            },
            "rating": {"hotelStars": 5},
            "url": "https://stay22.com/listing/1",
        },
        {
            "name": "Sowaka",
            "media": {"thumbnail": "https://example.com/img2.jpg"},
            "suppliers": {
                "vrbo": {"price": {"total": 280}, "link": "https://vrbo.com/sowaka"}
            },
            "rating": {"hotelStars": 4},
            "url": "https://stay22.com/listing/2",
        },
        {
            "name": "No Supplier Hotel",
            "media": {},
            "suppliers": {},  # edge case: no supplier data at all
            "rating": {},
            "url": "https://stay22.com/listing/3",
        },
    ]
}


async def main():
    listings = await parse_listings(fake_raw_response)
    for i, listing in enumerate(listings, start=1):
        print(f"--- Listing {i} ---")
        print(listing.model_dump_json(indent=2))


if __name__ == "__main__":
    asyncio.run(main())