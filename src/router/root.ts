import { oak } from "../deps.ts";
import { getUrl } from "../dao/url.ts";
import apiRouter from "./api.ts";

const router = new oak.Router();

router.use("/api", apiRouter.routes(), apiRouter.allowedMethods());

router.get("/:key", async (ctx) => {
  const key = ctx.params["key"];
  if (!key) {
    ctx.response.status = 400;
    return;
  }
  const url = await getUrl(key);
  if (!url) {
    ctx.response.status = 404;
    return;
  }
  ctx.response.status = 301;
  ctx.response.redirect(url);
});

export default router;
