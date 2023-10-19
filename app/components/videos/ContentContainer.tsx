import React from "react";

import { VideoType } from "@/types/Types";
import FilmzContainer from "../filmz/FilmzContainer";
import VideoSkeleton from "./VideoSkeleton";

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
    <div className="flex flex-wrap p-3  ">
      {selected === "Filmz" ? (
        <FilmzContainer
          main
          filmzId={filmzId}
          setFilmzId={setFilmzId}
          setImage={setImage}
        />
      ) : (
        <VideoSkeleton />
      )}
    </div>
  );
}

export default ContentContainer;
