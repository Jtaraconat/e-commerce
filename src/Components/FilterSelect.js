import React from "react";

export default function FilterSelect({
  htmlFor,
  name,
  optionsArray,
  onChange,
  id,
}) {
  return (
    <div className="flex flex-col justify-center col-span-12">
      <label htmlFor={htmlFor} className="mr-2">
        {name}
      </label>
      <select
        id={id}
        className="border border-solid border-black rounded-lg p-2 hover:outline hover:outline-offset-2 hover:outline-teal-500 transition-all"
        onChange={onChange}
      >
        {optionsArray.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
}
