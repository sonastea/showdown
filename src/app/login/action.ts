"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function validateAuthData(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = authSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  return result.data;
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const validatedData = validateAuthData(formData);
  if ("error" in validatedData) return validatedData;

  const { email, password } = validatedData;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error(error);
    if (error.code === "email_not_confirmed") {
      return { error: "Please confirm your email address" };
    }
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const validatedData = validateAuthData(formData);
  if ("error" in validatedData) return validatedData;

  const { email, password } = validatedData;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
