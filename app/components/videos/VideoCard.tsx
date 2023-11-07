import { VideoType } from "@/types/Types";
import React from "react";

type Props = {
  video: VideoType;
};

function VideoCard({ video }: Props) {
  return (
    <div className="w-[14rem] h-60 rounded-lg m-4">
      <iframe
        className="h-full w-full rounded-lg "
        title=""
        src={`https://www.youtube.com/embed/${video.link}?controls=0&autoplay=1&modestbranding=1&rel=0&loop=1&showinfo=0`}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoCard;
