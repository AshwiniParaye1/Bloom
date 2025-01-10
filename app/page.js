import NavItems from "@/components/navItems/navitems";
import Timer from "@/components/timer";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="bg-image h-screen w-full flex flex-col justify-center items-center ">
        {/* <div className="flex flex-col justify-center items-center"> */}
        <h1>Bloom</h1>
        <Timer />
        {/* </div> */}

        <div className="absolute top-1/2 left-0 -translate-y-1/2 ml-8">
          <NavItems />
        </div>

        <div className="absolute bottom-8 left-0 ml-8">
          <p className="text-gray-500">Build by Ashwini Paraye</p>
        </div>
      </div>
    </>
  );
};

export default Home;
