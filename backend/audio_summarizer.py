import speech_recognition as sr
import google.generativeai as genai

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

import os
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
# pip install SpeechRecognition
# from text_summarizer import get_text_summary
def audio_summary(file):
    r = sr.Recognizer()


    with sr.AudioFile("./data/"+file) as source:
        audio_data = r.record(source)

    text = r.recognize_google(audio_data)
    print(text)
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    prompt_ai_template = PromptTemplate(
        input_variables=['text'],
        template="""This is the text of audio file that i have extracted summarize it  {text}"""
    )
    res2 = prompt_ai_template.format(text=text)
    summary_text =llm.invoke(res2);
    print(summary_text)
    return {"summary":summary_text}