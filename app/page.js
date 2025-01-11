"use client";

import React, { useEffect, useState } from "react";
import NavItems from "@/components/navItems/navitems";
import Timer from "@/components/timer";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState("/cafeteria.jpeg");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <Timer />

        <div className="absolute top-8 right-8 -translate-y-1/2 ">
          <p className=" text-gray-200 text-xl">{time.toLocaleTimeString()}</p>
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 ml-8">
          <NavItems onSelectImage={setBackgroundImage} />
        </div>

        <div className="absolute bottom-8 left-0 ml-8">
          <p className="text-gray-400">Build by Ashwini Paraye</p>
        </div>
      </div>
    </>
  );
};

export default Home;
