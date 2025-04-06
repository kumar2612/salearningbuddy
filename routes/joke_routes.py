from fastapi import APIRouter
from models.joke_model import JokesRequest
from prompts.joke_prompts import joke_system_message, joke_human_message
from langchain_groq import ChatGroq

router = APIRouter()
model = ChatGroq(model="llama-3.3-70b-versatile")

@router.post("/create_joke")
async def create_joke(joke_request: JokesRequest):
    filled_joke_message = joke_human_message["content"].format(
        age=joke_request.age,
        qualities=", ".join(joke_request.qualities),
        name="Ayaana",
        gender=joke_request.gender,
        topics=", ".join(joke_request.topics)
    )

    joke_system_message_with_language = {
        **joke_system_message,
        "content": f"{joke_system_message['content']} The joke should be in {joke_request.language}."
    }

    response = model.invoke([joke_system_message_with_language, filled_joke_message])
    joke_request.joke = response.content
    return {"message": "Joke created successfully", "joke_request": joke_request}