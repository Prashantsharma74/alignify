
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

interface TypeWriterProps {
  text: string;
  className?: string;
}

export const TypeWriter = ({ text, className = "" }: TypeWriterProps) => {
  const [scope, animate] = useAnimate();
  
  useEffect(() => {
    animate(
      scope.current,
      { opacity: 1 },
      { duration: 0, delay: 0 }
    );
    
    const words = text.split(" ");
    let delay = 0;
    let letterIndex = 0;
    
    words.forEach((word, i) => {
      const letters = word.split("");
      letters.forEach((letter) => {
        animate(
          `span:nth-of-type(${letterIndex + 1})`,
          {
            opacity: 1,
          },
          {
            delay: delay,
            duration: 0.1,
          }
        );
        letterIndex++;
        delay += 0.05;
      });
      // Add space after each word except the last one
      if (i < words.length - 1) {
        letterIndex++;
        delay += 0.1; // Extra delay between words
      }
    });
  }, [text, animate]);

  return (
    <motion.div ref={scope} className={className}>
      {text.split("").map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="opacity-0 inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
