const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const { db } = require("./db");


const originsFromEnv = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const allowList = originsFromEnv.length ? originsFromEnv : ['http://localhost:5173', 'http://localhost:5175'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 导入API路由
const apiRouter = require("./router/api")
const dkRouter = require("./router/Dk-Web/thinking")
const publishRouter = require("./router/Dk-Web/publish")
app.use("/api", apiRouter)
app.use("/api/v1", apiRouter)
app.use("/api", dkRouter)
app.use("/api/v1", dkRouter)
app.use("/api", publishRouter)
app.use("/api/v1", publishRouter)

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

app.use("/api", function (req, res, next) {
  return res.status(404).send({ code: 404, message: "Not Found", data: [] });
});

app.use(function (err, req, res, next) {
  console.error("全局错误:", err && err.message ? err.message : err);
  return res.status(500).send({ code: 500, message: err && err.message ? err.message : "Internal Server Error", data: [] });
});

app.listen(port, '0.0.0.0', function () {
    // 打印提示时，补充本机的局域网IP（方便其他设备访问）
    // 可选：自动获取本机局域网IP（下面会讲）
    console.log(`服务启动成功！
    - 本机访问：http://localhost:${port}
    - 局域网访问：http://172.24.224.1:${port}`);
});
