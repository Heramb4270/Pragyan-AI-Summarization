import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
import uuid
import os
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def image_summary(image):
    llm = ChatGoogleGenerativeAI(model="gemini-pro-vision")
    print(image)
    message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "Describe the Given Image",
        }, 
        {"type": "image_url", "image_url": os.path.join('data', image)},
    ]
    )   
    res = llm.invoke([message])
    print(res)
    return {"summary":res}