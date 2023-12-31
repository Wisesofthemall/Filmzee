import { FirebaseUserType, UserType, VideoType } from "@/types/Types";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const getUserByUniq = async (uniq: string) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("uniq", uniq)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const getUserByLocalId = async (localId: string) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("localId", localId)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};
export const postUser = async (user: FirebaseUserType) => {
  const parsedName = user.email?.split("@")[0];

  try {
    const { data, error } = await supabase
      .from("Users") // Replace 'Users' with the actual name of your table
      .upsert([
        {
          uniq: user.createdAt,
          name: user.displayName || parsedName,
          email: user.email,
          photoUrl: user.photoUrl,
          localId: user.localId,
        },
      ]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const retrieveUser = async (uniq: string, user: FirebaseUserType) => {
  const result = await getUserByUniq(uniq);

  if (!result) {
    await postUser(user);
    const newResult = await getUserByUniq(uniq);

    return newResult;
  }

  return result;
};
export const getUsersByName = async (name: string, username: string) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .ilike("email", `%${name}%`);

    if (error) {
      return [];
    }

    return data.filter((user) => user.name !== username);
  } catch (error) {
    return [];
  }
};

export const editUserById = async (id: number, update: any) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .update(update)
      .eq("localId", id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserChatInfo = async (
  email: string,
  photo: string,
  name: string,
) => {
  try {
    const { data, error } = await supabase
      .from("Chats")
      .update({
        recepientPhoto: photo,
        recepientName: name,
      })
      .eq("recepientEmail", email);

    if (error) {
      console.error("Error updating user data:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in updateUserByEmail function:", error);
    return null;
  }
};
