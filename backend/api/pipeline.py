# backend/api/pipeline.py
from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
import shutil
import os

from services.ingestion import load_dataset
from services.cleaning import handle_nulls
from core.pipeline_state import create_pipeline, get_pipeline

router = APIRouter()

UPLOAD_DIR = "backend/storage/datasets"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
def upload_dataset(file: UploadFile = File(...)):
    """
    Step 1: Upload dataset and create pipeline
    """

    pipeline_id = str(uuid.uuid4())

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = load_dataset(file_path)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    df = result["df"]
    create_pipeline(pipeline_id, df)

    return {
        "pipeline_id": pipeline_id,
        "preview": df.head(5).to_dict(orient="records"),
        "columns": list(df.columns),
        "meta": result["meta"]
    }


@router.post("/clean")
def clean_data(pipeline_id: str, strategy: str):
    """
    Step 2: Handle null values
    strategy = 'drop' | 'fill'
    """

    pipeline = get_pipeline(pipeline_id)

    result = handle_nulls(pipeline["df"], strategy)

    pipeline["df"] = result["df"]
    pipeline["step"] = 2

    return {
        "meta": result["meta"],
        "columns": list(pipeline["df"].columns)
    }
