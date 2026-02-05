# services/correlation.py
import numpy as np

def compute_correlation(df, threshold=0.85):
    corr_df = df.select_dtypes(include=np.number).corr()

    pairs = []
    cols = corr_df.columns

    for i in range(len(cols)):
        for j in range(i + 1, len(cols)):
            val = corr_df.iloc[i, j]
            if abs(val) >= threshold:
                pairs.append({
                    "col1": cols[i],
                    "col2": cols[j],
                    "value": round(float(val), 3)
                })

    return {
        "matrix": corr_df.round(2).to_dict(),
        "pairs": pairs
    }
