"use client";
import logo2 from "../../public/img/aii.png";
import {
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

import sarkar from "../../public/img/Banner.jpg";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Services Provided",
  desc: "Pragyan AI offers a suite of powerful summarization and sentiment analysis tools, empowering users to efficiently extract key insights from various media formats including text, documents, images, and videos.",
  image: logo2,
  bullets: [
    {
      title: "Video Summarisation",
      desc: "Efficiently summarize videos to extract key information.",
      icon: <CogIcon />,
    },
    {
      title: "Document Summarisation",
      desc: "Summarize various document formats such as Word, PDF, and more.",
      icon: <CogIcon />,
    },
    {
      title: "Sentiment Analysis",
      desc: "Analyze sentiment in text to understand emotional tone.",
      icon: <CogIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile-first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by the latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
