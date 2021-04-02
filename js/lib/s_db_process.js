/*
<sql injection>
ex.
`SELECT * FROM topic WHERE id=${queryData.id}`쓰면 안된다.

아래처럼 쓸 것!
1. SELECT * FROM topic WHERE id=${db.escape(queryData.id)}`
or
2. db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?`
,[queryData.id], function(error2, topic){...}
);
*/

var qs = require('querystring');
var s_db = require('./s_db');
var fs = require("fs");

//================process mark button data======================================
//================insert mylist, mycontents table==============
exports.insert_myData = function(data){
  s_db.query(`
    INSERT INTO myplace (placeLat, placeLon, placeID, placeTitle, markerid, today, year, month, date, hour, color)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10]],
    function(error,result){
      if(error){
        throw error
      }

  });
  s_db.query(`
    INSERT INTO mycontents (contentsLat, contentsLon, contentsID, contentsTitle, markerid, diary, created)
    VALUES(?, ?, ?, ?, ?, ?, NOW());
    `,
    [data[0], data[1], data[2], data[3], data[4], data[11]],
    function(error,result){
      if(error){
        throw error
      }

  });
}

//================insert mycontents table___image==============
exports.insert_mycontentsImage = function(la, ra, id, title, m_id, name){
  s_db.query(`
    INSERT INTO mycontents (contentsLat, contentsLon, contentsID, contentsTitle, markerid, imageTitle, created)
    VALUES(?, ?, ?, ?, ?, ?, NOW());
    `,
    [la, ra, id, title, m_id, name],
    function(error,result){
      if(error){
        throw error
      }

  });

}

//================update mylcontents table==============
exports.update_mycontentsDiary = function(id, title, text){

  s_db.query(`
    UPDATE mycontents SET diary=? WHERE diary is not NULL and contentsID=? and contentsTitle=?
    `,
    [text, id, title],
    function(error, result){
      if(error){
        throw error
      }
  });

}

//===============delete myplace and mycontents table==============
exports.delete_mycontentsData_marker = function(data){
  console.log(data);
  s_db.query(`
    DELETE FROM myplace WHERE placeID=?
    `,
    [data],
    function(error, result){
      if(error){
        throw error
      }
  });
  s_db.query(`
    DELETE FROM mycontents WHERE contentsID=?
    `,
    [data],
    function(error, result){
      if(error){
        throw error
      }
  });

}

//===============delete mycontents table==============
exports.delete_mycontentsData_list = function(data){
  for(var i = 0; i < data.length; i++){
    console.log(data[i]);
    s_db.query(`
      DELETE FROM mycontents WHERE diary=? or imageTitle=?
      `,
      [data[i],data[i]],
      function(error, result){
        if(error){
          throw error
        }
    });
  }
}

//module.exports = s_db_process;
