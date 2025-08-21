from fastapi import FastAPI, HTTPException
import httpx
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI(title="Pokedex API", version="1.0.0")

POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Bem-vindo à Pokédex API feita com FastAPI 🚀"}


@app.get("/pokemon/{name_or_id}")
async def get_pkmn(name_or_id:str):
    url= f"{POKEAPI_URL}/{name_or_id.lower()}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url) 

    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Pokemon not found")   

    data= response.json()
    return{
        "id": data["id"],
        "name": data["name"],
        "height": data["height"],
        "weight": data["weight"],
        "types": data["types"],
        "abilities": data["abilities"],
        "sprite": data["sprites"]["front_default"],
        "sprite2": data ["sprites"]["front_shiny"],
    } 

