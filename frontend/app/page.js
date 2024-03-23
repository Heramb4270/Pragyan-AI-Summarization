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

export default function Home() {
  const [component, setComponent] = useState("text-summarizer");

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-screen overflow-y-auto">
      <NavBar />

      <SideBar setComponent={setComponent} />

      <div class="p-4 sm:ml-64">
        <div class="rounded-lg mt-16">
          {component === "text-summarizer" && <TextSummarizer />}
          {component === "pdf-summarizer" && <PdfSummarizer />}
          {component === "document-summarizer" && <DocumentSummarizer />}
          {component === "image-summarizer" && <ImageSummarizer />}
          {component === "video-summarizer" && <VideoSummarizer />}
          {component === "excel-summarizer" && <ExcelSummarizer />}
          {component === "audio-summarizer" && <AudioSummarizer />}
          {component === "article-summarizer" && <ArticleSummarizer />}
        </div>
      </div>
    </div>
  );
}
