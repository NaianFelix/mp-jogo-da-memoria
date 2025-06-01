import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="text-[74px] text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
      Tempo: {time}s
    </div>
  );
};

export default Timer;
