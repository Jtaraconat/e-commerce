import React from "react";

export default function ValidButton({ text, onClick }) {
  return (
    <button
      className="border border-solid border-black rounded-lg p-2 md:py-2 md:px-5 hover:bg-teal-500 hover:text-white transition-all"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
