from datetime import datetime

PIPELINES = {}

def create_pipeline(pipeline_id, df):
    PIPELINES[pipeline_id] = {
        "step": 1,
        "df": df,
        "X": None,
        "y": None,
        "target": None,
        "task_type": None,
        "splits": None,
        "models": {},
        "metrics": {},
        "best_model": None,
        "pca": None,
        "evaluation": None,
        "activity": []
    }

def get_pipeline(pipeline_id):
    if pipeline_id not in PIPELINES:
        raise ValueError("Invalid pipeline_id")
    return PIPELINES[pipeline_id]

def log_activity(pipeline, text: str, tag: str):
    pipeline.setdefault("activity", []).append({
        "text": text,
        "tag": tag,
        "time": datetime.now().strftime("%I:%M:%S %p")
    })
