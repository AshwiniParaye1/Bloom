import React from "react";
import BackgroundImages from "@/components/navItems/BackgroundImages/backgroundImages";
import BackgroundMusic from "@/components/navItems/BackgroundMusic/backgroundMusic";

const NavItems = ({ onSelectImage, trackUrl }) => {
  return (
    <div className="bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
      <BackgroundImages onSelectImage={onSelectImage} />
      <BackgroundMusic trackUrl={trackUrl} />
    </div>
  );
};

export default NavItems;
