def compare_models(metrics: dict, task_type: str):
    best_model = max(
        metrics.items(),
        key=lambda x: x[1]["avg_score"]
    )[0]

    return {
        "best_model": best_model,
        "ranking": [
            {
                "model": name,
                "avg_score": m["avg_score"],
                "avg_time_sec": m["avg_time_sec"],
                "avg_memory_mb": m["avg_memory_mb"],
            }
            for name, m in sorted(
                metrics.items(),
                key=lambda x: x[1]["avg_score"],
                reverse=True
            )
        ]
    }
