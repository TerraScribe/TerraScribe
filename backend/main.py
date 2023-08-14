import uvicorn
from fastapi import FastAPI, Request
import openai
import os

app = FastAPI()
openai.api_key = ''

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/code")
async def get_code(request: Request):

    architecture_explanation = "EC2 instance in a private subnet of a VPC"
    cloud_provider = "AWS"
    
    prompt=generate_prompt(architecture_explanation, cloud_provider),

    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-16k-0613",
    messages=[
            {"role": "user", "content": "Generate Terraform code for EC2 instance in a private subnet of a VPC in AWS    cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files"},
        ]
    )

    return {"message": response}

def generate_prompt(architecture_explanation: str, cloud_provider: str):
    return """Generate Terraform code for {} in {} cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files""".format(architecture_explanation, cloud_provider)

if __name__ == "__main__":
    uvicorn.run('main:app', host="localhost", port=8080, reload=True)


