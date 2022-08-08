import { crypto } from "../deps.ts";
import { base64url } from "../deps.ts";

const encoder = new TextEncoder();

export async function blake3(text: string, length: number) {
  const data = new Uint8Array(
    await crypto.subtle.digest(
      "BLAKE3",
      encoder.encode(text),
    ),
  );
  return base64url.encode(data.slice(0, length));
}
