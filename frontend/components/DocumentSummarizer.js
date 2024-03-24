import { React, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function DocumentSummarizer() {
    const [loading, setLoading] = useState(false);
    const [responseLoading, setResponseLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [prompt, setPrompt] = useState("");
    const [file, setFile] = useState(null);
    const [chats, setChats] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setChats([]);

        if (!file) {
            setMessage("Please upload a file.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/docx-chatbot", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.error) {
                setMessage(data.error);
            }
            else {
                // check if summary present in response
                if (data.response) {
                    setChats([data.response]);
                }
                else {
                    setMessage("Something went wrong. Please try again later.");
                }
            }
            setLoading(false);

        } catch (error) {
            setMessage("Something went wrong. Please try again later.");
            setLoading(false);
        }
    }

    const handlePrompt = async (e) => {
        e.preventDefault();
        setResponseLoading(true);
        setMessage("");

        if (prompt === "") {
            alert("Please enter a message.");
            setResponseLoading(false);
            return;
        }
        setChats([...chats, prompt]);
        setPrompt("");

        const formData = new FormData();
        formData.append("message", prompt);

        const response = await fetch("http://localhost:5000/docx-chatbot", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.error) {
            setMessage(data.error);
        }
        else {
            if (data.response) {
                // text instde ** is bold and text inside * is italic
                setChats([...chats, prompt,  data.response]);
            }
            else {
                setMessage("Something went wrong. Please try again later.");
            }
        }
        setResponseLoading(false);
        setPrompt("");
        console.log(chats);
    }

    return (
        <>
            <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md sm:p-6 md:p-8">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Word Summarizer</h2>
                    {
                        message &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-5 dark:bg-red-200 dark:border-red-500" role="alert">
                            <div className="flex items-center justify-between">
                                <div>
                                    <strong className="font-bold">Error: </strong>
                                    <span className="block sm:inline">{message}</span>
                                </div>
                                <button type="button" className="focus:outline-none" onClick={() => setMessage("")}>
                                    <IoCloseSharp className="w-5 h-5 text-red-500 dark:text-red-400" />
                                </button>
                            </div>
                        </div>
                    }
                    {
                        file ?
                            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" onClick={() => setFile(null)}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">File uploaded successfully</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{file.name}</p>
                                </div>
                            </div>

                            : <div class="flex items-center justify-center mt-3">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">docx files only (Max 5MB)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" class="hidden" accept=".docx" onChange={(e) => setFile(e.target.files[0])} />
                                </label>
                            </div>
                    }

                    <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={loading}>
                        {
                            loading ?
                                <>
                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M50 0A50 50 0 10100 50 50 50 0 0050 0zM25 50a25 25 0 1050 0 25 25 0 00-25-25zm0 0a25 25 0 1050 0 25 25 0 00-25-25zm0 0a25 25 0 1050 0 25 25 0 00-25-25z" />
                                    </svg>
                                    Loading...
                                </>
                                : "Summarize"
                        }
                    </button>

                    {/* Reset Button */}
                    {
                        file &&
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => setFile(null)} >Reset</button>
                    }
                </form>

            </div >

            {
                chats.map((msg, index) => {
                    return (
                        index % 2 === 0 ?
                            <div class="flex items
                        -start gap-2.5 mt-3">
                                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/logo.svg" alt="Jese image" />
                                <div class="flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <div class="flex items
                                -center space-x-2 rtl:space-x-reverse">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">Pragyan</span>
                                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> {
                                            // display time 
                                            new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                        } </span>
                                    </div>
                                    <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg}</p>
                                </div>
                            </div>
                            :
                            <div class="flex items-start gap-2.5 mt-3 flex-row-reverse">
                                <FaUser class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 p-2" />

                                <div class="flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-l-lg rounded-br-lg dark:bg-gray-700">
                                    <div class="flex items
                                -center space-x-2 rtl:space-x-reverse">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white">You </span>
                                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> {
                                            // display time 
                                            new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                        } </span>
                                    </div>
                                    <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg}</p>
                                </div>
                            </div>
                    )
                })
            }

            {
                chats.length > 0 &&
                <form class="flex items-center gap-2.5 mt-4" action="#" method="POST" onSubmit={handlePrompt}>
                    <input type="text" placeholder="Type a message" class="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                    <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5"
                        disabled={responseLoading}>{
                            responseLoading ?
                                "Loading..."
                                : "Send"
                        }</button>
                </form>
            }
        </>
    )
}
