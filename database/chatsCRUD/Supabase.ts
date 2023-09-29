import { UserType, VideoType } from "@/types/Types";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const getChatByID = async (senderId: number) => {
  // Return arrays of the chat base on ID
  //OR Returns null
  try {
    const { data, error } = await supabase
      .from("Chats") // Replace 'Chats' with the actual name of your table
      .select("*")
      .filter("chatId", "contains", senderId);

    if (error) {
      console.log("Error Here", error);
      return null;
    }

    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
};

export const getChatBySenderId = async (senderId: number) => {
  try {
    const { data, error } = await supabase
      .from("Chats") // Replace 'Chats' with the actual name of your table
      .select("*")
      .filter("chatId", "contains", senderId);

    if (error) {
      console.log("Error Here", error);
      return null;
    }
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
};
export const createChat = async (
  chatId: number,
  senderId: number,
  receiverId: number,
) => {
  const ID = chatId || [senderId, receiverId];
  try {
    const { data, error } = await supabase
      .from("Chats") // Replace 'Users' with the actual name of your table
      .upsert([
        {
          chatId: ID,
          receiverId: receiverId,
          senderId: senderId,
        },
      ]);

    if (error) {
      console.log("BOOM");
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getChatsByUserIds = async (
  senderId: number,
  recevierId: number,
) => {
  try {
    const { data, error } = await supabase
      .from("Chats") // Replace 'Chats' with the actual name of your table
      .select("*")
      .eq("senderId", senderId);

    if (error) {
      console.log("Error Here");
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};
export const retrieveChat = async (
  chatId: any,
  senderId: number,
  receiverId: number,
) => {
  const result = await getChatByID(senderId);
  console.log(result);
  if (!result) {
    await createChat(chatId, senderId, receiverId);

    const newResult = await getChatByID(senderId);
    return newResult;
  }

  return result;
};

export const getAllChatsbySenderId = async (senderId: number) => {
  try {
    const { data, error } = await supabase
      .from("Chats") // Replace 'Chats' with the actual name of your table
      .select("*")
      .eq("senderId", senderId);

    if (error) {
      console.log("Error Here");
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};
