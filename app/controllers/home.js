const path = require("path");
class HomeCtl {
  index(ctx) {
    ctx.body = "這是首頁";
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.filepath);
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
    //`${ctx.origin}`這個是負責顯示圖片路徑前墜local host
  }
}

module.exports = new HomeCtl();
