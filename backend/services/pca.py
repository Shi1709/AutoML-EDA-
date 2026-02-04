# services/pca.py
from sklearn.decomposition import PCA
import numpy as np

def apply_pca(X, n_components):
    pca = PCA(n_components=n_components)
    transformed = pca.fit_transform(X)

    return {
        "X_pca": transformed,
        "explained_variance": pca.explained_variance_ratio_.sum()
    }
