import { blake3 } from "../util/hash.ts";

// @ts-expect-error use unstable KV API
const kv = await Deno.openKv() as {
  get(key: string[]): Promise<{ key: string[], value: string } | null>
  set(key: string[], value: string): Promise<void>
}

export async function getUrl(key: string) {
  const result = await kv.get(["url", key])
  return result ? result.value : undefined
}

export async function ensureUrl(url: string) {
  let salt = 0;
  while (true) {
    const key = await blake3(url + salt, 4);
    const savedUrl = await getUrl(key);
    if (!savedUrl) {
      kv.set(["url", key], url)
      return key;
    }
    if (savedUrl === url) {
      return key;
    }
    salt++;
  }
}
