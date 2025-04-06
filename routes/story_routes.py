from fastapi import APIRouter
from models.story_model import StoryRequest
from prompts.story_prompts import system_message, human_message
from langchain_groq import ChatGroq

router = APIRouter()
model = ChatGroq(model="meta-llama/llama-4-scout-17b-16e-instruct")

@router.post("/create_story")
async def create_story(story_request: StoryRequest):
    filled_human_message = human_message["content"].format(
        age=story_request.age,
        qualities=", ".join(story_request.qualities),
        name="Ayaana",
        gender=story_request.gender,
        topics=", ".join(story_request.topics)
    )

    system_message_with_language = {
        **system_message,
        "content": f"{system_message['content']} The story should be in {story_request.language}."
    }

    response = model.invoke([system_message_with_language, filled_human_message])
    story_request.story = response.content
    return {"message": "Story created successfully", "story_request": story_request}