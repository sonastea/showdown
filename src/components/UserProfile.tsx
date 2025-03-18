import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export async function getUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export default async function UserProfile() {
  const user = await getUserProfile();

  if (!user) {
    return (
      <div className="text-center p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-300">Not signed in</p>
      </div>
    );
  }

  return (
    <div className="text-center p-4 bg-gray-800 rounded-lg">
      <div className="mb-2">
        <Image
          src={user.user_metadata?.avatar_url || "/default_avatar.png"}
          alt="User avatar"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full mx-auto"
        />
      </div>
      <p className="text-white font-medium">
        {user.user_metadata?.name || user.email}
      </p>
      <p className="text-gray-400 text-sm">{user.email}</p>
    </div>
  );
}
