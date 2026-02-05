PIPELINES = {}

def create_pipeline(pipeline_id, df):
    PIPELINES[pipeline_id] = {
        "step": 1,
        "df": df,
        "splits": None,
        "models": {},
        "metrics": {},
        "experiments": {}
    }

def get_pipeline(pipeline_id):
    return PIPELINES[pipeline_id]
