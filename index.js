var express = require('express'),
    cheerio = require('cheerio'),
    fs      = require('fs'),
    request = require('request'),
    app     = express();
var content = "";


app.get('/', function(req, res){
    res.redirect('/scrape');
});

app.get('/scrape', function(req, res){
    request('http://www.imdb.com/chart/top?ref_=nv_mv_250_6', function(err, response, body){
        if (!err && response.statusCode == 200){

            var i=1;
            var $ = cheerio.load(body);
        
            $('.titleColumn').filter(function(){
                var data = $(this);
                content += String(i++) + ". " +  data.children().first().text() + " " + data.children().last().text() + "\r\n";
            });
            fs.writeFile('./imdb.txt', content, function(err){
                if (!err){
                    console.log("File successfuly created");
                    res.send("File successfuly created");
                }
            });
        }
    });
});

app.listen(8000, function(){
    console.log('Running on Port 8000');
});