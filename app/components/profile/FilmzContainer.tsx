import React from "react";
import FilmzCard from "./FilmzCard";

type Props = {};

const TestFilmz = [1, 2, 3, 4, 5, 6, 7];
function FilmzContainer({}: Props) {
  return (
    <div className="w-full h-[52vh]  flex flex-wrap justify-center mt-3 pl-[15rem] overflow-y-scroll">
      {TestFilmz.map((id) => (
        <FilmzCard key={id} />
      ))}
    </div>
  );
}

export default FilmzContainer;
