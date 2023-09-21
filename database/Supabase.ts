import { VideoType } from "@/types/Types";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
console.log(supabaseUrl, supabaseKey);

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const postSingleVideo = async (
  title: string,
  description: string,
  tag: string,
  link: string,
  channelTitle: string,
) => {
  const { data, error } = await supabase.from("Videos").insert([
    {
      title,
      description,
      tag,
      link,
      channelTitle,
    },
  ]);

  if (error) {
    console.log(error);
    return;
  }
  return;
};
export const postVideos = async (videos: any[], tag: string) => {
  for (var i = 0; i < videos.length; i++) {
    const title = videos[i].snippet.title;
    const description = videos[i].snippet.description;
    const hashtag = tag;
    const link = videos[i].id.videoId;
    const channelTitle = videos[i].snippet.channelTitle;
    await postSingleVideo(title, description, hashtag, link, channelTitle);
  }
};

export const getAllVideos = async (): Promise<any[] | []> => {
  const { data, error } = await supabase.from("Videos").select();

  if (error) {
    console.log(error);
    return [];
  }
  return data;
};

export const getVideosByTag = async () => {};
