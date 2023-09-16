import Image from "next/image";
import VideoSkeleton from "./components/videos/VideoSkeleton";
import VideoController from "./components/videos/VideoController";

export default function Home() {
  return (
    <div className="grid grid-cols-8 w-full h-full">
      <div className="col-span-2 overflow-y-scroll h-[100vh]">
        <VideoController />
      </div>
      <div className="col-span-6  overflow-y-scroll h-[100vh]">
        <VideoSkeleton />
      </div>
    </div>
  );
}
