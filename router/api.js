const express = require("express")
const router = express.Router()
const { db } = require("../db")
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

router.post("/movies", (req, res) => { 
  const sql = "insert into movies (movie_name, release_year, rating, rater_count, director, movie_type, timing) values ( ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    req.body.movie_name || '',
    req.body.release_year || null,
    req.body.rating || null,
    req.body.rater_count || null,
    req.body.director || '',
    req.body.movie_type || '',
    req.body.timing || ''
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("新增电影SQL错误:", err.message);
      return res.status(500).send({
        code: 500,
        message: "新增电影失败：" + err.message,
        data: []
      });
    }
    res.send({
      code: 200,
      message: "新增电影成功",
      data: { id: result.insertId }
    });
  });
})

router.get("/movies/:id", (req, res) => { 
  const sql = "select * from movies where id = ?";
  const params = [req.params.id || null];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("查询电影SQL错误:", err.message);
      return res.status(500).send({
        code: 500,
        message: "查询电影失败：" + err.message,
        data: []
      });
    }
    res.send({
      code: 200,
      message: "查询电影成功",
      data: result[0] || {}
    });
  });
})

router.put("/movies/:id", (req, res) => { 
  const sql = "update movies set movie_name = ?, release_year = ?, rating = ?, rater_count = ?, director = ?, movie_type = ?, timing = ? where id = ?";
  const params = [
    req.body.movie_name || '',
    req.body.release_year || null,
    req.body.rating || null,
    req.body.rater_count || null,
    req.body.director || '',
    req.body.movie_type || '',
    req.body.timing || '',
    req.params.id || null
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("更新电影SQL错误:", err.message);
      return res.status(500).send({
        code: 500,
        message: "更新电影失败：" + err.message,
        data: []
      });
    }
    res.send({
      code: 200,
      message: "更新电影成功",
      data: { id: req.params.id }
    });
  });
})


module.exports = router
