# test_image.py
import asyncio
import httpx
from imageParse import extract_text_from_image

# ---------------------------------------------------------
# TEST 1: extract_text_from_image() in isolation, no server needed
# ---------------------------------------------------------

async def test_vision_directly():
    print("=== Test 1: direct vision call ===")

    # point this at a real image file on your machine — a photo of
    # handwritten or typed text works best for testing
    image_path = "test_assets/Screenshot.png"

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    text = await extract_text_from_image(image_bytes, mime_type="image/jpeg")
    print("Extracted text:")
    print(text)
    print()


# ---------------------------------------------------------
# TEST 2: full end-to-end request against the running server
# (start uvicorn in another terminal before running this)
# ---------------------------------------------------------

async def test_full_endpoint():
    print("=== Test 2: full /api/reading multipart request ===")

    image_path = "test_assets/Screenshot.png"

    async with httpx.AsyncClient() as client:
        with open(image_path, "rb") as f:
            files = {"image": ("test_assets/Screenshot.png", f, "image/jpeg")}
            response = await client.post(
                "http://localhost:8000/api/reading",
                files=files,
                timeout=30.0,  # vision + LLM + Stay22 can be slow
            )

    print("Status code:", response.status_code)
    print("Response body:")
    print(response.json())


async def main():
    await test_vision_directly()
    await test_full_endpoint()


if __name__ == "__main__":
    asyncio.run(main())