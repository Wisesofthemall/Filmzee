require("dotenv").config();
import { postVideos } from "@/database/videosCRUD/Supabase";
import axios from "axios";

export const getShorts = async (tag: string) => {
  const youtubeAPI = process.env.NEXT_PUBLIC_YOUTUBE_API;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=#${tag}#shorts&type=video&videoDuration=short&key=${youtubeAPI}`;
  try {
    return "response";
  } catch (error) {
    throw error;
  }
};
