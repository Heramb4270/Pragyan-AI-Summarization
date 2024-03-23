import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def article_summary(link):
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    prompt_ai_template = PromptTemplate(
        input_variables=['link'],
        template="""Summarize the following article for me: {link}"""   
    )
    res2 = prompt_ai_template.format(link=link);

    # Assuming the LLM response contains the ministry name in a specific format
    res =llm.invoke(res2);
    # print(res)
    print(res)
    return {'summary':res}