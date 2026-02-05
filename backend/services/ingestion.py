import pandas as pd

def load_dataset(file_path: str):
    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)
    elif file_path.endswith(".xlsx"):
        df = pd.read_excel(file_path)
    elif file_path.endswith(".json"):
        df = pd.read_json(file_path)
    elif file_path.endswith(".xml"):
        df = pd.read_xml(file_path)
    else:
        raise ValueError("Unsupported file type")

    return {
        "df": df,
        "meta": {
            "file_name": file_path,
            "rows": df.shape[0],
            "columns": df.shape[1],
        }
    }
