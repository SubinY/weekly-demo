const express = require('express');
const path = require('path');
const routes = require('./src/routes');

const app = express();

// 设置模板全局常量
app.locals.blog = {
    title: "查询四级地址",
    description: "详细地址查询四级地址"
}

// 设置模板目录
app.set('views', path.join(__dirname, 'src/views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'src/public')))

routes(app);

// 监听端口，启动程序
app.listen("4000", function () {
    console.log(`app listening on port 4000`)
})