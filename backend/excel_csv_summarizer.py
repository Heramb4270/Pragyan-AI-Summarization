import speech_recognition as sr
import google.generativeai as genai
import pandas as pd

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from text_summarizer import get_text_summary
from dotenv import load_dotenv

import os
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def excel_summary(filename):

    df = pd.read_csv("./data/"+filename)
    # print(df)
    for index, row in df.iterrows():
     row_text = " ".join(str(value) for value in row.tolist())  # Combine row values into a string
    for col in df.columns:
     column_text = " ".join(str(value) for value in df[col].tolist())
    # print(column_text,"Hello")
    # summary_response = summarize_text_with_gemini(column_text)
    # Process the summary for each column

    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    prompt_ai_template = PromptTemplate(
        input_variables=['row','col'],
        template="""
        This is the excel csv file 

        Can you analyze the data and provide insights such as:
        * Key themes or topics
        
        * Patterns or trends
    
        * Can you identify any potential errors or inconsistencies in the data?
        
        * Potential data types:** Based on the content in the row and column, what data types (e.g., text, number, date) might be present?
        
        * Descriptive statistics (if numerical):** If the column data appears numerical, calculate basic statistics like mean or median for that specific column based on the entire dataset .
        
        * Relationships:** Are there any potential relationships between the data in the row and the data in the column? (e.g., If the row represents a product name, and the column represents a region, is there a relationship between product availability and region?) is yes then describe it
        
        * Data quality checks:** Does the data in the row or column seem unusual or inconsistent compared to other entries?
        
        * Domain-Specific Insights (if applicable):**
            1 Briefly mention the domain of the data (e.g., finance, healthcare) to potentially guide analysis (be cautious of bias).

        * If the file contains text data related to (e.g., reviews, social media posts), do sentiment analysis if not related dont do: 
            1. "What is the overall sentiment of the text?"
            2. "Are there any specific topics or entities that generate positive or negative sentiment?"
        
        * Advanced analysis (if numerical data):**
            1. Identify any potential outliers in the specific column based on the entire dataset.
            2. Suggest how to visualize the data in the column effectively (e.g., scatter plot for potential correlations).
        
        * Give Conclusion (in End Compulsory)
        data : 
        row :- {row},
        col :- {col}


"""
    )
    res2 = prompt_ai_template.format(row=row_text,col=column_text)
    summary_text =llm.invoke(res2);
    print(summary_text)
    # Process the summary for each row

    return {"excel_summary":summary_text}
# excel_summary()