# test_llm.py
import asyncio
from llm import get_interpretation

sample_text = """[Dear Diary,
Got up around 8 am. Fell off my bed, but didn’t get badly injured. Brushed my teeth with the new bubblegum toothpaste from Erewhon. Lowkey a gimmick. Fed the cat her breakfast tuna. I ate tuna for breakfast too, but the organic kind. Not the nasty stuff in cans. Working from home today, but I spent a good 30 minutes trying to figure out a “clean” background for my 10 am meeting. The meeting was very short. I didn’t have any tasks for the day either. I wish I had more things to do.
]"""

async def main():
    result = await get_interpretation(sample_text)
    print(result)

asyncio.run(main())