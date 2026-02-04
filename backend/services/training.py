# services/training.py
from sklearn.metrics import accuracy_score, r2_score
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

def detect_model_type(y):
    return "Regression" if y.nunique() > 10 else "Classification"


def train_models(X_train, X_test, y_train, y_test):
    model_type = detect_model_type(y_train)

    models = {}
    scores = {}

    if model_type == "Regression":
        model = RandomForestRegressor()
        model.fit(X_train, y_train)
        preds = model.predict(X_test)

        models["RandomForest"] = model
        scores["RandomForest"] = r2_score(y_test, preds)

    else:
        model = RandomForestClassifier()
        model.fit(X_train, y_train)
        preds = model.predict(X_test)

        models["RandomForest"] = model
        scores["RandomForest"] = accuracy_score(y_test, preds)

    return {
        "model_type": model_type,
        "models": models,
        "metrics": scores
    }
