import google.generativeai as genai
from dotenv import load_dotenv
import os
from docx import Document

load_dotenv()

api_key = os.getenv("GENERATIVEAI_API_KEY")
genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.9,
    "top_p": 0.5,  # Focus on high probability words, but allow some variation
    "top_k": 5,     # Consider top 5 most probable words at each step
    "max_output_tokens": 2048,  # Maximum number of tokens to generate
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

chat = None

def get_chatbot_response1(file=None, message=None):
    model = genai.GenerativeModel(model_name="gemini-pro",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)
    global chat

    if file and message is None:
        doc = Document(file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"

        chat = model.start_chat()
        response = chat.send_message("""Give me a summary of the given text, later on I will ask you some questions about this(give me a summary text only as an output): """ + text)
        return response.text

    elif message and file is None:
        response = chat.send_message(message)
        return response.text

    else:
        return "Invalid Input"
