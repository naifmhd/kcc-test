import { cacheLife } from "next/cache";

// Cached so the page stays fully prerendered. The year refreshes at most daily.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
