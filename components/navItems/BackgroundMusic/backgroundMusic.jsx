"use client";

import { tracks } from "@/app/constants/bgTracks";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { IoMusicalNotesOutline, IoClose } from "react-icons/io5";

const BackgroundMusic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]); // Default track
  const iframeRef = useRef(null);

  const handleMusicTrack = () => {
    setIsVisible(!isVisible);
  };

  // Function to switch track
  const handleTrackSelection = (track) => {
    setCurrentTrack(track);
    setIsVisible(false);
  };

  useEffect(() => {
    // Ensure iframe reloads with the new track when changed
    if (iframeRef.current) {
      iframeRef.current.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        currentTrack
      )}&auto_play=true`;
    }
  }, [currentTrack]);

  return (
    <>
      <div className="text-gray-200">
        <button onClick={handleMusicTrack}>
          <IoMusicalNotesOutline size={25} />
        </button>
      </div>

      {/* Hidden SoundCloud Player (Always Active) */}
      <iframe
        ref={iframeRef}
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          currentTrack
        )}&auto_play=true`}
        allow="autoplay"
        className="hidden"
      ></iframe>

      {isVisible && (
        <div className="absolute sm:top-1/2 left-16 sm:-translate-y-1/2 sm:w-64 sm:max-h-64 w-40 max-h-40  top-0 overflow-y-scroll bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
          <button
            className="text-gray-200 self-end text-xl"
            onClick={() => setIsVisible(false)}
          >
            <IoClose />
          </button>

          {tracks.map((track, index) => (
            <Button
              variant="outline"
              key={index}
              onClick={() => handleTrackSelection(track.url)}
              className="w-full h-36 bg-gray-200 rounded-xl cursor-pointer flex justify-center items-center"
            >
              {track.name}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
