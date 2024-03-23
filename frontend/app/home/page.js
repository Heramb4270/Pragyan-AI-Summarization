import Head from "next/head";
import Hero from "/components/Home/hero";
import Navbar from "/components/Home/navbar";
import SectionTitle from "/components/Home/sectionTitle";
import { benefitOne } from "/components/Home/data";
import Video from "/components/Home/video";
import Benefits from "/components/Home/benefits";
import Footer from "/components/Home/footer";
import Faq from "/components/Home/faq";
import PopupWidget from "/components/Home/popupWidget";

const page = () => {
  return (
    <>
      <Head>
        <title>Janhit - Adressing the peoples</title>
        <meta
          name="description"
          content="Nextly is a free lanith next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle title=" Why should you use प्रज्ञान Ai">
        Pragyan AI offers a suite of powerful summarization and sentiment
        analysis tools, empowering users to efficiently extract key insights
        from various media formats including text, documents, images, and
        videos. It is powered by Gemini, a robust backend technology, enabling
        seamless processing and analysis of data for efficient summarization and
        sentiment analysis.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <SectionTitle
        pretitle="Watch a video"
        title="Learn how to use our tools "
      ></SectionTitle>
      <Video />
      {/* <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
      <Testimonials />
      */}
      <SectionTitle
        pretitle="FAQ"
        title="Frequently Asked Questions"
      ></SectionTitle>
      <Faq />
      {/* <Cta /> */}
      <Footer />
      <PopupWidget />
    </>
  );
};

export default page;
