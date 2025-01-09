"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import { RiRestartLine } from "react-icons/ri";

const Timer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Handle timer countdown
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" className="">
          Pomodoro
        </Button>
        <Button variant="outline" className="">
          Short Break
        </Button>
        <Button variant="outline" className="">
          Long Break
        </Button>
      </div>

      <div>
        <p>{formatTime(time)}</p>
      </div>

      {/* start/pause, restart */}
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? <IoPlayOutline /> : <IoPauseOutline />}
          </Button>
        </div>

        <div>
          <Button variant="outline" onClick={() => setTime(25 * 60)}>
            <RiRestartLine />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Timer;
