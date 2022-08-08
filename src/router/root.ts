import { oak } from "../deps.ts";
import urlDao from "../dao/url.ts";
import apiRouter from "./api.ts";

const router = new oak.Router();

router.use("/api", apiRouter.routes(), apiRouter.allowedMethods());

router.get("/:key", (ctx) => {
  const key = ctx.params["key"];
  if (!key) {
    ctx.response.status = 400;
    return;
  }
  const url = urlDao.get(key);
  if (!url) {
    ctx.response.status = 404;
    return;
  }
  ctx.response.redirect(url);
});

export default router;
