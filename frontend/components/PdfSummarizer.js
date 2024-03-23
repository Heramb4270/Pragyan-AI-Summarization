import { React, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";

export default function PdfSummarizer() {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("JKhdf");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!file) {
            setMessage("Please upload a file.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/pdf-summarize", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.error) {
                setMessage(data.error);
            }
            else {
                setSummary(data.summary);
            }
            setLoading(false);

        } catch (error) {
            setMessage("Something went wrong. Please try again later.");
            setLoading(false);
        }
    }

    return (
        <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md sm:p-6 md:p-8">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">PDF Summarizer</h2>
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
                        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                    <p class="text-xs text-gray-500 dark:text-gray-400">PDF files only (Max 5MB)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
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

                {
                    summary &&
                    <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg relative mt-5 dark:bg-blue-200 dark:border-blue-500">
                        <strong class="font-bold">Summary: </strong>
                        <span class="block sm:inline">{summary}</span>
                    </div>
                }


            </form>
        </div >
    )
}
