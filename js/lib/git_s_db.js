var mysql = require('mysql');
var s_db = mysql.createConnection({
  host:'localhost',
  user:'',
  password:'',
  database:''
});
s_db.connect();
module.exports = s_db;
