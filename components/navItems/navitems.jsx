import React from "react";
import BackgroundImages from "@/components/navItems/BackgroundImages/backgroundImages";
import BackgroundMusic from "@/components/navItems/BackgroundMusic/backgroundMusic";

const NavItems = () => {
  return (
    <div className="bg-gradient-to-bl from-black to-transparent p-4 rounded-xl flex flex-col gap-4">
      <BackgroundImages />
      <BackgroundMusic />
    </div>
  );
};

export default NavItems;
