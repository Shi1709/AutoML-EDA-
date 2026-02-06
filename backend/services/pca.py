from sklearn.decomposition import PCA

def apply_pca(X, variance):
    pca = PCA(n_components=variance)
    X_pca = pca.fit_transform(X)

    return {
        "X_pca": X_pca,
        "meta": {
            "original_dims": X.shape[1],
            "components": X_pca.shape[1],
            "explained_variance": round(pca.explained_variance_ratio_.sum(), 4),
        },
    }
