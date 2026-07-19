import asyncio
from models import stay22Listing
from main import parse_listings  # or wherever it lives

mock_response = {
    "results": [
        {
            "name": "Iruma INN",
            "thumbnail": {"thumbnail": "https://example.com/thumb1.jpg"},
            "rating": {"value": 8.3},
            "url": "https://www.stay22.com/allez/roam/usds_aa5c176f4c76d90648d6a8940c5a1c41.0000",
        },
        {
            "name": "Cruise garden",
            "thumbnail": {"thumbnail": "https://example.com/thumb2.jpg"},
            "rating": {"value": 8.3},
            "url": "https://www.stay22.com/allez/roam/usds_f27def1fc53c555b9552f203b8862b25.0000",
        },
    ]
}

async def test():
    listings = await parse_listings(mock_response)
    for hotel in listings:
        print(hotel)
        print(mock_response["results"][0]["thumbnail"]["thumbnail"])
        assert hotel.name is not None
        assert hotel.thumbnail is not None

asyncio.run(test())