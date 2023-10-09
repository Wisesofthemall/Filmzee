import { UserType, VideoType } from "@/types/Types";
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
    console.log(data);

    return data;
  } catch (error) {
    return null;
  }
};
export const postUser = async (user: UserType) => {
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

export const retrieveUser = async (uniq: string, user: UserType) => {
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
      .ilike("name", `%${name}%`);

    if (error) {
      return [];
    }

    return data.filter((user) => user.name !== username);
  } catch (error) {
    return [];
  }
};

export const editUserById = async (id: number, update: any) => {
  console.log(id, update);
  try {
    const { data, error } = await supabase
      .from("Users")
      .update(update)
      .eq("localId", id);
    console.log(error);
    if (error) {
      throw error;
    }
    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};
