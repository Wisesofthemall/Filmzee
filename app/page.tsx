import Image from "next/image";
import VideoSkeleton from "./components/videos/VideoSkeleton";

export default function Home() {
  return (
    <div className="grid grid-cols-8 w-full h-full">
      <div className="col-span-1 bg-red-600">e</div>
      <div className="col-span-7 bg-white">
        <VideoSkeleton />
      </div>
    </div>
  );
}
