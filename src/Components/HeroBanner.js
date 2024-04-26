import React from "react";
import banner from "../Assets/Banner/banner.jpg";
import bannerPerson from "../Assets/Banner/banner-music.png";

export default function HeroBanner() {
  return (
    <div
      className="col-span-12 grid grid-cols-12 bg-center bg-cover  mb-5 "
      style={{
        backgroundImage: `linear-gradient(rgba(150, 150, 150, 0.2), rgba(150, 150, 150, 0.2)), url(${banner})`,
      }}
    >
      <div className=" col-span-8 p-3">
        <h1 className="text-xl md:text-4xl flex flex-col justify-around h-96 font-bold tracking-wide h-full text-neutral-100">
          Profitez de nos offres exceptionnelles!
        </h1>
      </div>

      <div className="col-span-4 ">
        <img src={bannerPerson} />
      </div>
    </div>
  );
}
