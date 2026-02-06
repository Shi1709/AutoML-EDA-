from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.svm import SVR, SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import GradientBoostingRegressor, GradientBoostingClassifier

def get_models(task_type):
    if task_type == "regression":
        models = {
            "Linear Regression": LinearRegression(),
            "Random Forest Regressor": RandomForestRegressor(),
            "Gradient Boosting Regressor": GradientBoostingRegressor(),
            "SVR": SVR(),
        }

        try:
            from xgboost import XGBRegressor
            models["XGBoost Regressor"] = XGBRegressor(verbosity=0)
        except:
            pass

        try:
            from catboost import CatBoostRegressor
            models["CatBoost Regressor"] = CatBoostRegressor(verbose=0)
        except:
            pass

        return models

    else:
        models = {
            "Logistic Regression": LogisticRegression(max_iter=1000),
            "Random Forest Classifier": RandomForestClassifier(),
            "Gradient Boosting Classifier": GradientBoostingClassifier(),
            "SVM": SVC(),
            "KNN": KNeighborsClassifier(),
            "Naive Bayes": GaussianNB(),
        }

        try:
            from xgboost import XGBClassifier
            models["XGBoost Classifier"] = XGBClassifier(verbosity=0)
        except:
            pass

        try:
            from catboost import CatBoostClassifier
            models["CatBoost Classifier"] = CatBoostClassifier(verbose=0)
        except:
            pass

        return models
