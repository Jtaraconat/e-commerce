import React from "react";
import facebook from "../Assets/Footer/facebook.png";
import instagram from "../Assets/Footer/instagram.png";
import twitter from "../Assets/Footer/twitter.png";

export default function Footer() {
  return (
    <div className="bg-slate-400">
      <div className="flex flex-col my-3">
        <div className="flex flex-row justify-around my-3">
          <a>About us</a>
          <a>Contact</a>
          <a>Support</a>
          <a>FAQ</a>
          <a>C.G.V</a>
        </div>
        <div className="flex flex-col items-center my-3">
          <p>Suivez-nous sur:</p>
          <div className="flex flex-row gap-3">
            <img src={facebook} alt="facebook" className="size-8" />
            <img src={instagram} alt="instagram" className="size-8" />
            <img src={twitter} alt="twitter" className="size-8" />
          </div>
        </div>
      </div>
      <div className="my-3">
        <h2 className="text-center text-white font-semibold">
          Ce site est un site de démonstration
        </h2>
      </div>
    </div>
  );
}
