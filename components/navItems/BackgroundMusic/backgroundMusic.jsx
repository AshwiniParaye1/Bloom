"use client";

import { tracks } from "@/app/constants/bgTracks";
import React, { useState } from "react";
import { IoMusicalNotesOutline } from "react-icons/io5";

const BackgroundMusic = ({ trackUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMusicTrack = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="text-gray-200">
        <button onClick={handleMusicTrack}>
          <IoMusicalNotesOutline size={25} />
        </button>
      </div>

      {isVisible && (
        <div className="absolute top-1/2 left-16 -translate-y-1/2 w-64 max-h-64 overflow-y-scroll bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
          {tracks.map((trackUrl, index) => (
            <iframe
              key={index}
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                trackUrl
              )}`}
              className="w-full h-36 object-cover rounded-xl cursor-pointer"
            ></iframe>
          ))}
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
