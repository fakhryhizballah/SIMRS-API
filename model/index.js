// var mysql      = require('mysql');
// var con = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'test'
// });


// con.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }

//     console.log("My SQL Connected!");
//     console.log('connected as id ' + con.threadId);
//   });
// module.exports = {
//     con,
// }

const mariadb = require('mariadb');
const con = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  bigIntAsNumber: true,
  decimalAsNumber: true,
  bigIntAsNumber: true
});

const conn = async function () {
  return await pool.getConnection();
}

module.exports = {
    con,
  conn
}