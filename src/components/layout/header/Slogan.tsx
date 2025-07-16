"use client";

import React, { useEffect, useState } from "react";

const slogans = [
  <>
    Yetenek <span className="text-myDarkYellow font-bold">sende</span>, sahne{" "}
    <span className="text-myDarkYellow font-bold">freelansup’ta!</span>
  </>,
  <>
    Her <span className="text-myDarkYellow font-bold">4 işten 1’i</span> bizden,
    <span className="text-myDarkYellow font-bold"> komisyonsuz!</span>
  </>,
];

const Slogan = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slogans.length);
        setFade(true);
      }, 300); // fade out before changing
    }, 3000); // 5 seconds interval
    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className={`text-center text-white text-base sm:text-lg font-semibold tracking-wide transition-all duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {slogans[index]}
    </h1>
  );
};

export default Slogan;
