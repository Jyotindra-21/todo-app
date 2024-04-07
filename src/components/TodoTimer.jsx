import React, { useEffect, useRef, useState } from "react";

function TodoTimer({ time, deleteCancle }) {
  const [countDown, setCountDown] = useState(time);
  const timeId = useRef();

  useEffect(() => {
    timeId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timeId.current);
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timeId.current);
    }
  }, [countDown]);
  return (
    <div className="w-full h-50 flex justify-center items-center ">
      <span className="h-12 w-12 rounded-full bg-red-500 flex justify-center items-center text-white text-3xl">
        {countDown}
      </span>
      <button
        onClick={deleteCancle}
        className="ml-2 text-xl bg-green-500 rounded-md p-2 text-white"
        type="button"
      >
        CANCEL
      </button>
    </div>
  );
}

export default TodoTimer;
