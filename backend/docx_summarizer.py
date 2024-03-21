from PyPDF2 import PdfReader
from text_summarizer import get_text_summary
from dotenv import load_dotenv
import google.generativeai as genai
import os
from docx import Document

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_docx_summary(file):
    doc = Document(file)
    text = []
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    print(text)
    return "Text"