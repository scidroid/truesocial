from dotenv import dotenv_values
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fer import FER
from urllib.request import urlopen
import cv2
import numpy as np
from pydantic import BaseModel
from deta import Deta
from dotenv import dotenv_values

deta_key = dotenv_values(".env")["DETA_PROJECT_KEY"]
deta = Deta(deta_key)
deta_db = deta.Base("truesocial")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageSchema(BaseModel):
    url: str
    text: str
    pkey: str


@app.post("/")
async def get_sentiment(req: ImageSchema):
    # Run sentiment analysis on the image
    img = urlopen(req.url)
    arr = np.asarray(bytearray(img.read()), dtype=np.uint8)
    source = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    detector = FER()
    result = detector.top_emotion(source)

    data = deta_db.put({
        "pkey": req.pkey,
        "url": req.url,
        "text": req.text,
        "emotion": result
    })

    return {"emotion": result, "data": data}


@app.get("/")
def get_all():
    return deta_db.fetch()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
