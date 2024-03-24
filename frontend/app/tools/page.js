"use client";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import TextSummarizer from "@/components/TextSummarizer";
import PdfSummarizer from "@/components/PdfSummarizer";
import DocumentSummarizer from "@/components/DocumentSummarizer";
import ImageSummarizer from "@/components/ImageSummarizer";
import VideoSummarizer from "@/components/VideoSummarizer";
import ExcelSummarizer from "@/components/ExcelSummarizer";
import AudioSummarizer from "@/components/AudioSummarizer";
import ArticleSummarizer from "@/components/ArticleSummarizer";
import SentimentAnalysis from "@/components/SentimentAnalysis";


export default function Home() {
  const [component, setComponent] = useState("text-summarizer");

  //when user tryes to reload the page or leave the page give a warning that the data will be lost
  // window.onbeforeunload = function () {
  //   // check if the user has some data in the form
  //   if (document.getElementById("text").value !== "")
  //     return "Data will be lost if you leave the page, are you sure?";
  // };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-screen overflow-y-auto">
      <NavBar />

      <SideBar setComponent={setComponent} />

      <div class="p-4 sm:ml-64">
        <div class="rounded-lg mt-20">
          <div hidden={component !== "text-summarizer"}>
            <TextSummarizer />
          </div>
          <div hidden={component !== "pdf-summarizer"}>
            <PdfSummarizer />
          </div>
          <div hidden={component !== "document-summarizer"}>
            <DocumentSummarizer />
          </div>
          <div hidden={component !== "image-summarizer"}>
            <ImageSummarizer />
          </div>
          <div hidden={component !== "video-summarizer"}>
            <VideoSummarizer />
          </div>
          <div hidden={component !== "excel-summarizer"}>
            <ExcelSummarizer />
          </div>
          <div hidden={component !== "audio-summarizer"}>
            <AudioSummarizer />
          </div>
          <div hidden={component !== "article-summarizer"}>
            <ArticleSummarizer />
          </div>
          <div hidden={component !== "sentiment-analysis"}>
            <SentimentAnalysis />
          </div>
        </div>
      </div>
    </div>
  );
}
