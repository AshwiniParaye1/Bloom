import React, { useState, useRef, useEffect } from "react";
import { IoMusicalNotesOutline, IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { tracks } from "@/app/constants/bgTracks";

const BackgroundMusic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  const handleMusicTrack = () => {
    setIsVisible(!isVisible);
  };

  const handleTrackSelection = (index) => {
    setIsLoading(true);
    setCurrentTrackIndex(index);
    setIsVisible(false);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Initialize SoundCloud Widget
    if (iframeRef.current) {
      const initWidget = () => {
        // @ts-ignore
        widgetRef.current = window.SC.Widget(iframeRef.current);

        widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
          setIsLoading(false);
        });

        // Handle track finish event
        widgetRef.current.bind(window.SC.Widget.Events.FINISH, () => {
          playNextTrack();
        });
      };

      // Load SoundCloud Widget API if not already loaded
      if (!window.SC) {
        const script = document.createElement("script");
        script.src = "https://w.soundcloud.com/player/api.js";
        script.onload = initWidget;
        document.body.appendChild(script);
      } else {
        initWidget();
      }
    }
  }, []);

  useEffect(() => {
    if (widgetRef.current) {
      setIsLoading(true);
      widgetRef.current.load(tracks[currentTrackIndex].url, {
        auto_play: true,
        show_artwork: false,
        show_comments: false,
        show_playcount: false,
        show_user: false,
        callback: () => setIsLoading(false)
      });
    }
  }, [currentTrackIndex]);

  return (
    <>
      <div className="text-gray-200">
        <button onClick={handleMusicTrack}>
          <IoMusicalNotesOutline size={25} />
        </button>
      </div>

      <iframe
        ref={iframeRef}
        id="soundcloud-player"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          tracks[currentTrackIndex].url
        )}&auto_play=true`}
        allow="autoplay"
        className="hidden"
      />

      {isVisible && (
        <div className="absolute sm:top-1/2 left-16 sm:-translate-y-1/2 sm:w-64 sm:max-h-64 w-40 max-h-40 top-0 overflow-y-scroll overflow-hidden bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
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
              onClick={() => handleTrackSelection(index)}
              className={`w-full h-36 rounded-xl cursor-pointer flex justify-center items-center ${
                currentTrackIndex === index
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200"
              }`}
            >
              {track.name}
            </Button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
