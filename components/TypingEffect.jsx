import React, { useState, useEffect } from "react";

export const TypingEffect = ({ text, className }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const textArray = text.split("");
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setDisplayText((prevText) => {
        const newText = prevText + textArray[currentIndex];
        currentIndex += 1;

        if (currentIndex === textArray.length) {
          clearInterval(typingInterval);
        }

        return newText;
      });
    }, 100);

    return () => clearInterval(typingInterval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};
