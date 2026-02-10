"use client";

import Affirmations from "@/components/affirmations";
import { BurnThoughtModal } from "@/components/BurnThought";
import DynamicBackground from "@/components/layout/DynamicBackground";
import NavItems from "@/components/navItems/navitems";
import Timer from "@/components/timer";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () =>
{
  const { setBackgroundImage } = useTheme();
  const [time, setTime] = useState(new Date());
  const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);

  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <DynamicBackground>
      <Timer />

      <div className="absolute top-8 left-8">
        <Affirmations />
      </div>

      <div className="absolute top-8 right-8">
        <p className=" text-gray-200 text-xl">{time.toLocaleTimeString()}</p>
      </div>

      <div className="absolute sm:top-1/2 sm:left-0 sm:-translate-y-1/2 ml-8 top-16 mt-4 left-1">
        <NavItems onSelectImage={setBackgroundImage} />
      </div>

      {/* Release your thoughts button */}
      <div
        className="absolute bottom-8 right-8 group rounded-xl backdrop-blur-md cursor-pointer bg-gradient-to-bl from-black to-transparent text-gray-200"
        onClick={() => setIsBurnModalOpen(true)}
      >
        <div className="flex items-center gap-2 px-5 py-2.5">
          <Image
            src="/fire.gif"
            alt="fire"
            width={18}
            height={18}
            className="group-hover:animate-pulse"
          />
          <span className="font-medium text-sm">Release your thoughts</span>
        </div>
      </div>

      {/* Burn Thought Modal */}
      <BurnThoughtModal
        isOpen={isBurnModalOpen}
        onClose={() => setIsBurnModalOpen(false)}
      />

      <div className="absolute bottom-8 left-0 ml-8">
        <p className="text-gray-400">Build by Ashwini Paraye</p>
      </div>
    </DynamicBackground>
  );
};

export default Home;
