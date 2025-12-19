import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AnimatePresence} from "framer-motion";

const IntroAnumation = ({ onFinish }) => {
  const greetings = useMemo(() => [
    "Hello",
      "नमस्ते",
      "Hola",
      "Bonjour",
      "Ciao",
      "Olá",
      "Здравствуйте",
      "Merhaba",
      "Γειά",
      "Hej",
      "Hallo",
      "Salam",
      "Hari bol...."
  ], []);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setInterval(() => setIndex((i) => i + 1), 150);
      return () => clearInterval(id);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed overflow-hidden inset-0 z-[99999 flex items-center justify-center bg-black text-white "
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h1
            key={index}
            className="font-bold text-5xl sm:text-7xl md:text-8xl "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnumation;
