"use client";

import React, { useState } from "react";
import NavItems from "@/components/navItems/navitems";
import Timer from "@/components/timer";

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState("/cafeteria.jpeg");

  return (
    <>
      <div
        className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <Timer />

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
