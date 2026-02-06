from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
import shutil
import os
import time
import pickle
from pydantic import BaseModel
from typing import List

from services.ingestion import load_dataset
from services.cleaning import handle_nulls
from core.pipeline_state import create_pipeline, get_pipeline, log_activity
from services.correlation import compute_correlation, drop_columns
from services.encoding import label_encode
from services.target import select_target
from services.split import split_dataset
from services.training import train_models
from services.comparison import compare_models
from services.pca import apply_pca
from services.evaluation import select_best_model
from services.visualization import get_feature_importance, prediction_distribution
from fastapi.responses import FileResponse

router = APIRouter()

UPLOAD_DIR = "storage/datasets"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
def upload_dataset(file: UploadFile = File(...)):
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
    pipeline = get_pipeline(pipeline_id)
    log_activity(
        pipeline,
        f"Uploaded dataset {file.filename}",
        "upload"
    )

    return {
        "pipeline_id": pipeline_id,
        "preview": df.head(5).to_dict(orient="records"),
        "columns": df.columns.tolist(),
        "meta": result["meta"]
    }


@router.post("/clean")
def clean_data(pipeline_id: str, strategy: str):
    pipeline = get_pipeline(pipeline_id)

    result = handle_nulls(pipeline["df"], strategy)
    pipeline["df"] = result["df"]
    pipeline["step"] = 2
    log_activity(
        pipeline,
        f"Applied data cleaning ({strategy})",
        "cleaning"
    )

    return {
        "meta": result["meta"],
        "columns": pipeline["df"].columns.tolist()
    }

@router.get("/correlation")
def correlation(pipeline_id: str, threshold: float = 0.9):
    pipeline = get_pipeline(pipeline_id)
    return compute_correlation(pipeline["df"], threshold)

class DropColumnsRequest(BaseModel):
    columns: List[str]

@router.post("/drop-columns")
def drop_corr_columns(pipeline_id: str, payload: DropColumnsRequest):
    pipeline = get_pipeline(pipeline_id)
    pipeline["df"] = pipeline["df"].drop(columns=payload.columns)
    pipeline["step"] = 3
    log_activity(
        pipeline,
        f"Removed correlated columns: {', '.join(payload.columns)}",
        "correlation"
    )

    return {"meta": {"removed": payload.columns}}

@router.post("/encode")
def encode_data(pipeline_id: str, strategy: str = "label"):
    pipeline = get_pipeline(pipeline_id)

    if strategy != "label":
        raise HTTPException(status_code=400, detail="Only label encoding supported")

    result = label_encode(pipeline["df"])

    pipeline["df"] = result["df"]
    pipeline["step"] = 4
    log_activity(
        pipeline,
        "Encoded categorical features (label encoding)",
        "encoding"
    )

    return {
        "meta": result["meta"],
        "columns": pipeline["df"].columns.tolist()
    }

@router.post("/target")
def set_target(pipeline_id: str, target_column: str):
    pipeline = get_pipeline(pipeline_id)

    result = select_target(pipeline["df"], target_column)

    pipeline["X"] = result["X"]
    pipeline["y"] = result["y"]
    pipeline["target"] = result["meta"]["target_column"]
    pipeline["task_type"] = result["meta"]["task_type"]
    pipeline["step"] = 5
    log_activity(
        pipeline,
        f"Selected target column '{target_column}'",
        "target"
    )

    return {
        "meta": result["meta"]
    }

@router.get("/columns")
def get_columns(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)

    df = pipeline["df"]

    return {
        "columns": [
            {
                "name": col,
                "dtype": str(df[col].dtype),
                "unique": int(df[col].nunique()),
                "missing": int(df[col].isnull().sum())
            }
            for col in df.columns
        ]
    }

@router.post("/split")
def split_data(pipeline_id: str, train_percent: int):
    pipeline = get_pipeline(pipeline_id)

    if pipeline["X"] is None or pipeline["y"] is None:
        raise HTTPException(status_code=400, detail="Target not set")

    train_size = train_percent / 100

    result = split_dataset(
        pipeline["X"],
        pipeline["y"],
        train_size,
        pipeline["task_type"]
    )

    pipeline["splits"] = result["splits"]
    pipeline["step"] = 6
    log_activity(
        pipeline,
        f"Split dataset ({train_percent}% train)",
        "split"
    )


    return {
        "meta": result["meta"]
    }

@router.post("/train")
def train(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)

    if pipeline["splits"] is None:
        raise HTTPException(status_code=400, detail="Dataset not split")

    splits = pipeline["splits"]

    result = train_models(
        splits["X_train"],
        splits["X_test"],
        splits["y_train"],
        splits["y_test"],
        pipeline["task_type"]
    )

    pipeline["models"] = result["models"]
    pipeline["metrics"] = result["metrics"]
    pipeline["step"] = 7
    log_activity(
        pipeline,
        f"Trained {len(result['metrics'])} models (3 runs each)",
        "training"
    )


    return {
        "meta": {
            "trained_models": list(result["metrics"].keys()),
            "metrics": result["metrics"]
        }
    }

@router.get("/compare")
def compare(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)

    if not pipeline["metrics"]:
        raise HTTPException(status_code=400, detail="No trained models found")

    result = compare_models(
        pipeline["metrics"],
        pipeline["task_type"]
    )

    pipeline["best_model"] = result["best_model"]
    pipeline["step"] = 8
    log_activity(
        pipeline,
        f"Compared models, best: {result['best_model']}",
        "comparison"
    )

    return result

@router.post("/pca")
def apply_pca_step(
    pipeline_id: str,
    enabled: bool = True,
    variance: int = 95
):
    pipeline = get_pipeline(pipeline_id)

    if not enabled:
        pipeline["step"] = 9
        pipeline["pca"] = None
        return {
            "meta": {
                "enabled": False
            }
        }

    if pipeline["X"] is None:
        raise HTTPException(status_code=400, detail="Target not set")

    result = apply_pca(
        pipeline["X"],
        variance / 100
    )

    pipeline["X"] = result["X_pca"]
    pipeline["pca"] = result["meta"]
    pipeline["step"] = 9
    log_activity(
        pipeline,
        f"PCA {'enabled' if enabled else 'skipped'} (variance={variance}%)",
        "pca"
    )


    return {
        "meta": {
            "enabled": True,
            **result["meta"]
        }
    }

@router.post("/best-model")
def choose_best_model(pipeline_id: str, model_name: str):
    pipeline = get_pipeline(pipeline_id)

    if model_name not in pipeline["models"]:
        raise HTTPException(status_code=400, detail="Model not found")

    pipeline["best_model"] = model_name
    pipeline["step"] = 9
    log_activity(
        pipeline,
        f"Selected best model: {model_name}",
        "selection"
    )

    return {
        "meta": {
            "selected_model": model_name
        }
    }

from services.evaluation import evaluate_model

@router.get("/evaluate")
def evaluate(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)

    if pipeline["best_model"] is None:
        raise HTTPException(status_code=400, detail="Best model not selected")

    if pipeline["splits"] is None:
        raise HTTPException(status_code=400, detail="Dataset not split")

    model_name = pipeline["best_model"]
    model = pipeline["models"][model_name]
    splits = pipeline["splits"]

    metrics = evaluate_model(
        model,
        splits["X_test"],
        splits["y_test"],
        pipeline["task_type"]
    )

    pipeline["evaluation"] = metrics
    pipeline["step"] = 10
    log_activity(
        pipeline,
        f"Evaluated model {model_name}",
        "evaluation"
    )

    return {
        "model": model_name,
        "task_type": pipeline["task_type"],
        "metrics": metrics
    }

@router.get("/visualization")
def visualization(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)

    metrics = pipeline["metrics"]
    log_activity(
        pipeline,
        "Viewed model performance visualization",
        "visualization"
    )

    return {
        "model_scores": [
            {
                "name": name,
                "value": m["avg_score"]
            }
            for name, m in metrics.items()
        ],
        "training_time": [
            {
                "name": name,
                "time": m["avg_time_sec"]
            }
            for name, m in metrics.items()
        ],
        "memory_usage": [
            {
                "name": name,
                "memory": m["avg_memory_mb"]
            }
            for name, m in metrics.items()
        ]
    }

@router.get("/export-model")
def export_model(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)

    model = pipeline["models"].get(pipeline["best_model"])
    if model is None:
        raise HTTPException(400, "No trained model")

    path = f"storage/{pipeline_id}_model.pkl"
    with open(path, "wb") as f:
        pickle.dump(model, f)
    log_activity(
        pipeline,
        "Downloaded trained model (.pkl)",
        "export"
    )

    return FileResponse(path, filename="best_model.pkl")

@router.get("/export-predictions")
def export_predictions(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)

    model = pipeline["models"][pipeline["best_model"]]
    splits = pipeline["splits"]

    preds = model.predict(splits["X_test"])

    df = splits["X_test"].copy()
    df["actual"] = splits["y_test"].values
    df["predicted"] = preds

    path = f"storage/{pipeline_id}_predictions.csv"
    df.to_csv(path, index=False)

    return FileResponse(path, filename="predictions.csv")

@router.get("/activity")
def get_activity(pipeline_id: str):
    pipeline = get_pipeline(pipeline_id)
    return {"events": pipeline.get("activity", [])}
