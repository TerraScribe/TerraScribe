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
    # prompt = "Generate Terraform code for {} in {} cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files. Use the terraform requirement in the form of json {} to generate the code ".format(prompt.prompt, cloud_provider, json.dumps(prompt.visual_json))
    prompt = "Generate Terraform code for provisioning a {} in {} cloud. The architecture involves: \
    - <List key components and services needed for the architecture>.\
    - The setup should follow best practices for security, scalability, and maintainability.\
    - Implement the principle of least privilege for IAM roles and permissions.\
    - Use variables for customizable configuration options.\
    - Organize the code into separate `.tf` files for improved modularity and readability.\
    - Document each resource and module for future reference.\
    - Ensure the architecture has strategy for backup and Disaster Recovery.\
    - Enable proper monitoring and logging for the infrastructure.\
    Provide the Terraform code in the output format given below that accomplishes the above requirements, including appropriate resource names, variable definitions, and module organization. \
    Use the terraform requirement in the form of json {} to generate the code ".format(prompt.prompt, cloud_provider, json.dumps(prompt.visual_json))
    model = "gpt-3.5-turbo-16k-0613"

    response = await openai_call(model, prompt)

    return {"message": response}


@router.post("/analyze")
async def analyze_code(code: CodeRequest):
    prompt = "Provide analysis, code review security vulnerability scanning and optimization strategies for the following terraform code and return the output where each section is split using numbers within 300 words, code : {}".format(code.code)
    model = "gpt-3.5-turbo-16k-0613"

    response = await openai_call(model, prompt)

    return {"message": response}