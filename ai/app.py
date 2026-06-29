import os
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = FastAPI()

# Conexión a MongoDB Atlas
client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("DB_NAME")]

@app.get("/")
async def root():
    return {"message": "IA funcionando en Render 🚀"}

@app.post("/predict")
async def predict(data: dict):
    # Aquí iría tu lógica de TensorFlow o Scikit-learn
    result = {"prediction": "ejemplo"}
    await db.predictions.insert_one({"input": data, "output": result})
    return result
