from fastapi import APIRouter
from pydantic import BaseModel


from utils.openai_func import openai_call


router = APIRouter()

class Prompt(BaseModel):
    prompt: str

@router.get("/")
def read_items():
    return "visualise api"

@router.post("/")
async def visualize(prompt: Prompt):

    response = await openai_call(
        model="gpt-3.5-turbo-16k-0613", 
        prompt="Generate a json code to visualize the architecture to "+prompt.prompt
    )
    response = response["choices"][0]["message"]["content"]
    if "```json" in response:
        response = response.split("```json",1)[1]
        response = response.split("```",1)[0]

    return {"message": response}