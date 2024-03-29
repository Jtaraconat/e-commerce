import React from "react";

import user from "../Assets/Navbar/user.png";
import banner from "../Assets/Navbar/banner.jpg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      className="flex flex-row justify-between items-center bg-center py-10 mb-10 p-2"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div>
        <Link to={"/"}>
          <h1 className="text-2xl">E-Commerce</h1>
        </Link>
      </div>

      <div className="flex flex-row gap-3 items-center">
        <a>About us</a>
        <a>Contact</a>

        <Link to={"/user-profile"}>
          <img src={user} alt="user-profile" className="size-9"></img>
        </Link>
      </div>
    </div>
  );
}
