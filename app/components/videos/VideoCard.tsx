import { VideoType } from "@/types/Types";
import Image from "next/image";
import React from "react";
import VideoButtons from "./VideoButtons";

type Props = {
  video: VideoType;
  changeIndex: (value: number) => void;
  index: number;
  endIndex: number;
};

function VideoCard({ video, changeIndex, index, endIndex }: Props) {
  console.log("video", video);
  return (
    <div className="w-[90%] h-[70vh] rounded-lg m-4  flex">
      {/* <Image
        className="w-full h-full"
        src={video.thumbnail}
        alt="Video Thumbnail"
        width={60}
        height={60}
      /> */}
      <iframe
        className="h-full w-full rounded-lg "
        title=""
        src={`https://www.youtube.com/embed/${video.link}?autoplay=1&modestbranding=1&rel=0&loop=1&showinfo=0`}
        allowFullScreen
      ></iframe>
      <VideoButtons
        changeIndex={changeIndex}
        index={index}
        endIndex={endIndex}
      />
    </div>
  );
}

export default VideoCard;
