# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.pipeline import router as pipeline_router

app = FastAPI(title="AutoML-EDA Backend")

# CORS (frontend will call this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register routes
app.include_router(pipeline_router, prefix="/pipeline")

@app.get("/")
def health_check():
    return {"status": "Backend running"}
