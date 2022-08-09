export * as oak from "https://deno.land/x/oak@v10.6.0/mod.ts";

export { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

export * as colors from "https://deno.land/std@0.151.0/fmt/colors.ts";

export { crypto } from "https://deno.land/std@0.151.0/crypto/mod.ts";

export * as base64url from "https://deno.land/std@0.151.0/encoding/base64url.ts";

import { config as _config } from "https://deno.land/std@0.151.0/dotenv/mod.ts";
export const config = await _config();

export {
  Collection,
  MongoClient,
} from "https://deno.land/x/mongo@v0.31.0/mod.ts";
