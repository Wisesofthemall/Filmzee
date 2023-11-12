import { MemberType, UserType, VideoType } from "@/types/Types";
import { createClient } from "@supabase/supabase-js";
import { formatISO9075 } from "date-fns";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const getChatByRoomId = async (
  userId: string,
  recepientEmail: string,
) => {
  try {
    const { data, error } = await supabase
      .from("Chats")
      .select("*")
      .eq("userId", userId)
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
  userId?: string,
  recepientId?: number,
  recepientUniq?: string,
  recepientName?: string,
  recepientEmail?: string,
  recepientPhoto?: string,
  recepientLocalID?: string,
  roomId?: string,
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
      console.log(error);
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const retrieveChat = async (
  userLocalID: string,
  userId: number,
  userUniq: string,
  userName: string,
  userEmail: string,
  userPhoto: string,
  recepientId: number,
  recepientUniq: string,
  recepientName: string,
  recepientEmail: string,
  recepientPhoto: string,
  recepientLocalID: string,
  roomId: string,
) => {
  try {
    const chat = await getChatByRoomId(userLocalID, recepientEmail);
    const secondChat = await getChatByRoomId(recepientLocalID, userEmail);

    if (!chat || chat.length === 0) {
      await createChat(
        userLocalID,
        recepientId,
        recepientUniq,
        recepientName,
        recepientEmail,
        recepientPhoto,
        recepientLocalID,
        roomId,
      );
    }
    if (!secondChat || secondChat.length === 0) {
      await createChat(
        recepientLocalID,
        userId,
        userUniq,
        userName,
        userEmail,
        userPhoto,
        userLocalID,
        roomId,
      );
    }

    const newChat = await getAllChatsbyID(userLocalID);

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

export const createGroupChat = async (
  membersIds: MemberType[],
  groupName: string,
  groupPhoto: string,
  roomId: string,
  uniq: string,
) => {
  for (var i = 0; i < membersIds.length; i++) {
    await createChat(
      membersIds[i].localId,
      undefined,
      uniq,
      groupName,
      groupName.replace(/\s/g, ""),
      groupPhoto,
      undefined,
      roomId,
    );
  }
  return;
};
