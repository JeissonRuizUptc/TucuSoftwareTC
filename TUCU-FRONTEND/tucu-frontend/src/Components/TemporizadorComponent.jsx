// TemporizadorComponent.jsx
import React, { useState, useEffect } from "react";

const TemporizadorComponent = ({ preparationTime, startTime }) => {
  const [remainingTime, setRemainingTime] = useState(calcRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calcRemainingTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [preparationTime, startTime]);

  function calcRemainingTime() {
    const currentTime = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000);
    const remainingTime = preparationTime * 60 - currentTime;
    return remainingTime > 0 ? remainingTime : 0;
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return <span>{formatTime(remainingTime)}</span>;
};

export default TemporizadorComponent;
