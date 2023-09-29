import React from "react";
import VideoCard from "./VideoCard";
import { VideoType } from "@/types/Types";

type Props = { videos: VideoType[] };

function VideoContainer({ videos }: Props) {
  return (
    <div className="flex flex-wrap p-3  ">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoContainer;
