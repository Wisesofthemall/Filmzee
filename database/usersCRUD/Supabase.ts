import { UserType, VideoType } from "@/types/Types";
import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export const getUserByUniq = async (uniq: string) => {
  try {
    const { data, error } = await supabase
      .from("Users") // Replace 'Users' with the actual name of your table
      .select("*")
      .eq("uniq", uniq)
      .single();

    if (error) {
      console.log(error);
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const postUser = async (user: UserType) => {
  try {
    const { data, error } = await supabase
      .from("Users") // Replace 'Users' with the actual name of your table
      .upsert([
        {
          uniq: user.createdAt,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
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
    const Post = await postUser(user);
    const newResult = await getUserByUniq(uniq);
    return newResult;
  }
  console.log(result);
  return result;
};
export const getUsersByName = async (name: string) => {
  try {
    const { data, error } = await supabase
      .from("Users") // Replace 'Users' with the actual name of your table
      .select("*")
      .ilike("name", `%${name}%`);

    if (error) {
      console.log(error);
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
};
