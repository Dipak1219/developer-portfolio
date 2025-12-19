import { useState } from "react";
import CustomCursor from "./components/CustomeCursor";
import IntroAnumation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
// import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonials from "./sections/Testimonials";
// import {motion,useScroll} from "framer-motion";

export default function App() {
  const [introDone,setIntroDone] = useState(false);

  // const scrollYProgress = useScroll().scrollYProgress;
  return (
    <>
      {!introDone && <IntroAnumation onFinish={() => setIntroDone(true)} /> }

{/* This is used for scrollY Progress! */}
      {/* <motion.div className={'w-full fixed bg-purple-500 h-3 origin-left top-0 left-0'} style={{scaleX:scrollYProgress}} ></motion.div> */}


      {introDone && (
    <div className="relative gradient text-white">
      <CustomCursor/>
      {/* <ParticlesBackground/> */}
    <Navbar/> 
    <Home/> 
    <About/> 
    <Skills/> 
    <Projects/> 
    <Testimonials/> 
    <Contact/> 
    <Footer/> 

    </div>
)}

    </>
  )
}

