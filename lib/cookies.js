import { cookies } from "next/headers";

const DEFAULT_BACKGROUND = "/vintage1.jpeg";

export async function getBackgroundFromCookie() {
  const cookieStore = await cookies();
  const savedBg = cookieStore.get("backgroundImage");
  return savedBg?.value || DEFAULT_BACKGROUND;
}
