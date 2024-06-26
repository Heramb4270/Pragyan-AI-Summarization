"use client";

import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 ">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 ">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "What services does Pragyan AI offer?",
    answer: "Pragyan AI offers a suite of powerful summarization and sentiment analysis tools.",
  },
  {
    question: "what backend technology does it use?",
    answer: "Pragyan tools are powered by gemini a state-of-the-art transformer-based model`.",
  },
  {
    question: "Which type of videos can be summarized?",
    answer:
      "The video summarizer tool can be used to summarize any youtube video that has a captions file and is in a language supported by the tool.",
  },
  {
    question: "Does it has feature of chat with documents? ",
    answer:
      "Yes,it provides a feature of chat with documents where you can chat with the document and get the summary of the document.",
  },
];

export default Faq;
