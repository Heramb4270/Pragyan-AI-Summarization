from PyPDF2 import PdfReader

def extract_text_from_pdf(file):
    reader = PdfReader(file)
    number_of_pages = len(reader.pages)
    text = ""
    for i in range(number_of_pages):
        page = reader.pages[i]
        text += page.extract_text()
    return text

# print(extract_text_from_pdf("./data/resume.pdf"))


