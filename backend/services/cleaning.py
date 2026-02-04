# services/cleaning.py
import numpy as np
from pandas.api.types import is_numeric_dtype

def handle_nulls(df, strategy: str):
    """
    strategy = 'drop' | 'fill'
    """

    null_summary = df.isnull().sum().to_dict()

    if strategy == "drop":
        df = df.dropna()
        action = "NULL VALUES DROPPED"

    elif strategy == "fill":
        for col in df.columns:
            if df[col].isnull().sum() == 0:
                continue

            if is_numeric_dtype(df[col]):
                df[col] = df[col].fillna(df[col].median())
            else:
                df[col] = df[col].fillna(df[col].mode().iloc[0])

        action = "NULL VALUES FILLED"

    else:
        raise ValueError("Invalid null handling strategy")

    return {
        "df": df,
        "meta": {
            "nulls_before": null_summary,
            "action": action
        }
    }
