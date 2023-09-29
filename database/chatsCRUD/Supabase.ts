import { UserType, VideoType } from "@/types/Types";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const getChatByRoomId = async (
  roomId: string,
  recepientEmail: string,
) => {
  try {
    const { data, error } = await supabase
      .from("Chats")
      .select("*")
      .eq("roomId", roomId)
      .eq("recepientEmail", recepientEmail);

    if (error) {
      console.log(error);
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};
export const createChat = async (
  userId: string,
  recepientId: number,
  recepientUniq: string,
  recepientName: string,
  recepientEmail: string,
  recepientPhoto: string,
  recepientLocalID: string,
  roomId: string,
) => {
  try {
    const { data, error } = await supabase.from("Chats").upsert([
      {
        userId,
        recepientId,
        recepientUniq,
        recepientName,
        recepientEmail,
        recepientPhoto,
        recepientLocalID,
        roomId,
      },
    ]);

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const retrieveChat = async (
  userId: string,
  recepientId: number,
  recepientUniq: string,
  recepientName: string,
  recepientEmail: string,
  recepientPhoto: string,
  recepientLocalID: string,
  roomId: string,
) => {
  try {
    console.log(roomId);
    const chat = await getChatByRoomId(userId, recepientEmail);
    console.log("chat", chat);

    if (!chat || chat.length === 0) {
      await createChat(
        userId,
        recepientId,
        recepientUniq,
        recepientName,
        recepientEmail,
        recepientPhoto,
        recepientLocalID,
        roomId,
      );
    }
    console.log(userId);
    console.log(chat);
    const newChat = await getAllChatsbyID(userId);
    console.log("newChat", newChat);

    return newChat;
  } catch (error) {}
};
export const getAllChatsbyID = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("Chats") // Replace 'Chats' with the actual name of your table
      .select("*")
      .eq("userId", userId);

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};
