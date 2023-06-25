import React, { useEffect, useState } from "react";

function SpinItem({ winingPosition }) {
  const [position, setPosition] = useState(0);
  const [customInterval, setCustomInterval] = useState(null);

  useEffect(() => {
    if (position < winingPosition && !customInterval) {
      const int = setInterval(() => setPosition((current) => current + 23.5), 10);
      setCustomInterval(int);
    }
    // return () => clearInterval(customInterval);
  }, [winingPosition, position, customInterval]);

  useEffect(() => {
    if (position === winingPosition && customInterval) {
      clearInterval(customInterval);
      setCustomInterval(null);
    }
  }, [position, customInterval, winingPosition]);

  return <div style={{ backgroundPosition: `0px ${position}px` }} className="icons" />;
}

export default SpinItem;
