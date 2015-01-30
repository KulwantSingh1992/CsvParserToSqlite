var sql=require('./sqlite');
var connection;
var queries=require('./litequeries');
var fs=require('fs');
var fsext=require('fs.extra');
var csv = require("fast-csv");

function csvParse(file){
var stream = fs.createReadStream(file);
var db=sql.open();
var count=0;
var csvStream = csv
    .parse()
    .on("data", function(data){
         queries.queryInsert(db,data,'csv');
		// console.log(data);
	count++;
    })
	 .on("end", function(){
	 console.log(count);
	 fsext.remove('./uploaded/first.csv');
         sql.close();
    });

stream.pipe(csvStream);
}

exports.csvParse=csvParse;
