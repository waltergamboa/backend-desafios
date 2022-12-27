import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  ejsEngine,
  oakAdapter,
  viewEngine,
} from "https://deno.land/x/view_engine@v10.5.1/mod.ts";

const router = new Router();
const colors = [];

const app = new Application();

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./public/views",
  })
);

router
  .post("/", async (ctx) => {
    const body = ctx.request.body({ type: "form" });
    const value = body.value;
    const color = (await value).get("color");
    colors.push(color);
    ctx.response.redirect("/");
  })
  .get("/", (ctx) => {
    ctx.render("index.ejs", { colors });
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });