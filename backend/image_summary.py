import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
import os
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def image_summary(image):
    llm = ChatGoogleGenerativeAI(model="gemini-pro")

    content = [
        {"type": "text", "text": "Describe the image for me: "},
        {"type": "image_url", "image_url": image}
    ]
    message = HumanMessage(content=content)
    res = llm.invoke(message)
    print(res)
    return 0