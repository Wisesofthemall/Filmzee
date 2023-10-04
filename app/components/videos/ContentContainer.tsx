import React from "react";

import { VideoType } from "@/types/Types";
import FilmzContainer from "../profile/FilmzContainer";

type Props = { videos: VideoType[]; selected: any };
const TestFilmz = [1, 2, 3, 4, 5, 6, 7];
function ContentContainer({ videos, selected }: Props) {
  return (
    <div className="flex flex-wrap p-3  ">
      {selected === "Filmz" && <FilmzContainer main />}
    </div>
  );
}

export default ContentContainer;
