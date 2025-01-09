import Timer from "@/components/timer";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center m-2 w-full h-screen">
      <h1>Bloom</h1>
      <Timer />
    </div>
  );
};

export default Home;
