# services/split.py
from sklearn.model_selection import train_test_split

def split_dataset(df, target_column, train_size):
    if target_column not in df.columns:
        raise ValueError("Target column not found")

    X = df.drop(target_column, axis=1)
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, train_size=train_size, random_state=44
    )

    return {
        "splits": {
            "X_train": X_train,
            "X_test": X_test,
            "y_train": y_train,
            "y_test": y_test
        },
        "meta": {
            "target": target_column,
            "train_size": train_size,
            "test_size": round(1 - train_size, 2)
        }
    }
