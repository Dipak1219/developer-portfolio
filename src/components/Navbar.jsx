import React, { useEffect, useRef, useState } from 'react'
import OverlayMenu from './OverlayMenu'
import Logo from '../assets/Logo.png'
import { FiMenu } from "react-icons/fi";
import { time } from 'framer-motion';


const Navbar = () => {

  const [menuOpen,setMenuOpen] = useState(false);
  const [visible,setVisible] = useState(true);
  const [forceVisible,setForceVisible] = useState(false)


  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        }
        else {
          setForceVisible(false);
        }
      },{threshold:0.1}
    )

    if (homeSection) observer.observe(homeSection);

    return () => {
      if(homeSection) observer.unobserve(homeSection);
    }

  },[])


  useEffect(() => {
    const handleScroll = () => {
      if(forceVisible) {
       setVisible(true)
       return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      }
      else {
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current)
          timerId.current = setTimeout(() => {
        setVisible(true);
        },3000)
      }
      lastScrollY.current = currentScrollY;
    }
    window.addEventListener('scroll',handleScroll,{passive:true})
    return () => {
      window.removeEventListener('scroll',handleScroll);
      if(timerId.current) clearTimeout(timerId.current);

    }
  },[forceVisible]);

  return (
    <>
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? 'translate-y-0': '-translate-y-full' } `}>

    <div className='flex items-center space-x-10'>
      <img src="https://th.bing.com/th?q=Letter+D+Logo+Black+Background&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&ucfimg=1&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="Logo" className='h-12 w-12 shadow shadow-blue-500 pointer-events-none rounded-4xl' />
      <div className='text-white text-2xl hidden font-bold sm:block'>
        {/* Dipak */}
      </div>
    </div>

    <div className='block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 '>
    <button onClick={() => setMenuOpen(true)} className='text-3xl text-white focus:outline-none' area-lable='open Menu' >
      <FiMenu />
    </button>
    </div>


    <div className='hidden lg:block'>
      <a href="#contact" className='bg-linear-to-r from-pink-500 to-blue-500 font-medium text-white py-2 px-4 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300 '>Reach Out</a>
    </div>


    </nav>
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default Navbar












// import { useState, useEffect, useRef } from "react";
// import OverlayMenu from "./OverlayMenu";
// import Logo from "../assets/Logo.png";
// import { FiMenu } from "react-icons/fi";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [forceVisible, setForceVisible] = useState(false);

//   const lastScrollY = useRef(0);
//   const timerId = useRef(null);

//   useEffect(() => {
//     const homeSection = document.querySelector("#home");
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setForceVisible(true);
//           setVisible(true);
//         } else {
//           setForceVisible(false);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (homeSection) observer.observe(homeSection);
//     return () => {
//       if (homeSection) observer.unobserve(homeSection);
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (forceVisible) {
//         setVisible(true);
//         return;
//       }

//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY.current) {
//         setVisible(false); // scrolling down
//       } else {
//         setVisible(true); // scrolling up
//       }

//       if (timerId.current) clearTimeout(timerId.current);
//       timerId.current = setTimeout(() => {
//         setVisible(false);
//       }, 3000);

//       // ✅ update last scroll position
//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (timerId.current) clearTimeout(timerId.current);
//     };
//   }, [forceVisible]);

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${
//           visible ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="flex items-center space-x-2">
//           <img src={Logo} alt="logo" className="w-8 h-8" />
//           <div className="text-2xl font-bold text-white hidden sm:block">
//             Dipak
//           </div>
//         </div>
//         <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
//           <button
//             onClick={() => setMenuOpen(true)}
//             className="text-white text-3xl  focus:outline-none "
//             area-label="open menu"
//           >
//             <FiMenu />
//           </button>
//         </div>

//         {/* button */}

//         <div className="hidden lg:block">
//           <a
//             href="#contact"
//             className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
//           >
//             Reach Out
//           </a>
//         </div>
//       </nav>
//       <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
//     </>
//   );
// }
