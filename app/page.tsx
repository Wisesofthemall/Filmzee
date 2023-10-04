"use client";
import VideoSkeleton from "./components/videos/VideoSkeleton";
import VideoController from "./components/videos/VideoController";
import { useEffect, useState } from "react";
import { getAllVideos } from "@/database/videosCRUD/Supabase";
import { VideoType } from "@/types/Types";
import NewsContainer from "./components/news/NewsContainer";
import ContentContainer from "./components/videos/ContentContainer";

export default function Home() {
  const [IsLoaded, setIsLoaded] = useState(true);
  const [videos, setVideos] = useState<any>([]);
  const [selected, setSelected] = useState("");

  const RetrieveVideos = async () => {
    const video: VideoType[] = await getAllVideos();
    setVideos(video);
    setIsLoaded(true);
  };
  useEffect(() => {
    //! LAGGING THE PAGE RetrieveVideos();
  }, []);
  const content = (
    <div className="my-2">
      <div className="font-bold"> - Profanity filtering system</div>
      <div className="font-bold"> - Profile system</div>
      <div className="font-bold"> - Filmz ADDED </div>
    </div>
  );
  return (
    <div className="grid grid-cols-12 w-full h-full">
      <div className="col-span-3 md:col-span-4 lg:col-span-3 overflow-y-scroll h-[100vh]">
        <VideoController setSelected={setSelected} selected={selected} />
      </div>
      <div className=" col-span-9 md:col-span-8 lg:col-span-6  overflow-y-scroll h-[100vh]">
        {IsLoaded ? (
          <ContentContainer videos={videos} selected={selected} />
        ) : (
          <VideoSkeleton />
        )}
      </div>
      <div className="col-span-3  w-full h-[100vh] lg:block hidden p-2">
        <NewsContainer
          header="Whats Coming!"
          subtitle="Version 2.0"
          content={content}
        />
      </div>
    </div>
  );
}
