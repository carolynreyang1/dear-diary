import os
import httpx
import requests
import string
import asyncio
import json

from fastapi import APIRouter, Form
from typing import Annotated
from models import inputUserData, outputUserData, stay22Listing
from cities import CITY_COORDS
from dotenv import load_dotenv

router = APIRouter()
load_dotenv()
STAY22_API_KEY = os.getenv("STAY22_API_KEY")  

async def get_listings(address: string):
    url = "https://api.stay22.com/v2/accommodations"
    headers = {"X-API-KEY": STAY22_API_KEY}
    params = {
        "address": address,
        "pageSize": 3,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()

if __name__ == '__main__': 
    result = asyncio.run(get_listings("Tokyo, Japan"))
    print(json.dumps(result, indent=2))

#thumbnail
#multiple hotels in 3 diff locations
#name
#ratings
# consolation message - I understand how you are feeling because of ____, you should ____ and go to these places
# naming your mood
