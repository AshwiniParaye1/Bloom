"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import { RiRestartLine, RiEditLine } from "react-icons/ri";

const Timer = () => {
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState("pomodoro");
  const [isEditing, setIsEditing] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  const formatTime = (time) => {
    if (time === null || time < 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

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

  const handleSetInitialTime = (newTime, timerType) => {
    setInitialTime(newTime);
    setTime(newTime);
    setSelectedTimer(timerType);
    setIsRunning(false);
    setIsEditing(false);
  };

  const handleCustomTimeSubmit = () => {
    const customTimeInSeconds = customMinutes * 60;
    handleSetInitialTime(customTimeInSeconds, "custom");
  };

  return (
    <>
      {/* Timer Presets */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className={`${
            selectedTimer === "pomodoro" ? "bg-gray-200" : "text-gray-200"
          } text-base`}
          onClick={() => handleSetInitialTime(25 * 60, "pomodoro")}
        >
          Pomodoro
        </Button>
        <Button
          variant="outline"
          className={`${
            selectedTimer === "shortBreak" ? "bg-gray-200" : "text-gray-200"
          } text-base`}
          onClick={() => handleSetInitialTime(5 * 60, "shortBreak")}
        >
          Short Break
        </Button>
        <Button
          variant="outline"
          className={`${
            selectedTimer === "longBreak" ? "bg-gray-200" : "text-gray-200"
          } text-base`}
          onClick={() => handleSetInitialTime(10 * 60, "longBreak")}
        >
          Long Break
        </Button>
      </div>

      {/* Timer Display */}
      <div className="font-semibold text-6xl mt-6 mb-6 flex flex-row gap-4 items-center justify-center">
        <p className="text-gray-200">{formatTime(time)}</p>
        <button
          variant="outline"
          // className={`${
          //   selectedTimer === "custom" ? "bg-gray-200" : "text-gray-200"
          // } text-base`}
          className="text-gray-200"
          onClick={() => setIsEditing(true)}
        >
          <RiEditLine size={30} className="hover:text-black" />
        </button>
      </div>

      {/* Edit Timer Input */}
      {isEditing && (
        <div className="flex gap-2 items-center mb-4">
          <input
            type="number"
            min="1"
            max="180"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            className="w-16 p-2 text-black text-center rounded"
          />
          <span className="text-gray-200">minutes</span>
          <Button
            variant="outline"
            className="bg-gray-200"
            onClick={handleCustomTimeSubmit}
          >
            Set
          </Button>
        </div>
      )}

      {/* Timer Controls */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setIsRunning(!isRunning)}
          className="bg-gray-200"
        >
          {isRunning ? <IoPauseOutline /> : <IoPlayOutline />}
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSetInitialTime(initialTime, selectedTimer)}
          className="bg-gray-200"
        >
          <RiRestartLine />
        </Button>
      </div>
    </>
  );
};

export default Timer;
