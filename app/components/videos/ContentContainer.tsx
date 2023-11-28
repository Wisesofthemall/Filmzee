"use client";
import React from "react";
import { VideoType } from "@/types/Types";
import FilmzContainer from "../filmz/FilmzContainer";
import ForYouPlayer from "./ForYouPlayer";

type Props = {
  videos: VideoType[];
  selected: any;
  filmzId: string;
  setFilmzId: any;
  setImage: any;
};
const TestFilmz = [1, 2, 3, 4, 5, 6, 7];
function ContentContainer({
  videos,
  selected,
  filmzId,
  setFilmzId,
  setImage,
}: Props) {
  return (
    <div className=" ">
      {selected === "Filmz" && (
        <FilmzContainer main setFilmzId={setFilmzId} setImage={setImage} />
      )}
      {selected === "ForYou" && <ForYouPlayer />}
    </div>
  );
}

export default ContentContainer;
