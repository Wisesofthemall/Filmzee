import React from "react";

import { VideoType } from "@/types/Types";
import FilmzContainer from "../filmz/FilmzContainer";
import VideoSkeleton from "./VideoSkeleton";
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
      {selected === "Following" && (
        <div className=" grid w-full h-full place-items-center font-bold text-2xl">
          Feature not out yet
        </div>
      )}
      {selected === "Explore" && (
        <div className=" grid w-full h-full place-items-center font-bold text-2xl">
          Feature not out yet
        </div>
      )}
    </div>
  );
}

export default ContentContainer;
