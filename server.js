var formidable = require('formidable'), http = require('http'), util = require('util');
var excel=require('./excelserver');

var fs=require('fs.extra');
var csv=require('./csvserver')
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
	console.log(req.url);
    var form = new formidable.IncomingForm();

	    form.parse(req, function(err, fields, files) {
	      res.writeHead(200, {'content-type': 'text/plain'});
	      res.write('Received upload:\n\n');
		//  excel.excel(util.inspect(files['upload']['path']));
	        res.end(util.inspect(files['upload']['path']));
			if(fields['format']=='csv'){
			fs.copy(files['upload']['path'], './uploaded/first.csv', { replace: false }, function (err) {
  if (err) {
    // i.e. file already exists or can't write to directory
    throw err;}
	else {
	csv.csvParse('./uploaded/first.csv');
	}
  
			 });
		//	 
	    }
			
			else if(fields['format']=='xlsx'){
			fs.copy(files['upload']['path'], './uploaded/first.xlsx', { replace: false }, function (err) {
  if (err) {
    // i.e. file already exists or can't write to directory
    throw err;}
	else {
	excel.excel('./uploaded/first.xlsx');
    fs.remove('./uploaded/first.xlsx');
     }
			 });
			 }
		//	 
	    });
	

    return;}
  

  	// 	show a file upload form
	  res.writeHead(200, {'content-type': 'text/html'});
	  res.end(
	    '<!DOCTYPE html><html><head></head><body><form action="/upload" enctype="multipart/form-data" method="post">'+
	    '<input type="radio" name="format" value="xlsx">xlsx<br>'+
        '<input type="radio" name="format" value="csv">csv<br>'+
		'<input type="file" name="upload" multiple="multiple"><br>'+
		'<input type="submit" value="Upload">'+
	    '</form></body></html>'
	  );
  }).listen(8888);