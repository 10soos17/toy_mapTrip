let iframe_id = "i_iframe";
let iframe_sig;

//=============================date & time======================================
//https://www.w3schools.com/js/js_date_methods.asp
//Date(year, month, day, hours, minutes, seconds, milliseconds)
// ex. new Date(2018, 11, 24, 10, 33, 30, 0);
//(날짜만)dt.toDateString();
//(시간)dt.toISOString();// dt.toString();//dt.toUTCString();

/*var dt = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

yy = dt.getFullYear();
mm = months[dt.getMonth()];
dd = dt.getDate();

day = days[dt.getDay()];

h = dt.getHours();
m = dt.getMinutes();
s = dt.getSeconds();

var dtText = day + ", " + mm + " " + dd + ", " + yy + " " + h + ":" + m + ":" + s
*/
function get_datetime(){
  var dt = new Date();
  document.getElementById("datetime").innerHTML = dt.toString();//dt.toUTCString();//dtText;
  return dt;
}
//#selectPlace color: rgb(0, 250, 235); border-color:rgb(0, 250, 235); background-color: rgb(25, 11, 10);
//================================color=========================================
//deepbrown //wins & editbtntext color & droptext color
var Wins = {
  set_color:function(color){

  },

  set_backgroundColor:function(color){
    //iframe.css
    $('body').css("background-color",color);
    $('html').css("background-color",color);
    $('.popup').css("background-color",color);
    $('.popup-content').css("background-color",color);
    $('.popup-upload-image').css("background-color",color);
    $('.popup-image').css("background-color",color);
    $('.popup-image-content').css("background-color",color);
    $('#choosePopupBtn').css("background-color",color);
    $('#deletePopupBtn').css("background-color",color);
    $('#imagePopupLabel').css("background-color",color);
    $('#uploadPopupBtn').css("background-color",color);
    //mymap.class
    $("#center").contents().find('#showBtn').css("background-color",color);
    $("#center").contents().find('#searchBtn').css("background-color",color);
    $("#center").contents().find('#selectPlace').css("background-color",color);

  }
};

//white //songbtnText & slider & dropbtn hover 2
var Texts = {
  set_color:function(color){
    //parent iframe.css
    $('body').css("color",color);
    //mymap.class
    $("#center").contents().find('#searchHolder').css("color",color);


  },

  set_backgroundColor:function(color){
    //parent->iframe.html
    //parent menu.class
    $('.dropdown-content a:hover').css("background-color",color);
    $('.dropdown:hover .dropbtn').css("background-color",color);

  }
};
//shinegreen //box & datetime text & i_top button texts & slider rectangle obj & colorchaneBtn
var Boxs = {
  set_color:function(color){
    //iframe.css
    $('#datetime').css("color",color);
    $('#changeColorBtn').css("color",color);
    $('#colorBtn').css("color",color);
    $('#closePopup').css("color",color);
    $('.popup_db_title').css("color",color);
    $('.popup_db_diary').css("color",color);
    $('.popup_db_list').css("color",color);
    $('.popup_db_checkbox').css("color",color);
    $('#choosePopupBtn').css("color",color);
    $('#deletePopupBtn').css("color",color);
    $('#imagePopupLabel').css("color",color);
    $('#uploadPopupBtn').css("color",color);
    //mymap.css
    $("#center").contents().find('#showBtn').css("color",color);
    $("#center").contents().find('#searchBtn').css("color",color);
    $("#center").contents().find('#selectPlace').css("color",color);
  },

  set_backgroundColor:function(color){
    //parent menu.css
    $('.dropbtn').css("background-color",color);
    $('.dropdown').css("background-color",color);
    $('.dropdown-content').css("background-color",color);

  },
  set_borderColor:function(color){
    //iframe.css
    $('.popup-content').css("border-color",color);
    $('.popup-upload-image').css("border-color",color);
    $('.popup-image-content').css("border-color",color);
    $('#choosePopupBtn').css("border-color",color);
    $('#deletePopupBtn').css("border-color",color);
    $('#imagePopupLabel').css("border-color",color);
    $('#uploadPopupBtn').css("border-color",color);

  }

};

var Invisible = {
  set_color:function(color){

  },

  set_backgroundColor:function(color){
    //parent iframe.html
    $('#changeColorBtn').css("background-color",color);
    $('#colorBtn').css("background-color",color);
  }
};

var invisible = 'rgb(0, 0, 0, 0)';

var white = 'rgb(255, 255, 255)';
var black = 'rgb(0, 0, 0)';
var lightgray = 'rgb(220, 220, 220)';
var middlegray = 'rgb(200, 200, 200)';
var deepgray = 'rgb(105, 105, 105)';

var deepbrown = 'rgb(25, 11, 10)';
var deepgreen = 'rgb(47, 79, 79)';
var shinegreen = 'rgb(0, 250, 235)';

var pastelpink = 'rgb(193, 147, 145)';//rgb(188, 143, 143)
var red = 'rgb(128, 0, 0)';
var pinkred = 'rgb(165, 42, 42)';
var shinered = 'rgb(220, 20, 60)';

let iceBlack = [deepbrown,white,shinegreen];
let iceRed = [pinkred,white,shinegreen];
let shineDeepgreen = [deepgreen,white,shinered];
let shinegreenRed = [shinered,white,shinegreen];
let grayPink =[middlegray,white,pastelpink];
let pinkGray =[pastelpink,lightgray,middlegray];

let i_color = iceBlack;
let before_i_color = i_color;
let colorBtnId;

//================================color function================================
function check_btnColor(){


  let stopbtn_color = $('#top').contents().find('#stop');
  let pausebtn_color = $('#top').contents().find('#pause');

  if (pausebtn_color.css("color") === before_i_color[1]){
    stopbtn_color.css("color", i_color[1]);
    pausebtn_color.css("color", i_color[1]);
  } else if (stopbtn_color.css("color") === before_i_color[1]){
    stopbtn_color.css("color", i_color[1]);
  }
//  console.log("before_i_color",before_i_color,"i_color:",i_color);
}

function select_color(self){

  colorBtnId = $("#colorBtn option:selected").attr('id');
  before_i_color = i_color;

  //console.log("colorBtnId:",colorBtnId);

  switch (colorBtnId) {

    case 'iceBlackBtn':
      i_color = iceBlack;
      console.log("colorBtnId:",colorBtnId);
      Wins.set_color(i_color[0]);
      Wins.set_backgroundColor(i_color[0]);

      Texts.set_color(i_color[1]);
      Texts.set_backgroundColor(i_color[1]);

      Boxs.set_color(i_color[2]);
      Boxs.set_backgroundColor(i_color[2]);
      Boxs.set_borderColor(i_color[2]);
      //check_btnColor();
      break;


    case 'iceRedBtn':
      i_color = iceRed;
      console.log("colorBtnId:",colorBtnId);
      Wins.set_color(i_color[0]);
      Wins.set_backgroundColor(i_color[0]);

      Texts.set_color(i_color[1]);
      Texts.set_backgroundColor(i_color[1]);

      Boxs.set_color(i_color[2]);
      Boxs.set_backgroundColor(i_color[2]);
      Boxs.set_borderColor(i_color[2]);
      //check_btnColor();
      break;

    case 'shineDeepgreenBtn':
      i_color = shineDeepgreen;
      console.log("colorBtnId:",colorBtnId);
      Wins.set_color(i_color[0]);
      Wins.set_backgroundColor(i_color[0]);

      Texts.set_color(i_color[1]);
      Texts.set_backgroundColor(i_color[1]);

      Boxs.set_color(i_color[2]);
      Boxs.set_backgroundColor(i_color[2]);
      Boxs.set_borderColor(i_color[2]);
      //check_btnColor();
      break;

    case 'shinegreenRedBtn':
      i_color = shinegreenRed;
      console.log("colorBtnId:",colorBtnId);
      Wins.set_color(i_color[0]);
      Wins.set_backgroundColor(i_color[0]);

      Texts.set_color(i_color[1]);
      Texts.set_backgroundColor(i_color[1]);

      Boxs.set_color(i_color[2]);
      Boxs.set_backgroundColor(i_color[2]);
      Boxs.set_borderColor(i_color[2]);
      //check_btnColor();
      break;

    case 'grayPinkBtn':
      i_color = grayPink;
      console.log("colorBtnId:",colorBtnId);
      Wins.set_color(i_color[0]);
      Wins.set_backgroundColor(i_color[0]);

      Texts.set_color(i_color[1]);
      Texts.set_backgroundColor(i_color[1]);

      Boxs.set_color(i_color[2]);
      Boxs.set_backgroundColor(i_color[2]);
      Boxs.set_borderColor(i_color[2]);
    //  check_btnColor();
      break;

    case 'pinkGrayBtn':
      i_color = pinkGray;
      console.log("colorBtnId:",colorBtnId);
      Wins.set_color(i_color[0]);
      Wins.set_backgroundColor(i_color[0]);

      Texts.set_color(i_color[1]);
      Texts.set_backgroundColor(i_color[1]);

      Boxs.set_color(i_color[2]);
      Boxs.set_backgroundColor(i_color[2]);
      Boxs.set_borderColor(i_color[2]);
      //check_btnColor();
      break;

  }
}

//========================[about popupmymap]====================================
//==============================================================================
//==============================================================================
//==============================================================================
//========================1.popup(mymap.html marker click->iframe.html)=========

//======================== marker data form_popupID(myname,contentbtn,checkbox)
//let mypopupDic = {};//get data from mysql
let mypopupDic = {};

function popupID(myname,contentbtn,checkbox) {

  this.myname = myname;
  this.contentbtn = contentbtn;
  this.checkbox = checkbox;

}

//======================== marker click function(popup) <- iframe.html <- mymap.js(function popupMarker)
function popup_showMycontents(info){
  console.log("popup_showMycontents_markerid:",info);
  //sql markerid로 찾기(ex. 우도(Wed Mar 10 2021 21:00:34)

  let thisContentsLa = info[0];
  let thisContentsRa = info[1];
  let thisId = info[2]; //ex. 우도(Wed Mar 10 2021 21:00:34
  let thisPlacetitle = info[3]; //ex. 우도
  let thismarkerId = info[4];
  let thisImageTitles = info[5];
  let thisDiary = info[6];
  let thisToday = info[7];
  let thisYear = info[8];
  let thisMonth = info[9];
  let thisDate = info[10];
  let thisHour = info[11];
  let imageUrls = info[12];



  //btn color 때문에 설정
  var bColor =  $("#imagePopupLabel").css('color');
  var popupList = $('#popup_mylist');

  mypopupDic={};
  popupList.empty();

  //contents_title
  contentbtn=`<input type="button" class = "popup_db_title" id="${thisContentsLa}++${thisContentsRa}++${thismarkerId}++${thisId}"
              value="${thisPlacetitle.trim()}_${thisYear}/${thisMonth}/${thisDate}" style="color:${bColor}"></input>`;//style="color:${bColor}"

  checkbox = `<input type="checkbox" class = "popup_db_checkbox" id="${thisId}+checkbox"
              style="display:none;"></input></br>`;

  popupList.append(contentbtn);

  popupList.append(checkbox);


  //contents_diary
  myname = `${thisId}_${0}`;

  contentbtn=`<textarea class="popup_db_diary" id="${thisId}_${thisDiary}+contentbtn"
              onchange="edit_diary(this);" style="color:${bColor}">${thisDiary}</textarea>`//cols="40" rows="8" readonly="readonly"

  checkbox = `<input type="checkbox" class = "popup_db_checkbox" id="${thisId}_${thisDiary}+checkbox"
              onclick="get_checked();" style="display:none;"></input></br>`;

  popupList.append(contentbtn);
  contentbtnId = $('#popup_mylist').children("input:last").attr("id");

  popupList.append(checkbox);
  checkboxId = $('#popup_mylist').children("input:last").attr("id");


  var MypopupId = new popupID(myname,contentbtnId,checkboxId);
  mypopupDic[myname] = MypopupId;


  //contents_images
  //<input type="image" src="http://placehold.it/50x50?text=click" alt="click" width="50" height="50">
  for(var i = 0; i < thisImageTitles.length; i++){

    let myname = `${thisId}_${1+i}`;
    let imageName = thisImageTitles[i];

    let imageUrl = imageUrls[i];

    console.log("url____:",imageUrl);

    let contentbtn = `<img class = "popup_db_list" id="${thisId}++==++${imageName}"
                      src="" alt="${imageName}" onclick="show_image(this);">`;// width="50px"height="200px">`;sizes="(max-width: 600px) 200px, 50vw">

    popupList.append(contentbtn);
    contentbtnId = $('#popup_mylist').children("input:last").attr("id");
    //base64_encode(`${srcData}`]);
    document.getElementById(`${thisId}++==++${imageName}`).src = imageUrl;

    checkbox = `<input type="checkbox" class = "popup_db_checkbox" id="${thisId}++==++${imageName}+checkbox"
                  onclick="get_checked();" "></input>`;//style="display:none;

    popupList.append(checkbox);
    checkboxId = $('#popup_mylist').children("input:last").attr("id");

    var MypopupId = new popupID(myname,contentbtnId,checkboxId);
    mypopupDic[myname] = MypopupId;

    if((i+1) % 5 === 0){
      let space=`</br>`;
      popupList.append(space);
    }

  }

  /*  contentbtn=`<img class = "popup_db_list" id="${thisId}_${thisImageTitles[i]}+contentbtn"
                  src="" alt="${thisImageTitles[i]}" width="200px" height="200px"
                  style="color:${bColor}">`//onclick="edit_diary(this);"
    checkbox = `<input type="checkbox" class = "popup_db_checkbox" id="${thisId}_${thisImageTitles[i]}+checkbox"
                  onclick="get_checked();" style="display:none;"></input></br>`;
                  */

}

//==========================popup uploadPopupBtn button action
async function insert_image(){

  let imagefoam = document.getElementById('imagePopupFoam').files;

  let popupList = $('#popup_mylist');
  let popupCh = $('#popup_mylist').children();
  let thisName = popupCh[0].id;
  //contentbtn=`<input type="button" class = "popup_db_title" id="${thisContentsLa}++${thisContentsRa}++${thismarkerId}++${thisId}"
  let thisSplit = thisName.split("++");
  let thisLa = thisSplit[0];
  let thisRa = thisSplit[1];
  let thisMarkerId = thisSplit[2];
  let thisId = thisSplit[3];
  let thisTitle = thisSplit[3].split("(")
  thisTitle = thisTitle[0];

  let dblistNum = $('.popup_db_list').length;

  console.log("imagefoam_____:",imagefoam[0],imagefoam.length);
  console.log("1____dblistNum_____:",dblistNum,"\n");

  for(let i = 0; imagefoam.length > i; i++){

    let myname = `${thisId}_${dblistNum+1+i}`;
    let imageName = imagefoam[i].name;
    let pointNum = (dblistNum + i + 1) % 5;
    console.log("imageName:",imageName, "myname:",myname);

    let result = await fetch(`http://localhost:3000/image/${imageName}`);
    let blob = await result.blob();
    //console.log("blob_________________:",blob);
    let objectUrl = URL.createObjectURL(blob);
    console.log("objectUrl_________________:",objectUrl);

    let contentbtn = `<img class = "popup_db_list" id="${thisId}++==++${imageName}" src=""
                    alt="${imageName}" onclick="show_image(this);">`;

    popupList.append(contentbtn);
    document.getElementById(`${thisId}++==++${imageName}`).src = objectUrl//srcData;
    contentbtnId = $('#popup_mylist').children("input:last").attr("id");

    checkbox = `<input type="checkbox" class = "popup_db_checkbox" id="${thisId}++==++${imageName}+checkbox"
                  onclick="get_checked();" "></input>`;//style="display:none;

    popupList.append(checkbox);
    checkboxId = $('#popup_mylist').children("input:last").attr("id");

    console.log("loop____i_____:",i,"\n",
                "myname______",myname,"\n",
                "pointNum=(dblistNum + i + 1) % 5_____:", pointNum, "\n");

    console.log("$('.popup_db_list'):", $('.popup_db_list'));

    if(pointNum === 0 && dblistNum !== 0){
      let space = `<br/>`;
      popupList.append(space);
      console.log("insert <br>");
      console.log("$('.popup_db_list'):", $('.popup_db_list'));
      console.log("$('#popup_mylist'):", $('#popup_mylist').children());
    }

    var MypopupId = new popupID(myname,contentbtnId,checkboxId);
    mypopupDic[myname] = MypopupId

    var httpRequest = new XMLHttpRequest();

    var data = JSON.stringify({
          id: "i_contents",
          sig: "insert_image",
          contents: [thisLa, thisRa, thisId, thisTitle, thisMarkerId, imageName]
          })

    //console.log("insert_image_____________________:",contentsID, "\n",contentsTitle,"\n", filename,"\n", srcData);
    httpRequest.open('POST', 'http://localhost:3000');
    httpRequest.send(data);

    //URL.revokeObjectURL(blob);

  }
  document.getElementById('imagePopupLabel').innerHTML = "Choose images to upload";
  history.go(0);
  //location.reload(true);
}

function get_imageInfo(){

  let imagefoam = document.getElementById('imagePopupFoam').files;
  let imageLabelText = document.getElementById('imagePopupLabel');
  let imageNum = imagefoam.length;
  let nameText = `${imageNum}: `;

  if(imageNum > 0){

    for(let i = 0; imageNum > i; i++){

      nameText += `${imagefoam[i].name}, `;
      console.log("imagefoam[i].name_____:",imagefoam[i].name);

      }
    imageLabelText.innerHTML = nameText;

  }
  else{
    imageLabelText.innerHTML = "Choose images to upload";
  }
}


//==========================popup close button action
function close_popup(){


  var bColor =  $("#imagePopupLabel").css('color');
  var wColor =  $(".popup").css('background-color');

  document.querySelector('.popup').style.display = 'none';
  //document.querySelector('.popup-goto-content').style.display = 'none';
  document.querySelector('#uploadPopupBtn').style.color = bColor;
  document.querySelector('#uploadPopupBtn').style.borderColor = bColor;
  document.querySelector('#uploadPopupBtn').style.backgroundColor = wColor;
  document.querySelector('#uploadPopupBtn').value = 'upload';

  document.querySelector('#choosePopupBtn').style.color = bColor;
  document.querySelector('#choosePopupBtn').style.borderColor = bColor;
  document.querySelector('#choosePopupBtn').style.backgroundColor = wColor;
  document.querySelector('#choosePopupBtn').value = 'choose';

  document.querySelector('#deletePopupBtn').style.color = bColor;
  document.querySelector('#deletePopupBtn').style.borderColor = bColor;
  document.querySelector('#deletePopupBtn').style.backgroundColor = wColor;
  document.querySelector('#deletePopupBtn').value = 'delete marker';

  document.getElementById('imagePopupLabel').innerHTML = "Choose images to upload";

  let popuplist = $('#popup_mylist').children();

  for(let i = 0; i < popuplist.length; i++){
    name = popuplist[i].id;
    name_split = name.split("+");
    console.log("name:",name_split[1]);

    if(name_split[1] === "checkbox"){
      popuplist[i].style.display = 'none';
      console.log("popuplist[i]:",popuplist[i]);
    }
  }

  /*let diaryBtn = $(".popup_db_diary");
  let diaryBtnId = diaryBtn[0].id
  diaryBtnId = diaryBtnId.split("_");
  let afterText = diaryBtn[0].value;

  iframe_sig = "reset_data";
  let resetinfo = [diaryBtnId, afterText];

  window.parent.postMessage([iframe_id, iframe_sig, resetinfo], 'http://localhost:3000/iframe.html');
*/
}

//==========================popup checkbox action

function get_checked(){
  let checked = [];
  //console.log("checkedMylist: ",checkedMylist);
  for(key in mypopupDic){
    if (document.getElementById(mypopupDic[key].checkbox).checked){
      checked.push(mypopupDic[key].checkbox);
      console.log(mypopupDic[key].checkbox)
      //console.log("checked_mylist: ",mylistDic[key].myname);
    }
    else{
      continue;
    }
  }
  //console.log("checkedMylist: ",checkedMylist);
  return checked;
}

//==========================popup choose button action(show checkbox, del button)

function choose_mycontents(){

  let bColor =  $("#imagePopupLabel").css('border-color');
  let wColor =  $(".popup").css('background-color');

  let popuplist = $('#popup_mylist').children();
  let chooseText = $('#choosePopupBtn').val();

  if(chooseText === "cancel"){

    document.getElementById('deletePopupBtn').value = "delete marker";

    document.querySelector('#choosePopupBtn').style.color = bColor;
    document.querySelector('#choosePopupBtn').style.borderColor = bColor;
    document.querySelector('#choosePopupBtn').style.backgroundColor = wColor;

    $('#choosePopupBtn').attr('value',"choose");
    //document.querySelector('#choosePopupBtn').value = '✔︎';

    for(let i = 0; i < popuplist.length; i++){
      console.log("secclick____popuplist[i]________children:",popuplist[i],"\n", "id:",popuplist[i].id,"\n");
      name = popuplist[i].id;
      name_split = name.split("+");
      console.log("name:",name_split[5]);

      if(name_split[5] === "checkbox"){
        popuplist[i].style.opacity = 0;
        //popuplist[i].style.display = 'none';
        console.log("popuplist[i]____checkbox:",popuplist[i],"\n", "id:",popuplist[i].id,"\n");
      }
    }


  }else{

    document.getElementById('deletePopupBtn').value = "delete contents";

    document.querySelector('#choosePopupBtn').style.color = wColor;
    document.querySelector('#choosePopupBtn').style.borderColor = tColor;
    document.querySelector('#choosePopupBtn').style.backgroundColor = bColor;

    $('#choosePopupBtn').attr('value',"cancel");

    for(let i = 0; i < popuplist.length; i++){
      console.log("firclick______popuplist[i]________children:",popuplist[i],"\n", "id:",popuplist[i].id,"\n");
      name = popuplist[i].id;
      name_split = name.split("+");
      console.log("name:",name_split,name_split[5]);

      if(name_split[5] === "checkbox"){
        //popuplist[i].style.display = 'flex';
        popuplist[i].style.opacity = 1;
        console.log("popuplist[i]____checkbox:",popuplist[i],"\n", "id:",popuplist[i].id,"\n");
      }
    }

  }
}

//==========================popup contents click action

function edit_diary(btn){
  //id="${thisId}_${thisDiary}+contentbtn"
  let btn_id = btn.id;
  let btn_split = btn_id.split("_");
  let contentsID = btn_split[0];
  let contentsTitle = contentsID.split("(");
  contentsTitle = contentsTitle[0];

  let afterText = btn.value;
  console.log("btn_id",btn_id,"afterText__________",afterText);

  var httpRequest = new XMLHttpRequest();

  var data = JSON.stringify({
        id: "i_contents",
        sig: "edit_diary",
        contents: [contentsID, contentsTitle, afterText]
        })

  httpRequest.open('POST', 'http://localhost:3000');
  httpRequest.send(data);

  history.go(0);
  //location.reload(true);
}

function show_image(btn){

  console.log("show_image___src______________:",btn.src,document.getElementById("imageFoam").src);
  document.querySelector('.popup-image').style.display = 'flex';
  document.getElementById("imageFoam").src = btn.src;

}

function close_image(){

  document.querySelector('.popup-image').style.display = 'none';

}

//==========================popup del button action

function delete_mycontents(){
    //server post -> sql ->delete
    //$("#${thisId}_${thisDiary}+checkbox").css('display', none);
    let popuplist = $('#popup_mylist').children();

    if(document.getElementById('deletePopupBtn').value === "delete contents"){//popuplist[2].style.display !== 'none'){

      let checked = get_checked();
      let deletelist = [];

      if(checked.length === 0){

        alert("Select list!!!");

      }else{
        for(var i = 0; i < checked.length; i++){
          sqlID = checked[i].split("+");
        //  sqlID = sqlID[0].split("++==++");
          deletelist.push(sqlID[4]);
          console.log("checked_deletelistID________sqlID[4]:",sqlID[4]);

        }}

        //request to server(delete mysql)
        var httpRequest = new XMLHttpRequest();

        var data = JSON.stringify({
              id: "i_contents",
              sig: "delete_mycontents_list",
              contents: deletelist
            })

        httpRequest.open('POST', 'http://localhost:3000');
        httpRequest.send(data);

        history.go(0);
        //location.reload(true);

    }else if(document.getElementById('deletePopupBtn').value === "delete marker"){
      let deletemarker = popuplist[0].id;
      deletemarker = deletemarker.split("++");
      deletemarker = deletemarker[3];

      console.log("deletemarker___:",deletemarker);

      var httpRequest = new XMLHttpRequest();

      var data = JSON.stringify({
            id: "i_contents",
            sig: "delete_mycontents_marker",
            contents: deletemarker
          })

      httpRequest.open('POST', 'http://localhost:3000');
      httpRequest.send(data);

      history.go(0);
      //location.reload(true);

    }

}

//==============================================================================
//========================reload(color)
//============================reload popupColor===========================
function reload_popupCanvas(tColor, bColor, wColor){

  $(".popup").css('background-color',wColor);
  $(".popup-upload-image").css('background-color',wColor);
  $(".popup-image").css('background-color',wColor);
  $(".popup-image-content").css('background-color',wColor);
  $("#imagePopupLabel").css('background-color',wColor);
  $("#uploadPopupBtn").css('background-color',wColor);

  $(".popup-content").css('background-color',wColor);
  $("#uploadPopupBtn").css('background-color', wColor);
  $("#choosePopupBtn").css('background-color', wColor);
  $("#deletePopupBtn").css('background-color', wColor);
  $("#selectPlace").css('background-color', wColor);

  $(".popup-content").css('border-color',bColor);
  $(".popup-image-content").css('border-color',bColor);
  $("#uploadPopupBtn").css('border-color',bColor);
  $("#choosePopupBtn").css('border-color',bColor);
  $("#deletePopupBtn").css('border-color',bColor);
  $(".popup-upload-image").css('border-color',bColor);
  $("#imagePopupLabel").css('border-color',bColor);
  $("#uploadPopupBtn").css('border-color',bColor);
  $("#selectPlace").css('border-color',bColor);

  $(".popup_db_title").css('color',bColor);
  $(".popup_db_diary").css('color',bColor);
  //$(".popup_db_diary").css('background-color',tColor);//opacity->0.08이기에 컬러 적용 제외
  $(".popup_db_list").css('color',bColor);
  $(".popup_db_checkbox").css('color',bColor);
  $("#closePopup").css('color',bColor);
  $("#uploadPopupBtn").css('color',bColor);
  $("#choosePopupBtn").css('color',bColor);
  $("#deletePopupBtn").css('color',bColor);
  $("#imagePopupLabel").css('color',bColor);
  $("#uploadPopupBtn").css('color',bColor);

  $("#selectPlace").css('color',bColor);
}






//////blob_________________
/*
//==========================blob변환 후, db에 blob저장 & 이름 저장
theBlob.lastModifiedDate = new Date();
thisBlob.name = "testimg";
thisBlob.contentType = "image/png";

function dataURLToBlob(contentsID, contentsTitle, filename, dataURL) {
  //ex) dataURL ---> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlAAAANoCAYAAAAPvNQxAAAMYmlDQ1BJQ0Mg.....
    var BASE64_MARKER = ';base64,';
    //console.log("dataURL.indexOf(BASE64_MARKER)_______",dataURL.indexOf(BASE64_MARKER),"\n");

    if (dataURL.indexOf(BASE64_MARKER) == -1) { //;base64, 아닐 경우
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1]; //ex) iamge/png
        var raw = decodeURIComponent(parts[1]);
        //console.log("0_____parts_______",parts,"\n","contentType_____",contentType,"\n","raw__________",raw);
        //return new Blob([raw], {type: contentType});
        let dbBlob = new Blob([raw], {type: contentType});
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1]; //ex) iamge/png
    var raw = window.atob(parts[1]);  //ex) PNG IHDRPh¼Ô1biCCPICC ProfileHXWï72IXÈ{²	 #A@¦
    var rawLength = raw.length; //ex) 546585
    var uInt8Array = new Uint8Array(rawLength); //ex) Uint8Array(546585) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, …]
    //console.log("1______parts_______",parts,"\n","contentType_____",contentType,"\n","raw__________",raw,"\n","rawLength_____",rawLength,"\n","uInt8Array______________--",uInt8Array,"\n");
    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    //console.log("uInt8Array______________",uInt8Array,"\n"); //ex) Uint8Array(546585) [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, …]
    //return new Blob([uInt8Array], {type: contentType});
    let dbBlob = new Blob([uInt8Array], {type: contentType});
}

//image -> base64 -> blob
//blob -> base64 -> img
//==========================기존 db 이미지 불러올 때, db에서 blob 불러온 후, 파일로 변환, 추가
function blobToFile(thisBlob, fileName){

  //console.log("blob____Info___________________:",theBlob.name,fileName,thisBlob.contentType);

  //file로 바꾸기
  let imageFile = new File([thisBlob],fileName,{type: thisBlob.contentType});
  console.log("thisFile_________________________________",thisFile);

  //file -> base64
  let fileReader = new FileReader();

  fileReader.onload = function(fileLoadedEvent){
    let srcData = fileLoadedEvent.target.result;
    console.log("srcData_______",srcData);

    let popupList = $('#popup_mylist');
    let newImage = `<img class = "popup_db_list" id="${fileName}" src="" alt="${fileName}" width="200px" height="200px">`;

    popupList.append(newImage);
    document.getElementById(`${fileName}`).src = srcData;
  }
  fileReader.readAsDataURL(imageFile);
}
*/
