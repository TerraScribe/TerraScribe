import uvicorn
from fastapi import FastAPI, Request
import openai
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv() 


class Prompt(BaseModel):
    prompt: str


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.environ.get('OPENAI_API_KEY')

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/visualize")
async def visualize(prompt: Prompt):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-16k-0613",
    messages=[
            {"role": "user", "content": "Generate a json code to visualize the architecture to "+prompt.prompt},
        ]
    )
    response = response["choices"][0]["message"]["content"]
    if "```json" in response:
        response = response.split("```json",1)[1]
        response = response.split("```",1)[0]

    return {"message": response} 

@app.get("/code")
async def get_code(request: Request):

    architecture_explanation = "EC2 instance in a private subnet of a VPC"
    cloud_provider = "AWS"

    prompt = "Generate Terraform code for {} in {} cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files".format(architecture_explanation, cloud_provider)


    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo-16k-0613",
        messages=[
            {
                "role": "user", 
                "content": prompt
            }
        ]
    )
    return {
        "model": response['model'],
        "content": response['choices'][0]['message']['content']
    }

if __name__ == "__main__":
    uvicorn.run('main:app', host="localhost", port=8080, reload=True)
