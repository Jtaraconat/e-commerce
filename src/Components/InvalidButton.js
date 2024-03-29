import React from "react";

export default function InvalidButton({ text, onClick }) {
  return (
    <button
      className="border border-solid border-black rounded-lg p-2 hover:bg-red-300 hover:text-white transition-all"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
