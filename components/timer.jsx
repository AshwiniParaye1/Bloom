import React from "react";
import { Button } from "./ui/button";
import { IoPlayOutline, IoPauseOutline, IoRestart } from "react-icons/io5";
import { RiRestartLine } from "react-icons/ri";

const Timer = () => {
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
        <p>25 : 00</p>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2">
          <Button variant="outline">
            <IoPlayOutline />
          </Button>
          <Button variant="outline" className="hidden">
            <IoPauseOutline />
          </Button>
        </div>

        <div>
          <Button variant="outline" className="">
            <RiRestartLine />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Timer;
