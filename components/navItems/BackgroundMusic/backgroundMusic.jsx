"use client";

import { tracks } from "@/app/constants/bgTracks";
import React, { useState } from "react";
import { IoMusicalNotesOutline } from "react-icons/io5";

const BackgroundMusic = ({ trackUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleBgImage = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="text-gray-200">
        <button onClick={handleBgImage}>
          <IoMusicalNotesOutline size={25} />
        </button>
      </div>

      {isVisible && (
        <div className="absolute top-1/2 left-16 -translate-y-1/2 w-64 max-h-64 overflow-y-scroll bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
          {tracks.map((trackUrl, index) => (
            <iframe
              key={index}
              width="100%"
              height="166"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                trackUrl
              )}`}
            ></iframe>
          ))}
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
