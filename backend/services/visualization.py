import pandas as pd

def get_feature_importance(model, feature_names):
    if not hasattr(model, "feature_importances_"):
        return []

    return [
        {"name": feature_names[i], "value": round(float(v), 4)}
        for i, v in enumerate(model.feature_importances_)
    ]

def prediction_distribution(y_true, y_pred):
    error = abs(y_true - y_pred)
    correct = (error <= error.mean()).sum()
    incorrect = len(error) - correct

    return [
        {"name": "Correct", "value": int(correct)},
        {"name": "Incorrect", "value": int(incorrect)},
    ]
