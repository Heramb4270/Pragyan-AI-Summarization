from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from text_summarizer import get_sentiment
from flask_cors import CORS


app = Flask(__name__) 
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    return "Hello, World!"

@app.route('/text-summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data['text']
    summarized_text = get_sentiment(text=text)
    return jsonify({"summary": summarized_text})

@app.route('/pdf-summary', methods=['POST'])
def pdf_summary():
    return 

if __name__ == '__main__':
    app.run(debug=True, port=5000)