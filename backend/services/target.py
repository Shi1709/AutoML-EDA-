from pandas.api.types import is_numeric_dtype

def select_target(df, target_column: str):
    if target_column not in df.columns:
        raise ValueError("Target column not found")

    y = df[target_column]
    X = df.drop(columns=[target_column])

    if is_numeric_dtype(y) and y.nunique() > 10:
        task_type = "REGRESSION"
    else:
        task_type = "CLASSIFICATION"

    return {
        "X": X,
        "y": y,
        "meta": {
            "target_column": target_column,
            "task_type": task_type,
            "unique_values": int(y.nunique()),
            "missing_values": int(y.isnull().sum()),
            "dtype": str(y.dtype)
        }
    }
