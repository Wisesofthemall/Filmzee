"use client";

import VideoController from "./components/videos/VideoController";
import { useEffect, useState } from "react";
import { getAllVideos } from "@/database/videosCRUD/Supabase";
import { VideoType } from "@/types/Types";
import NewsContainer from "./components/news/NewsContainer";
import ContentContainer from "./components/videos/ContentContainer";
import CommentModal from "./components/modals/CommentModal";
import ImageModal from "./components/modals/ImageModal";

export default function Home() {
  const [IsLoaded, setIsLoaded] = useState(true);
  const [videos, setVideos] = useState<any>([]);
  const [selected, setSelected] = useState("");
  const [filmzId, setFilmzId] = useState("");
  const [image, setImage] = useState("");
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
      <div className="font-bold">- Added Comment Section</div>
      <div className="font-bold"> - Remove Repost Feature</div>
      <div className="font-bold"> - Added Image Expander </div>
      <div className="font-bold"> - Added Delete Filmz Functionality </div>
      <div className="font-bold"> - Added Report Filmz Functionality </div>
      <div className="font-bold"> - Update User Menu </div>
      <div className="font-bold"> - CSS Fix on Main page </div>
      <div className="font-bold"> - Bug Fixes and Optimizations </div>
    </div>
  );
  return (
    <div className="grid grid-cols-12 w-full h-full overflow-x-hidden overflow-y-hidden">
      <ImageModal image={image} setImage={setImage} />
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
            setImage={setImage}
          />
        )}
      </div>
      <div className="col-span-3  w-full h-[100vh] lg:block hidden p-2">
        <NewsContainer
          header="Whats New?"
          subtitle="Version 2.6"
          content={content}
        />
      </div>
    </div>
  );
}
