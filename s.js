var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');

var s_db = require('./js/lib/s_db');
var db_load = require('./js/lib/s_db_load.js');
var db_process = require('./js/lib/s_db_process.js');
var s_iframe = require('./js/iframe.js');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    var DATA_HTML;// = db_load.get_dataHtml();


    path = decodeURIComponent(path);
    //console.log(url.parse(_url, true),'queryData:',queryData,'pathname:',pathname); //url info
    //console.log("path:",path);

    if(_url === '/'){
      _url = '/iframe.html';

    }
    if(request.url === '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    if(pathname === '/top.html'){
      //response.write(DATA_HTML);
    }
    if(request.method === "POST"){
      console.log("POST_event___________",);

      request.on('data', function(data){

        var data = JSON.parse(data);

      //  console.log("data:", data, data.length, "\n");
      //  console.log(data.id, data.sig, data.contents);

        //================i_contents==============
        if(data.id === "i_mymap" && data.sig === "get_placedb"){
          console.log("i_mymap_____get_placedb");
          DATA_HTML = db_load.get_myplaceData(data.contents[0],data.contents[1],data.contents[2],data.contents[3],response);
          //response,DATA_HTML;
          //response.write(DATA_HTML);
          //response.end(fs.readFileSync(decodeURIComponent(__dirname + _url)));
        }
        else if(data.id === "i_mymap" && data.sig === "get_contentsdb"){
          console.log("i_mymap_____get_contentsdb");
          DATA_HTML = db_load.get_mycontentsData(data.contents[0],data.contents[1],data.contents[2],data.contents[3],response);
        }
        else if(data.id === "i_mymap" && data.sig === "get_dateColor"){
            //datelist = [year, month, date];//myplace table에서 키=year+month+date가 같은 데이터의 칼라만 받아오기
          console.log("i_mymap_____get_dateColor");
          DATA_HTML = db_load.get_myplaceColor(data.contents[0],data.contents[1],data.contents[2],response);
        }
        else if(data.id === "i_mymap" && data.sig === "create_marker"){
          console.log("i_mymap_____create_marker");
          db_process.insert_myData(data.contents);
        }
        else if(data.id === "i_contents" && data.sig === "insert_image"){
          console.log("i_contents_____insert_image\n");
        //  console.log(data.contents[0],data.contents[1]);
          db_process.insert_mycontentsImage(data.contents[0],data.contents[1],data.contents[2],data.contents[3],data.contents[4],data.contents[5]);
          response.end(fs.readFileSync(decodeURIComponent(__dirname + _url)));
        }
        else if(data.id === "i_contents" && data.sig === "delete_mycontents_marker"){
          console.log("i_contents_____delete_mycontents_marker");
          db_process.delete_mycontentsData_marker(data.contents);
        }
        else if(data.id === "i_contents" && data.sig === "delete_mycontents_list"){
          console.log("i_contents_____delete_mycontents_list");
          db_process.delete_mycontentsData_list(data.contents);
        }
        else if(data.id === "i_contents" && data.sig === "edit_diary"){
          console.log("i_contents_____edit_diary\n");
        //  console.log(data.contents[0],data.contents[1]);
          db_process.update_mycontentsDiary(data.contents[0],data.contents[1],data.contents[2]);
        }

      });
    }
//  response.writeHead(200);

    else{
      response.end(fs.readFileSync(decodeURIComponent(__dirname + _url)));
    }


});

app.listen(3000);
