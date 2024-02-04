const Koa = require("koa");
const { koaBody } = require("koa-body");
const koaStatic = require("koa-static");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("koa2-cors");
const app = new Koa();
const routing = require("./routes");
const { param } = require("./routes/home");
const { connectionStr } = require("./config");

mongoose.connect(connectionStr);
mongoose.connection.on("error", console.error);

app.use(koaStatic(path.join(__dirname, "public")));
// try&catch設置 middleware
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(cors());
app.use(
  koaBody({
    multipart: true, //啟用文件
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads"), //指定上傳圖片檔案的目錄
      keepExtensions: true, //保留檔案詞墜 .jpg
    },
  })
);
app.use(parameter(app)); //加入一個app就可以在ctx加入function去驗證
routing(app);
app.listen(5501, () => console.log("port:5501"));
