from fastapi import APIRouter
from models.rhyme_model import RhymesRequest
from prompts.rhyme_prompts import rhyme_system_message, rhyme_human_message
from langchain_groq import ChatGroq

router = APIRouter()
model = ChatGroq(model="llama-3.3-70b-versatile")

@router.post("/create_rhyme")
async def create_rhyme(rhyme_request: RhymesRequest):
    filled_rhyme_message = rhyme_human_message["content"].format(
        age=rhyme_request.age,
        qualities=", ".join(rhyme_request.qualities),
        name="Ayaana",
        gender=rhyme_request.gender,
        topics=", ".join(rhyme_request.topics)
    )

    rhyme_system_message_with_language = {
        **rhyme_system_message,
        "content": f"{rhyme_system_message['content']} The rhyme should be in {rhyme_request.language}."
    }

    response = model.invoke([rhyme_system_message_with_language, filled_rhyme_message])
    rhyme_request.rhyme = response.content
    return {"message": "Rhyme created successfully", "rhyme_request": rhyme_request}