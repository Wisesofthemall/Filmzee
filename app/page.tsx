"use client";

import VideoController from "./components/videos/VideoController";
import { useEffect, useState } from "react";
import { getAllVideos } from "@/database/videosCRUD/Supabase";
import { VideoType } from "@/types/Types";
import NewsContainer from "./components/news/NewsContainer";
import ContentContainer from "./components/videos/ContentContainer";
import CommentModal from "./components/modals/CommentModal";

export default function Home() {
  const [IsLoaded, setIsLoaded] = useState(true);
  const [videos, setVideos] = useState<any>([]);
  const [selected, setSelected] = useState("");
  const [filmzId, setFilmzId] = useState(
    "b6098ebe-a596-414a-89d2-e2cfb2c16ea2",
  );

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
      <div className="font-bold">- Prevent user to post without logging in</div>
      <div className="font-bold"> - Remove Global Chat Feature</div>
      <div className="font-bold"> - Fix Messaging CSS </div>
      <div className="font-bold"> - Added Edit Profile Modal </div>
      <div className="font-bold"> - Added Mobile-First Approach CSS </div>
      <div className="font-bold"> - Add Images on Filmz </div>
      <div className="font-bold"> - Bug Fixes and Optimizations </div>
    </div>
  );
  return (
    <div className="grid grid-cols-12 w-full h-full overflow-x-hidden overflow-y-hidden">
      <CommentModal filmzId={filmzId} setFilmzId={setFilmzId} />
      <div className="h-fit w-full absolute bottom-0 flex items-end md:relative md:block md:col-span-4 lg:col-span-3">
        <VideoController setSelected={setSelected} selected={selected} />
      </div>
      <div className=" col-span-12 md:col-span-8 lg:col-span-6 md:h-[100vh] overflow-y-scroll h-[100vh] pb-28">
        {IsLoaded && (
          <ContentContainer
            videos={videos}
            selected={selected}
            filmzId={filmzId}
            setFilmzId={setFilmzId}
          />
        )}
      </div>
      <div className="col-span-3  w-full h-[100vh] lg:block hidden p-2">
        <NewsContainer
          header="Whats New?"
          subtitle="Version 2.5"
          content={content}
        />
      </div>
    </div>
  );
}
