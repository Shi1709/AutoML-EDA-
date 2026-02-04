# services/evaluation.py
def select_best_model(metrics: dict):
    """
    metrics = { model_name: score }
    """
    best_model = max(metrics.items(), key=lambda x: x[1])

    return {
        "best_model": best_model[0],
        "best_score": best_model[1]
    }
