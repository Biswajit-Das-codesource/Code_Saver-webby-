import Threads from "@/blocks/Backgrounds/Threads/Threads";
import React from "react";
import { Button } from "./ui/button";

function Page() {
  return (
    <div className="h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center text-center px-6 font-sans">
      <h2 className="text-white font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
        Crafting Design <br />
        Model to Impact the <br /> Future Today.
      </h2>

      <Button className="cursor-pointer mt-14 px-8 py-6 text-base font-bold">
        Get Started
      </Button>

      {/* Background Animation */}
      <div className="absolute top-0 w-full h-full">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>
    </div>
  );
}

export default Page;
