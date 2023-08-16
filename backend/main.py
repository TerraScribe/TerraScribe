import uvicorn
from fastapi import FastAPI, Request
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import Utils
from utils.openai_func import openai_call

class Prompt(BaseModel):
    prompt: str

app = FastAPI()


# Update the apis here
from apis.visualize import router as visualize_router
from apis.code import router as code_router


app.include_router(visualize_router, prefix="/visualize")
app.include_router(code_router, prefix="/code")


load_dotenv()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


# @app.get("/code")
# async def get_code(request: Request):

#     architecture_explanation = "EC2 instance in a private subnet of a VPC"
#     cloud_provider = "AWS"

#     prompt = "Generate Terraform code for {} in {} cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files".format(architecture_explanation, cloud_provider)
#     model = "gpt-3.5-turbo-16k-0613"


#     response = await openai_call(model, prompt)

#     return {"message": response}

if __name__ == "__main__":
    uvicorn.run('main:app', host="localhost", port=8080, reload=True)
