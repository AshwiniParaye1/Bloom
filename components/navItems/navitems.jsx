import React from "react";
import BackgroundImages from "@/components/navItems/BackgroundImages/backgroundImages";
import BackgroundMusic from "@/components/navItems/BackgroundMusic/backgroundMusic";

const NavItems = ({ onSelectImage }) => {
  return (
    <div className="bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
      <BackgroundImages onSelectImage={onSelectImage} />
      <BackgroundMusic trackUrl="https://soundcloud.com/relaxing-music-production/sets/playlist-of-relaxing-soft?si=5029e4a9b19048e5a1c4b63303cbb7be&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" />
    </div>
  );
};

export default NavItems;
