
var fs = require("fs");
var file = "nodejs.db";
var exists = fs.existsSync(file);
var sqlite3 ;
var db ;

function open(){
sqlite3 = require("sqlite3").verbose();
 db = new sqlite3.Database(file);
db.serialize(function() {
    if(!exists) {
    db.run("CREATE TABLE firstTable (name varchar(20),age int)");
  }
  
});
return db;
}

function close(){
db.close();
}

exports.open=open;
exports.close=close;
