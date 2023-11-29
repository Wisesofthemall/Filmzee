"use client";
//
import MenuController from "./components/videos/MenuController";
import { useEffect, useState } from "react";
import { getAllVideos } from "@/database/videosCRUD/Supabase";
import { VideoType } from "@/types/Types";
import NewsContainer from "./components/news/NewsContainer";
import ContentContainer from "./components/videos/ContentContainer";
import CommentModal from "./components/modals/CommentModal";
import ImageModal from "./components/modals/ImageModal";

export default function Home() {
  const [IsLoaded, setIsLoaded] = useState(true);
  const [videos, setVideos] = useState<VideoType[]>([]);
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
      <div className="font-bold">
        - Owner of groupchat can remove and remove Users
      </div>
      <div className="font-bold">- Owner of groupchat edit the group info</div>
      <div className="font-bold">- Users can delete messages</div>
      <div className="font-bold">
        {" "}
        - Disable /message route on users that are not logged in
      </div>
    </div>
  );
  const test = (
    <div className="my-2">
      <div className="font-bold">Email: test@gmail.com</div>
      <div className="font-bold">Password: 123456</div>
    </div>
  );
  const news = (
    <div className="my-2">
      <div className="font-bold">- ForYou page (full release) </div>
      <div className="font-bold">- Following page (full release) </div>
      <div className="font-bold">- Explore page (full release) </div>
    </div>
  );
  return (
    <div className="grid grid-cols-12 w-full h-full overflow-x-hidden overflow-y-scroll">
      <ImageModal image={image} setImage={setImage} />
      <CommentModal filmzId={filmzId} setFilmzId={setFilmzId} />
      <div className="h-fit w-full fixed bottom-0 flex items-end md:relative md:block md:col-span-4 lg:col-span-3">
        <MenuController setSelected={setSelected} selected={selected} />
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
          subtitle="Version 3.0"
          content={content}
        />
        <NewsContainer
          header="Just testing the App ?"
          subtitle="Dont worry use our testing account"
          content={test}
        />
        <NewsContainer
          header="Whats Coming ?"
          subtitle="What is going to be added!"
          content={news}
        />
      </div>
    </div>
  );
}
