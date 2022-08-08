import { oak } from "../deps.ts";
import urlDao from "../dao/url.ts";

const router = new oak.Router();

router.post("/url", async (ctx) => {
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
  const key = await urlDao.add(url);
  ctx.response.body = {
    key,
    url,
  };
});

export default router;
