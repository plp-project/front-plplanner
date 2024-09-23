import React, { useEffect, useRef } from "react";
import Planejamento from "./Planejamento";

const Quadro = ({ month, year }) => {
  const quadroRef = useRef(null);
  const todayRef = useRef(null);

  const getToday = () => {
    const today = new Date();
    if (today.getFullYear() === year && today.getMonth() + 1 === month) {
      return today.getDate();
    }
    return null;
  };

  useEffect(() => {
    const todayPosition = todayRef.current?.offsetLeft;
    if (todayPosition !== undefined && quadroRef.current) {
      const extraPadding = 16;
      quadroRef.current.scrollTo({
        left: todayPosition - extraPadding,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="flex flex-col w-full flex-grow relative">
      <div
        ref={quadroRef}
        className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden"
      >
        <Planejamento month={month} year={year} getTodayRef={todayRef} />
      </div>
    </div>
  );
};

export default Quadro;
