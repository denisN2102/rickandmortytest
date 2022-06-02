import React, { useRef, useState, useEffect } from "react";
import "./DropDown.css";

export const DropDown = ({
  characters,
  prompt,
  value,
  onChange,
  id,
  label,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function close(e) {
    setOpen(e && e.target === ref.current);
  }

  function filter(characters) {
    return characters.filter(
      (character) =>
        character[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  function displayValue() {
    if (query.length > 0) return query;
    if (value) return value[label];
    return "";
  }

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value" ref={ref}>
          <input
            type="text"
            ref={ref}
            placeholder={value ? value : prompt}
            value={displayValue()}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onClick={() => setOpen((prev) => !prev)}
          ></input>
        </div>
        <div className={`arrow ${open ? "open" : null}`}></div>
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {filter(characters).map((character) => (
          <div
            key={character[id]}
            className={`option ${value === character ? "selected" : null}`}
            onClick={() => {
              setQuery("");
              onChange(character.name);
              setOpen(false);
            }}
          >
            {character[label]}
          </div>
        ))}
      </div>
    </div>
  );
};
