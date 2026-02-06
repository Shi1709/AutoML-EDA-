from sklearn.model_selection import train_test_split

def split_dataset(X, y, train_size, task_type):
    if X is None or y is None:
        raise ValueError("Target not set before split")

    stratify = y if task_type == "classification" else None

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        train_size=train_size,
        random_state=44,
        stratify=stratify
    )

    return {
        "splits": {
            "X_train": X_train,
            "X_test": X_test,
            "y_train": y_train,
            "y_test": y_test,
        },
        "meta": {
            "train_size": len(X_train),
            "test_size": len(X_test),
            "total": len(X_train) + len(X_test)
        }
    }

