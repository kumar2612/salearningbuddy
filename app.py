from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.story_routes import router as story_router
from routes.rhyme_routes import router as rhyme_router
from routes.joke_routes import router as joke_router

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(story_router, prefix="/story", tags=["Story"])
app.include_router(rhyme_router, prefix="/rhyme", tags=["Rhyme"])
app.include_router(joke_router, prefix="/joke", tags=["Joke"])

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
