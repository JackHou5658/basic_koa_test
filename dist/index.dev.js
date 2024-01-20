"use strict";

var Koa = require("koa");

var Router = require("koa-router");

var app = new Koa();
var router = new Router();
var userRouter = new Router({
  prefix: "/users"
}); // const auth = async (ctx, next) => {
//   if (ctx.url !== "/users") {
//     多中間件的用法
//     ctx.throw(401);
//   }
//   await next();
// };

router.get("/", function (ctx) {
  ctx.body = "這是首頁";
});
userRouter.get("/", function (ctx) {
  ctx.body = [{
    name: "jack"
  }, {
    name: "Ada"
  }];
});
userRouter.post("/", function (ctx) {
  ctx.body = {
    name: "jack2"
  };
});
userRouter.get("/:id", function (ctx) {
  ctx.body = "\u9019\u662F\u7528\u6236".concat(ctx.params.id);
});
app.use(router.routes());
app.use(userRouter.routes()); //有新宣告的物件需要註冊

app.use(userRouter.allowedMethods());
app.listen(3000);