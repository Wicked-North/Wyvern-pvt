const mysql = require('mysql2')

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "abhra", //change password
    database: "wyvern",
    port: "3306",
    connectTimeout: "15000"
})


module.exports = con.promise();