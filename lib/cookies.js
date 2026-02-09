import { cookies } from "next/headers";

const DEFAULT_BACKGROUND = "/vintage1.jpeg";

export function getBackgroundFromCookie() {
  const cookieStore = cookies();
  const savedBg = cookieStore.get("backgroundImage");
  return savedBg?.value || DEFAULT_BACKGROUND;
}
