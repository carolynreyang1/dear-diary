from google import genai
from fastapi import FastAPI, Form, APIRouter
import os
from dotenv import load_dotenv
from archetypes import ARCHETYPES
import json
from models import Interpretation
import asyncio

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

prompt = """
You are analyzing the emotional weather of a piece of personal writing — not just the mood, but the pacing, tension, and what the writing is reaching for.

Here are the archetypes you can match against:

{archetype_list}

Here is the personal writing to analyze:

{text}


Return the archetype that best matches the writing, and a citie that is most relevant to the writing, and an eloquent understanding message based on the input text and archetype in the following JSON format:
{{
    "archetype": "string",
    "city": "string",
    "understandingMessage": "string"
}}
"""

# def get_interpretation(text: str, archetype_list: list[str]):
#     response = client.interactions.create(
#         model="gemini-3.5-flash",
#         input=prompt.format(text=text, archetype_list=archetype_list)
#     )
#     print(response.output_text)
#     return response.output_text


async def get_interpretation(text: str, archetype_list: list[str]) -> Interpretation:
    response = client.interactions.create(
        model="gemini-3.5-flash",
        input=prompt.format(text=text, archetype_list=archetype_list)
    )

    raw_text = response.output_text

    try:
        parsed = json.loads(raw_text)
        return Interpretation(**parsed)
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        raise ValueError(f"Failed to parse LLM response: {raw_text}") from e

if __name__ == '__main__': 
    result = asyncio.run(get_interpretation("I'm very sadddd", ARCHETYPES))
    print(result.model_dump_json(indent=2))