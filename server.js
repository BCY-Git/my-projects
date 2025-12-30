// //node的http模块搭建的后端的服务
// const http = require("http"); 
// const server = http.createServer(function(req,res){
//     res.statusCode = 200;
//     res.setHeader ("Content-Type","text/html")
//     res.end("<h1>Hello World</h1>") //给客户端返回数据就是：res.end("数据")
// })


const express = require("express");
const app = express();
const port = 3000;
//-----中间件-----
// function middleware(req, res, next) {
//     console.log("中间件执行了")
//     next()
// }
// app.use(middleware)

// ----中间件----
// function logger(req, res, next) {
//     const time = new Date()
//     console.log(`[${time.toLocaleString}] ${req.method} ${req.url}`);

//     console.log("请求被记录了")
//     next()
// }
// app.use(logger)

// 导入API路由
const apiRouter = require("./router/api")
app.use("/api", apiRouter)

app.get("/movies", function (req, res) {
    const sql = "SELECT * FROM movies";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("查询失败:", err.message);
        } else {
            res.send({
                code: 200,
                message: "success",
                data: result
            });
        }
    });
})

app.listen(port, function () {
    console.log(`服务启动成功运行在 http://localhost:${port}`);
})