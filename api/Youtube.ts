require("dotenv").config();
import axios from "axios";
export const getShorts = async (tags: string) => {
  const youtubeAPI = process.env.YOUTUBE_API;
  console.log("youtubeAPI", youtubeAPI);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${tags}&type=video&videoType=short&key=${youtubeAPI}`;
  const response = await axios.get(url);
};
