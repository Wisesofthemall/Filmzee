import { getAllVideos } from "@/database/videosCRUD/Supabase";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

type Props = {};

function ForYouPlayer({}: Props) {
  const [videos, setVideos] = useState<any[] | null>(null);
  const [index, setIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  //* Get all videos and set the index state
  const getVideos = async () => {
    const videos = await getAllVideos();
    setEndIndex(videos.length - 1);
    setVideos(videos);
  };
  const changeIndex = (value: number) => {
    setIndex(index + value);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="w-full h-full">
      {videos && (
        <VideoCard
          video={videos[index]}
          changeIndex={changeIndex}
          index={index}
          endIndex={endIndex}
        />
      )}
    </div>
  );
}

export default ForYouPlayer;
