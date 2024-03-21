from PyPDF2 import PdfReader
from text_summarizer import get_text_summary

def get_pdf_summary(file):
    reader = PdfReader(file)
    number_of_pages = len(reader.pages)
    text = ""
    for i in range(number_of_pages):
        page = reader.pages[i]
        text += page.extract_text()
    
    return get_text_summary(text)

# print(extract_text_from_pdf("./data/randomstory.pdf"))


