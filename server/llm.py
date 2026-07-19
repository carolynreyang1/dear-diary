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

prompt = """
Read the user's journal. {text}

First, write a short reflection (understandingMessage) that mirrors the emotional themes without diagnosing the user.

The reflection should:

    feel empathetic
    avoid "you are..."
    avoid mental health diagnoses
    avoid clichés
    be 2 to 4 sentences
    sound thoughtful and poetic
    explain what the writing seems to be searching for


Then recommend the best destination.


Return the archetype that best matches the writing, and a city that is most relevant to the writing, and an eloquent understanding message based on the input text and archetype in the following JSON format:
{{
    "archetype": "string",
    "archetypeDescriptor": "string",
    "city": "string",
    "understandingMessage": "string"
}}
"""


async def get_interpretation(text: str, archetype_list: list[str]) -> Interpretation:
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt.format(text=text, archetype_list=archetype_list),
        config={"response_mime_type": "application/json"},
    )

    raw_text = response.text

    try:
        parsed = json.loads(raw_text)
        return Interpretation(**parsed)
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        raise ValueError(f"Failed to parse LLM response: {raw_text}") from e


if __name__ == '__main__':
    result = asyncio.run(get_interpretation("I'm very sadddd", ARCHETYPES))
    print(result.model_dump_json(indent=2))