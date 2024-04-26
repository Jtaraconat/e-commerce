import React from "react";
import user from "../Assets/Navbar/user.png";
import { Link } from "react-router-dom";

export default function Navbar({}) {
  return (
    <div className="grid grid-cols-12 bg-center py-5 p-2 grid-rows-2 md:grid-rows-1">
      <div className="col-span-12 mb-2 ">
        <Link to={"/"}>
          <h1 className="text-4xl">E-Commerce</h1>
        </Link>
      </div>

      <div className="col-span-12  md:col-start-5 flex flex-row gap-3 items-center justify-between">
        <a>About</a>
        <a>Contact</a>
        <a>Support</a>
        <a>FAQ</a>

        <Link to={"/"}>
          <img src={user} alt="user-profile" className="size-9"></img>
        </Link>
      </div>
    </div>
  );
}
