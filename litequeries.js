var sqlite3 = require("sqlite3").verbose();

function queryInsert(db,data,format){
if(format=='xlsx')
{
var stmt = db.prepare("INSERT INTO firstTable VALUES (?,?)");
for(var i=1;i<data.length;i++){
stmt.run(data[i][0],data[i][1]);
}
stmt.finalize();
}
 
 
else if(format=='csv'){

var stmt = db.prepare("INSERT INTO firstTable VALUES (?,?)");
console.log(data[0]);
stmt.run(data[0],data[1]);
//stmt.run("age",);
stmt.finalize();

}
}


exports.queryInsert=queryInsert;