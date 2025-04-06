from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from langgraph.prebuilt import create_react_agent
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

model = ChatGroq(model="llama-3.3-70b-versatile")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow calls from localhost
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class StoryRequest(BaseModel):
    text: str
    topics: List[str]
    age: int
    gender: str
    qualities: List[str]
    story: str = None

system_message = {
    "role": "system",
    "content": "You are a very nice storyteller, who is an expert in telling stories to little children."
}

human_message = {
    "role": "user",
    "content": "Can you tell a story for a {age} year old {gender}.The "
    "child is named {name} and he is {qualities}. Generate a story based on the based on the topics {topics}, " \
               "and limit the story to 300 words? Make sure the story is understandable by a child of {age} years old. " \
}

# Example usage with the StoryRequest model
# story_request = StoryRequest(
#     text="Can you tell a story?",
#     topics=["sea", "beach", "sand", "fish", "boat", "island", "sun", "moon", "stars"],
#     age=7,
#     qualities=["curious", "adventurous"]
# )
# json post body for the above request
# {
#     "text": "Can you tell a story?",
#     "topics": ["sea", "beach", "sand", "fish", "boat", "island", "sun", "moon", "stars"],
#     "age": 7,
#     "qualities": ["curious", "adventurous"]
# }
# Filling the prompt dynamically
# filled_human_message = human_message["content"].format(
#     age=story_request.age,
#     qualities=", ".join(story_request.qualities),
#     name="Ayaana",
#     topics=", ".join(story_request.topics)
# )

#print(filled_human_message)

@app.post("/create_story")
async def create_story(story_request: StoryRequest):
    # Process the story request here
    filled_human_message = human_message["content"].format(
        age=story_request.age,
        qualities=", ".join(story_request.qualities),
        name="Ayaana",
        gender=story_request.gender,
        topics=", ".join(story_request.topics)
    )
    response = model.invoke([system_message, filled_human_message])
    print(response.content)
    story_request.story = response.content
    return {"message": "Story created successfully", "story_request": story_request}

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
