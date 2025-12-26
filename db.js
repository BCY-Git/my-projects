const mysql = require("mysql2")
//创建数据库对象
const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "douban"
})

// 测试连接
db.connect((err) => {
    if (err) {
        console.error("数据库连接失败:", err.message);
        return;
    }
    console.log("数据库连接成功");
});

module.exports = db