from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pandas as pd
import uuid
import os
# import custom functions
from text_summarizer import get_text_summary
from pdf_summarizer import get_pdf_summary
from docx_summarizer import get_docx_summary
from audio_summarizer import audio_summary
from excel_csv_summarizer import excel_summary

# from article_summarizer import article_summary        
from article_summarizer import article_summary
from yt_video_summarizer import video_summary
from image_summary import image_summary
from pdf_chatbot import get_chatbot_response


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
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
   
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({"error": "Invalid file type. Please upload a .pdf file"}), 400
    summary = get_pdf_summary(file)
    return jsonify({"summary": summary})



@app.route('/docx-summary',methods=['POST'])
def docx_summary():
   
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
   
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.endswith('.docx'):
        return jsonify({"error": "Invalid file type. Please upload a .docx file"}), 400

    summary = get_docx_summary(file)
    return jsonify({"summary": summary})

@app.route('/excel-summary',methods=['POST'])
def excel_summary_api():
   
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    print(file.filename)
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # if file.filename not in ('.xlsx', '.xls'):
    #     return jsonify({"Error" : "Unsupported file format. Please upload an Excel file (.xlsx or .xls)"})

    if  file.filename.endswith(".xlsx"):
        try:
            df = pd.read_excel(file, engine="openpyxl")
            df.to_csv('./data/'+file.filename, index=False)
            summary = excel_summary(file.filename)
            os.remove(os.path.join('data', file.filename))
            
            

        except Exception as e:
            return jsonify({"error": f"Error reading Excel file: {e}"}), 400
        # filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        # file.save(os.path.join('data', filename))
        # df = pd.read_excel(file,engine="openpyxl")
        print("HEllo WOrld")
    else :    
        if file.filename.endswith('.csv'):
            filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
            file.save(os.path.join('data', filename))
            summary = excel_summary(filename)
            os.remove(os.path.join('data', filename))


        else:
            return jsonify({"error": "Invalid file type"}), 400
        

    return jsonify({"summary": summary['excel_summary'].content})

@app.route('/article-summary',methods=['POST'])
def article_summary_api():
    data = request.get_json()
    link = data['link'] 
    ans = article_summary(link)
    print(ans['summary'].content)
    return jsonify({'article_summary':ans['summary'].content})


@app.route('/youtube-summary',methods=['POST'])
def youtube_summary_api():
    data = request.get_json()
    video_link = data['video_link']
    res = video_summary(video_link)
    print(res['summary'].content)
    return {"video_summary":res['summary'].content}

@app.route('/audio-summary',methods=['POST'])
def audio_summary_api():
    
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
   
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
    file.save(os.path.join('data', filename))
    res = audio_summary(filename)
    os.remove(os.path.join('data', filename))

    # print(res['summary'].content)
    return {"audio_summary":res['summary'].content}

@app.route('/image-summary',methods=['POST'])
def image_summary_api():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
   
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
    file.save(os.path.join('data', filename))
    # if not file.filename.endswith('.png') or file.filename.endswith('.jpeg') or file.filename.endswith('.jpg'):
    #     return jsonify({"error": "Invalid file type. Please upload a image file"}), 400
    summary = image_summary(filename)
    os.remove(os.path.join('data', filename))
    return jsonify({"summary": summary['summary'].content})

@app.route('/pdf-chatbot',methods=['POST'])
def pdf_chatbot():
    if 'file' not in request.files:
        if 'message' not in request.form:
            return jsonify({"error": "No Mesage found"}), 400
        message = request.form['message']
        response = get_chatbot_response(message=message)
        return jsonify({"response": response})

    file = request.files['file']
   
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({"error": "Invalid file type. Please upload a .pdf file"}), 400
    
    response = get_chatbot_response(file=file)

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)