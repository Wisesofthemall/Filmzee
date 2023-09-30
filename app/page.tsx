"use client";
import VideoSkeleton from "./components/videos/VideoSkeleton";
import VideoController from "./components/videos/VideoController";
import { useEffect, useState } from "react";
import { getAllVideos } from "@/database/videosCRUD/Supabase";
import VideoContainer from "./components/videos/VideoContainer";
import { VideoType } from "@/types/Types";

export default function Home() {
  const [IsLoaded, setIsLoaded] = useState(false);
  const [videos, setVideos] = useState<any>([]);

  const RetrieveVideos = async () => {
    const video: VideoType[] = await getAllVideos();
    setVideos(video);
    setIsLoaded(true);
  };
  useEffect(() => {
    //! LAGGING THE PAGE RetrieveVideos();
  }, []);

  return (
    <div className="grid grid-cols-8 w-full h-full">
      <div className="col-span-2 overflow-y-scroll h-[100vh]">
        <VideoController />
      </div>
      <div className="col-span-6  overflow-y-scroll h-[100vh]">
        {IsLoaded ? <VideoContainer videos={videos} /> : <VideoSkeleton />}
      </div>
    </div>
  );
}
