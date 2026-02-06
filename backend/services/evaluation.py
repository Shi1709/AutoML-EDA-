from sklearn.metrics import (
    r2_score,
    mean_squared_error,
    mean_absolute_error,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
)

def select_best_model(metrics: dict):
    """
    metrics = { model_name: score }
    """
    if not metrics:
        raise ValueError("No metrics provided")

    best_model, best_score = max(metrics.items(), key=lambda x: x[1])

    return {
        "best_model": best_model,
        "best_score": best_score
    }

def evaluate_model(model, X_test, y_test, task_type):
    preds = model.predict(X_test)

    if task_type == "REGRESSION":
        return {
            "r2": round(r2_score(y_test, preds), 4),
            "mse": round(mean_squared_error(y_test, preds), 4),
            "mae": round(mean_absolute_error(y_test, preds), 4),
        }

    elif task_type == "CLASSIFICATION":
        return {
            "accuracy": round(accuracy_score(y_test, preds), 4),
            "precision": round(precision_score(y_test, preds, average="weighted"), 4),
            "recall": round(recall_score(y_test, preds, average="weighted"), 4),
            "f1": round(f1_score(y_test, preds, average="weighted"), 4),
        }

    else:
        raise ValueError(f"Unknown task type: {task_type}")


