const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const app = new Koa();
const routing = require("./routes");
const { param } = require("./routes/home");
const { connectionStr } = require("./config");

mongoose.connect(connectionStr);
mongoose.connection.on("error", console.error);

// try&catch設置 middleware
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(bodyParser());
app.use(parameter(app)); //加入一個app就可以在ctx加入function去驗證
routing(app);
app.listen(3000, () => console.log("port:3000"));
