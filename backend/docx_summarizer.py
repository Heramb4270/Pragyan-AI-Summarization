from docx import Document
# pip install python-docx
from text_summarizer import get_text_summary

def get_docx_summary(file):
    # read the docx file
    doc = Document(file)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return get_text_summary(text)

# print(get_docx_summary("./data/randomstory.docx"))