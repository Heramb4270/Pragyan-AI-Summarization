import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

def get_sentiment_analysis(text):
    api_key = os.getenv("GENERATIVEAI_API_KEY")
    genai.configure(api_key=api_key)

    # Set up the model
    generation_config = {
    "temperature": 0.9,
    "top_p": 0.8,   # Focus on high probability words, but allow some variation
    "top_k": 5,     # Consider top 5 most probable words at each step
    "max_output_tokens": 2048,  # Maximum number of tokens to generate
    }

    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                generation_config=generation_config)
    convo = model.start_chat(history=[])    
    prompt = """
    Analyze the sentiment of the text and classify it as one of the following categories: Analytical, Critical, Enthusiastic, Fearful, Joyful, Sad. (give me a sentiment word as a output that best describes the sentiment of the given text.) 
    """ + text
    
    convo.send_message(prompt)
    
    sentiment = convo.last.text
    
    convo.send_message("give me brief explanation of the sentiment of the given text. Note: Dont Generate Bold and Italic Output (*,**)")
    
    analysis = convo.last.text
   
    return sentiment, analysis
