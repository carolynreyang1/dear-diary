import os
import json
import asyncio

from google import genai
from fastapi import FastAPI, Form, APIRouter
from dotenv import load_dotenv
from archetypes import ARCHETYPES
from models import Interpretation
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


async def extract_text_from_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> str:
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            {
                "inline_data": {
                    "mime_type": mime_type,
                    "data": image_bytes,
                }
            },
            "Transcribe any handwritten or typed journal text visible in this image. Return only the transcribed text, nothing else — no commentary, no formatting.",
        ],
    )
    return response.text



