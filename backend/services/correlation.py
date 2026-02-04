# services/correlation.py
import numpy as np

def compute_correlation(df, threshold=0.85):
    corr_df = df.select_dtypes(include=np.number).corr()

    high_corr = []
    for i in corr_df.columns:
        for j in corr_df.columns:
            if i != j and corr_df.loc[i, j] > threshold:
                if i not in high_corr:
                    high_corr.append(i)

    return {
        "correlation_matrix": corr_df,
        "highly_correlated": high_corr
    }


def drop_column(df, column_name):
    if column_name not in df.columns:
        raise ValueError("Column not found")

    df = df.drop(column_name, axis=1)

    return {
        "df": df,
        "meta": {
            "removed_column": column_name
        }
    }
