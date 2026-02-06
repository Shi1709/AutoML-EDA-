import time
import psutil
import os
import numpy as np
from sklearn.metrics import r2_score, accuracy_score
from services.model_registry import get_models

PROCESS = psutil.Process(os.getpid())

def train_models(X_train, X_test, y_train, y_test, task_type, runs=3):
    models = get_models(task_type)

    final_models = {}
    metrics = {}

    for name, model in models.items():
        scores = []
        times = []
        memories = []

        for _ in range(runs):
            start_mem = PROCESS.memory_info().rss / (1024 ** 2)
            start_time = time.perf_counter()

            model.fit(X_train, y_train)
            preds = model.predict(X_test)

            end_time = time.perf_counter()
            end_mem = PROCESS.memory_info().rss / (1024 ** 2)

            if task_type == "REGRESSION":
                score = r2_score(y_test, preds)
            else:
                score = accuracy_score(y_test, preds)

            scores.append(score)
            times.append(end_time - start_time)
            memories.append(end_mem - start_mem)

        metrics[name] = {
            "avg_score": round(float(np.mean(scores)), 4),
            "avg_time_sec": round(float(np.mean(times)), 3),
            "avg_memory_mb": round(float(np.mean(memories)), 2),
        }

        final_models[name] = model  

    return {
        "models": final_models,
        "metrics": metrics
    }
