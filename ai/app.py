from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from collections import Counter
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

app = FastAPI()

class History(BaseModel):
    results: list

@app.post("/predict")
def predict(history: History):
    data = history.results
    if not data:
        return {"prediction": 7}

    # Estadística: moda
    freq = Counter(data)
    moda = freq.most_common(1)[0][0]

    # Red neuronal simple
    X = np.array(data[:-1]).reshape(-1,1)
    y = np.array(data[1:])
    model = Sequential([Dense(10, activation="relu", input_shape=(1,)), Dense(1)])
    model.compile(optimizer="adam", loss="mse")
    model.fit(X, y, epochs=10, verbose=0)

    pred = int(model.predict(np.array([[data[-1]]]))[0][0])

    return {"prediction": pred, "moda": moda}
