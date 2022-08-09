import { oak } from "../deps.ts";
import urlDao from "../db/dao/url.ts";

const router = new oak.Router();

router.post("/url", async (ctx) => {
  // read request body
  const body = await ctx.request.body().value;
  if (!body) {
    ctx.response.status = 400;
    return;
  }
  const url = body.url;
  if (typeof url !== "string") {
    ctx.response.status = 400;
    return;
  }
  // validate url
  if (!/^(http|https):\/\/[^ \t]+$/.test(url)) {
    ctx.response.status = 403;
    return;
  }
  // store url
  const key = await urlDao.add(url);
  // response
  ctx.response.body = { key, url };
});

export default router;
