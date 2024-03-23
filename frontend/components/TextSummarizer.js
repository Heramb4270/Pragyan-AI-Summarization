"use client"
import { React, useState } from 'react'
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

export default function TextSummarizer() {
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/text-summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
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
    <div>
      <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Text Summarization</h5>
          <div>
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your text</label>
            <textarea name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white h-40 " placeholder="Enter your text here" required
              value={text} onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          {
            message &&
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-5 dark:bg-red-200 dark:border-red-500" role="alert">
              <strong class="font-bold">Error: </strong>
              <span class="block sm:inline">{message}</span>
            </div>
          }

          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading} >
            {
              loading ?
                <>
                  <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </>
                : "Summarize"
            }
          </button>
        </form>
      </div>
      {/* Display only whan loading or summary is present */}

      {loading || summary ? <div class="mt-6">
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">Summary</h5>
            {
              loading || !summary ? "" :
                <button class="text-blue-700 hover:text-blue-800  rounded-lg p-2.5 dark:text-blue-600 dark:hover:text-blue-700">
                  <div className="flex items-center" onClick={() => {
                    navigator.clipboard.writeText(summary);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 5000);
                  }}>
                    {copied ? <><span class="mr-2 text-base font-medium text-green-500">copied</span><LuCopyCheck className="text-green-500" /></> : <><span class="mr-2 text-base font-medium">copy</span><LuCopy /></>}
                  </div>
                </button>
            }
          </div>
          {
            loading ? <div role="status" class="max-w-sm animate-pulse mt-4">
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span class="sr-only">Loading...</span>
            </div> : <p class="text-gray-700 dark:text-gray-300 mt-4">{summary}</p>
          }
        </div>
      </div> : ""
      }
    </div>
  )
}
