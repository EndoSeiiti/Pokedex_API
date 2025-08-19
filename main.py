from fastapi import FastAPI, HTTPExeption
import httpx

app = FastAPI(title="Pokedex API", version="1.0.0")

POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon"

@app.get("/")
def read_root():
    return {"Hello": "World"}