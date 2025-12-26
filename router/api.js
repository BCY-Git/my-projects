const express = require("express")
const router = express.Router()
const db = require("../db")
// 添加测试路由
router.get("/test", (req, res) => {
  console.log("测试路由被调用");
  res.send({ message: "测试路由工作正常" });
});

router.get("/movies", (req, res) => {
  let sql = "select * from movies";
  console.log("数据库连接成功");

  db.query(sql, (err, result) => {
    if (err) {
      console.error("SQL查询错误:", err.message);
      res.status(500).send({
        code: 500,
        message: err.message,
        data: []
      })
    } else {
      console.log("查询结果:", result);
      res.send({
        code: 200,
        message: "success",
        data: result
      })
    }
  });

})

module.exports = router