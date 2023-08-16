from dotenv import load_dotenv
import os
import openai

load_dotenv() 

openai.api_key = os.environ.get('OPENAI_API_KEY')

async def openai_call(model: str, prompt: str):
    return openai.ChatCompletion.create(
        model = model,
        messages=[
            {
                "role": "user", 
                "content": prompt
            }
        ]
    )