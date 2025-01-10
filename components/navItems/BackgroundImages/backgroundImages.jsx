"use client";

import { images } from "@/app/constants/bgImages";
import Image from "next/image";
import React, { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";

const BackgroundImages = ({ onSelectImage }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleBgImage = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="text-gray-200">
        <button onClick={handleBgImage}>
          <IoImagesOutline size={25} />
        </button>
      </div>

      {isVisible && (
        <div className="absolute top-1/2 left-16 -translate-y-1/2 w-64 max-h-64 overflow-y-scroll bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt="scene"
              width={400}
              height={30}
              className="w-full h-36 object-cover rounded-xl cursor-pointer"
              onClick={() => {
                onSelectImage(src);
                setIsVisible(false);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BackgroundImages;
