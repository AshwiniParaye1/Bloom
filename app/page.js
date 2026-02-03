"use client";

import Affirmations from "@/components/affirmations";
import NavItems from "@/components/navItems/navitems";
import Timer from "@/components/timer";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState("/vintage1.jpeg");
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

        <div className="absolute top-8 left-8 -translate-y-1/2 ">
          <Affirmations />
        </div>

        <div className="absolute top-8 right-8 -translate-y-1/2">
          <p className=" text-gray-200 text-xl">{time.toLocaleTimeString()}</p>
        </div>

        <div className="absolute sm:top-1/2 sm:left-0 sm:-translate-y-1/2 ml-8 top-16 left-1 ">
          <NavItems onSelectImage={setBackgroundImage} />
        </div>

        {/* Release your thoughts button */}
        <Link
          href="/burn"
          className="absolute bottom-8 right-8 group"
        >
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(251, 146, 60, 0.85) 0%, rgba(234, 88, 12, 0.85) 100%)",
              boxShadow: "0 4px 20px rgba(251, 146, 60, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              className="group-hover:animate-pulse"
            >
              <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
            </svg>
            <span className="text-white font-medium text-sm">Release your thoughts</span>
          </div>
        </Link>

        <div className="absolute bottom-8 left-0 ml-8">
          <p className="text-gray-400">Build by Ashwini Paraye</p>
        </div>
      </div>
    </>
  );
};

export default Home;
