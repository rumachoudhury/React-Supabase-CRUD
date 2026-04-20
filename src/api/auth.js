import { supabase } from "../supabaseClient";

// 🔹 Sign Up
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Sign up error:", error.message);
    return null;
  }

  return data;
};

// 🔹 Sign In
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Sign in error:", error.message);
    return null;
  }

  return data;
};

// 🔹 Sign Out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error.message);
  }
};

// 🔹 Get Current User
export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Get user error:", error.message);
    return null;
  }

  return user;
};
