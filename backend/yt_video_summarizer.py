import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
#pip install -q youtube_transcript_api
from youtube_transcript_api import YouTubeTranscriptApi
import os
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def video_summary(link):
    youtube_video = link
    splitted_video_list = youtube_video.split("=")
    if(len(splitted_video_list)> 2):
        print("Sorry I am Not Capable to Summarize This Video")
        return "Sorry I am Not Capable to Summarize This Video"
    else:
        video_id = splitted_video_list[1]
    
    video_transcript = YouTubeTranscriptApi.get_transcript(video_id=video_id)
    llm = ChatGoogleGenerativeAI(model="gemini-pro")

    prompt_ai_template = PromptTemplate(
        input_variables=['c'],
        template="""I Will be Giving You a Whole Youtube Video Transcript in json format Summarize the text in it in plain text not in json format the transcript
        {transcript}
        """

     
    )
    res2 = prompt_ai_template.format(transcript=video_transcript);
    res =llm.invoke(res2);
    print(res)
    return {"summary":res}