from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

# import custom functions
from text_summarizer import get_text_summary
from pdf_summarizer import get_pdf_summary

app = Flask(__name__) 
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    return "Hello, World!"

@app.route('/text-summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data['text']
    summarized_text = get_text_summary(text=text)
    return jsonify({"summary": summarized_text})

@app.route('/pdf-summary', methods=['POST'])
def pdf_summary():
    # get the file from form data
    file = request.files['file']
    summary = get_pdf_summary(file)

    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True, port=5000)