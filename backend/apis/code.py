from fastapi import APIRouter, Request
from pydantic import BaseModel

from utils.openai_func import openai_call
import json


class PromptVisual(BaseModel):
    prompt: str
    visual_json: str


class CodeRequest(BaseModel):
    code: str


router = APIRouter()


@router.get("/")
async def get_code(request: Request):

    architecture_explanation = "EC2 instance in a private subnet of a VPC"
    cloud_provider = "AWS"

    prompt = "Generate Terraform code for {} in {} cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files".format(architecture_explanation, cloud_provider)
    model = "gpt-3.5-turbo-16k-0613"

    response = await openai_call(model, prompt)

    return {"message": response}

@router.post("/visual")
async def get_code_using_json(prompt: PromptVisual):
    cloud_provider = 'aws'
    prompt = "Generate Terraform code for {} in {} cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files. Use the terraform requirement in the form of json {} to generate the code ".format(prompt.prompt, cloud_provider, json.dumps(prompt.visual_json))
    model = "gpt-3.5-turbo-16k-0613"

    response = await openai_call(model, prompt)

    return {"message": response}


@router.post("/analyze")
async def analyze_code(code: CodeRequest):
    prompt = "Provide analysis, code reviewm security vulnerability scanning and optimization strategies for the following terraform code and return the output as bullet points within 300 words, code : {}".format(code.code)
    model = "gpt-3.5-turbo-16k-0613"

    response = await openai_call(model, prompt)

    return {"message": response}