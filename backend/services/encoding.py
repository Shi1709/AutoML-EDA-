# services/encoding.py
from sklearn.preprocessing import LabelEncoder

def label_encode(df):
    encoders = {}
    encoded_cols = []

    for col in df.select_dtypes(include="object").columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le
        encoded_cols.append(col)

    return {
        "df": df,
        "meta": {
            "encoding": "label",
            "encoded_columns": encoded_cols
        }
    }
