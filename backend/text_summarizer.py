import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

def get_text_summary(text):
    api_key = os.getenv("GENERATIVEAI_API_KEY")
    genai.configure(api_key=api_key)

    # Set up the model
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

    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                generation_config=generation_config,
                                safety_settings=safety_settings)

    convo = model.start_chat(history=[])

    convo.send_message("""Give me a summary of the given text (give me a summary text only as a output): """ + text)

    return convo.last.text

# print(get_text_summary("The quick brown fox jumps over the lazy dog."))