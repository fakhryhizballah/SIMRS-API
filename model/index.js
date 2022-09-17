var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});


con.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    
    console.log("My SQL Connected!");
    console.log('connected as id ' + con.threadId);
  });
module.exports = {
    con,
}