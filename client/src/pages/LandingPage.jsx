import Blogs from "../component/Blogs";
import HeroSection from "../component/HeroSection";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Footer from "../component/Footer";
import NewsLetter from "@/component/NewsLetter";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <HeroSection />
      <Blogs />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default App;
