import { UserType, VideoType } from "@/types/Types";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const getChatByRoomId = async (roomId: string) => {
  try {
    const { data, error } = await supabase
      .from("Chats") // Replace 'Chats' with the actual name of your table
      .select("*")
      .eq("roomId", roomId);

    if (error) {
      console.log("Error Here");
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
) => {
  //const ID = chatId || [senderId, receiverId];
  try {
    console.log("here we go ");
    const { data, error } = await supabase
      .from("Chats") // Replace 'Users' with the actual name of your table
      .upsert([
        {
          userId,
          recepientId,
          recepientUniq,
          recepientName,
          recepientEmail,
          recepientPhoto,
          recepientLocalID,
        },
      ]);

    if (error) {
      console.log("BOOM");
      console.log(error);
      return null;
    }
    console.log("SO it works?");
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
    const chat = await getChatByRoomId(roomId);
    console.log(chat);

    if (!chat || chat.length === 0) {
      await createChat(
        userId,
        recepientId,
        recepientUniq,
        recepientName,
        recepientEmail,
        recepientPhoto,
        recepientLocalID,
      );
    }
    const newChat = await getAllChatsbyID(userId);

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
      console.log("Error Here");
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};
