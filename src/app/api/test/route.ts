import { api } from "src/trpc/server";

export async function GET() {
  const { user } = await api.user.me();

  return new Response(
    JSON.stringify({ user: { id: user?.id, email: user?.email } })
  );
}
