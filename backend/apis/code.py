from fastapi import APIRouter, Request

from utils.openai_func import openai_call


router = APIRouter()


@router.get("/")
async def get_code(request: Request):

    architecture_explanation = "EC2 instance in a private subnet of a VPC"
    cloud_provider = "AWS"

    prompt = "Generate Terraform code for {} in {} cloud. Please provide the Terraform code with appropriate resource names, variable definitions, module organization and group and separate it into multiple tf files".format(architecture_explanation, cloud_provider)
    model = "gpt-3.5-turbo-16k-0613"


    response = await openai_call(model, prompt)

    return {"message": response}