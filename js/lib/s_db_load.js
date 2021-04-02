var fs = require('fs');
var qs = require('querystring');

var s_db = require('./s_db');

//==============================================================================
//================get data from mysql===========================================
//let s_id = 'i_s';
//let s_sig;

var myplaceData = [];
var myplace_db_list = ''
var mycontents_db_list = '';
var myplace_db_color  = '';

/*
[test set]
INSERT INTO myplace(placeLat, placeLon, placeID, placeTitle,today,year,month,date,hour,color) VALUES(126.1480697, 33.1032777, "우도(Wed Mar 10 2021 21:00:34)", "우도", "Wed", "2021", "Mar", "10", "21", "#F04084");
INSERT INTO mycontents(contentsLat, contentsLon, contentsID, contentsTitle, markerid, diary, created) VALUES(126, 33, "우도(Wed Mar 10 2021 21:00:34)","우도","lksjvoif2132320efmsdn","우도여행",now());


INSERT INTO myplace(placeLat, placeLon, placeID, placeTitle,today,year,month,date,hour,color) VALUES(93, 32, "제주공항(Wed Mar 10 2021 12:00:34)", "제주공항", "Wed", "2021", "Mar", "10", "21", "#D0123");
INSERT INTO mycontents(contentsLat, contentsLon, contentsID, contentsTitle, markerid, diary, created) VALUES(126, 33, "제주공항(Wed Mar 10 2021 12:00:34)","제주공항","qo321","제주도여행",now());

select contentsLat, contentsLon, contentsID, contentsTitle, mycontents.markerid, imageTitle, diary, created FROM mycontents LEFT JOIN myplace ON myplace.placeTitle = mycontents.contentsTitle WHERE (contentsLat BETWEEN 120 AND 150) AND (contentsLon BETWEEN 1 AND 35);
*/
//================from myplace table==============
exports.get_myplaceData = function(latlow, lathigh, lonlow, lonhigh, response){

 //lat,lon은 거르는용도로사용,넘기지말기
  s_db.query(`
    SELECT placeLat, placeLon, placeID, placeTitle, markerid, today,year,month,date,hour,color FROM myplace WHERE (placeLat BETWEEN ? AND ?) AND (placeLon BETWEEN ? AND ?)
    `
    ,
    [latlow, lathigh, lonlow, lonhigh]
    ,
    function(error, myplaces){

      console.log("get_myplaceData__________________:",myplaces.length,"\n");

      myplace_db_list = '';

      for(var i =0; i < myplaces.length; i++){

        myplace_db_list +=
        `${myplaces[i].placeID}++${myplaces[i].placeTitle}++${myplaces[i].markerid}++${myplaces[i].today}++${myplaces[i].year}++${myplaces[i].month}++${myplaces[i].date}++${myplaces[i].hour}++${myplaces[i].color}++end++`;
      }

      console.log("myplace_db_list:________:",myplace_db_list,"\n");
      response.write(myplace_db_list);
      response.end();
    }
  );
}

//================from mycontents table=========================================
exports.get_mycontentsData = function(latlow, lathigh, lonlow, lonhigh, response){

  console.log("server_____rangelist___________:", latlow, lathigh, lonlow, lonhigh,"\n");

  s_db.query(`
    SELECT contentsID, contentsTitle, mycontents.markerid, imageTitle, diary FROM mycontents LEFT JOIN myplace ON myplace.placeTitle = mycontents.contentsTitle WHERE (contentsLat BETWEEN ? AND ?) AND (contentsLon BETWEEN ? AND ?)
    `
    ,
    [latlow, lathigh, lonlow, lonhigh]
    ,
    function(error, mycontents){

      console.log("get_mycontentsData__________________:",mycontents);//, mycontents.length,"\n");

      mycontents_db_list = '';

      for(var i =0; i < mycontents.length; i++){
      //  mycontents_db_list +=
      //  `<option id="${mycontents[i].contentsLat}++${mycontents[i].contentsLon}++${mycontents[i].contentsID}++${mycontents[i].contentsTitle}++${mycontents[i].imageTitle}++${mycontents[i].diary}++${mycontents[i].created}"></option>`;
        mycontents_db_list +=
        `${mycontents[i].contentsID}++${mycontents[i].contentsTitle}++${mycontents[i].markerid}++${mycontents[i].imageTitle}++${mycontents[i].diary}++end++`;
      }

      console.log("mycontents_db_list:________:",mycontents_db_list,"\n");
      response.write(mycontents_db_list);
      response.end();
      //console.log("mycontents_db_list:________:",mycontents_db_list,"\n");
    }
  );
}

//datelist = [year, month, date];//myplace table에서 키=year+month+date가 같은 데이터의 칼라만 받아오기 //없으면 every color 뿌리기

//SELECT color FROM myplace WHERE year=2021 and month=Apr and date=1;
//SELECT color FROM myplace;
//================from myplace table==============
exports.get_myplaceColor = function(thisyear, thismonth, thisdate, response){


  s_db.query(`SELECT color FROM myplace WHERE year=? and month=? and date=?`,[Number(thisyear), String(thismonth), Number(thisdate)],function(error, origincolor){

    s_db.query(`SELECT color FROM myplace`,function(error, everycolor){

      myplace_db_color = ''

      if (origincolor.length >= 1){

        myplace_db_color = origincolor[0].color;
        console.log("myplace_db_color:________origincolor___1: ",myplace_db_color,"\n");
        response.write(myplace_db_color);
        response.end();
      }else if(origincolor.length === 0){

        for(let i = 0; i < everycolor.length; i++){
          myplace_db_color +=
          `${everycolor[i].color}++end++`;
        }
        console.log("myplace_db_color:________everycolor___1: ",myplace_db_color,"\n");
        response.write(myplace_db_color);
        response.end();
      }

    });
  });
}
