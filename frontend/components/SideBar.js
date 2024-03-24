import React from 'react'
import { CiTextAlignLeft } from "react-icons/ci";
import { FaFilePdf } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdAudiotrack } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { MdSentimentVerySatisfied } from "react-icons/md";

export default function SideBar( {setComponent} ) {
    return (
        <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul class="space-y-2 font-medium">
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("text-summarizer")}>
                            <CiTextAlignLeft class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="ms-3">Text Summarizer</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("pdf-summarizer")}>
                            <FaFilePdf class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">PDF Summarizer</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("document-summarizer")}>
                            <IoDocumentText class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">Document Summarizer</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("image-summarizer")}>
                            <FaImage class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">Image Summarizer</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("video-summarizer")}>
                            <FaYoutube class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">Video Summarizer</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("excel-summarizer")}>
                            <SiMicrosoftexcel class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">Excel Summarizer</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("audio-summarizer")}>
                            <MdAudiotrack class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">Audio Summarizer</span>
                        </a>
                    </li>
                    <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("article-summarizer")}>
                            <GrArticle class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">Article Summarizer</span>
                        </a>
                    </li>
                    <li>
                    <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setComponent("sentiment-analysis")}>
                            <MdSentimentVerySatisfied class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" />
                            <span class="flex-1 ms-3 whitespace-nowrap">Sentiment Analysis</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
