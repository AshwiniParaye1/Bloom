"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import { RiRestartLine } from "react-icons/ri";

const Timer = () => {
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState("pomodoro"); // Track selected button

  const formatTime = (time) => {
    if (time === null || time < 0) return "00:00";
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

  // Handle setting a new initial time and updating selected timer
  const handleSetInitialTime = (newTime, timerType) => {
    setInitialTime(newTime);
    setTime(newTime);
    setSelectedTimer(timerType);
    setIsRunning(false);
  };
  return (
    <>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className={`${selectedTimer === "pomodoro" ? "bg-gray-200" : ""} `}
          onClick={() => handleSetInitialTime(25 * 60, "pomodoro")}
        >
          Pomodoro
        </Button>
        <Button
          variant="outline"
          className={`${selectedTimer === "shortBreak" ? "bg-gray-200" : ""}`}
          onClick={() => handleSetInitialTime(5 * 60, "shortBreak")}
        >
          Short Break
        </Button>
        <Button
          variant="outline"
          className={`${selectedTimer === "longBreak" ? "bg-gray-200" : ""}`}
          onClick={() => handleSetInitialTime(10 * 60, "longBreak")}
        >
          Long Break
        </Button>
      </div>

      <div className="font-semibold text-6xl mt-6 mb-6">
        <p className="text-gray-200">{formatTime(time)}</p>
      </div>

      {/* start/pause, restart */}
      <div className="flex gap-4">
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              if (time > 0) setIsRunning(!isRunning);
              setIsRunning(!isRunning);
            }}
            className="bg-gray-200"
          >
            {isRunning ? <IoPlayOutline /> : <IoPauseOutline />}
          </Button>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={() => {
              if (initialTime !== null) setTime(initialTime);
            }}
            className="bg-gray-200"
          >
            <RiRestartLine />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Timer;
