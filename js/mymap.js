//=======county, city, latitude, longtitude, center=============================
/*
https://blog.naver.com/iamstudy_/222161537874
https://blog.naver.com/dlfcnf0407/222260334412

위도(Latitude)  - x 영역표시상하폭 0-90 북위 남위
경도(Longtitude) - y 영역표시좌우폭 0~180 동경 서경

"korea":{
  zoom: 6,
  center: [124.1491605, 33.0041] ,//La(위도-남북), Ra(경도-동서)
  range: [124.1491605, 131.1603, 33.0041, 43.01159],//La.g, La.i, Ra.g, La.i
}

https://terms.naver.com/entry.naver?docId=3344107&cid=47334&categoryId=47334&anchorTarget=TABLE_OF_CONTENT4#TABLE_OF_CONTENT4
https://simplemaps.com/data/kr-cities

public LatLng getCenter()
public double getNorthLatitude()
public double getSouthLatitude()
public double getEastLongitude()
public double getWestLongitude()

public static LatLngBounds from(double northLatitude,
                                double eastLongitude,
                                double southLatitude,
                                double westLongitude)

최북단/최남단의 위도, 최동단/최서단의 경도를 이용하여 LatLngBounds 객체를 생성합니다.

Parameters:
    northLatitude - 최북단의 위도
    eastLongitude - 최동단의 경도
    southLatitude - 최남단의 위도
    westLongitude - 최서단의 경도*/
//////////////////////////////////////////////////////////////////////////////////////////
/*set timeout
var myVar;

function myFunction() {
  myVar = setTimeout(alertFunc, 3000);
}

function alertFunc() {
  alert("Hello!");
}*/
//////////////////////////////////////////////////////////////////////////////////
var areaInfo = {
  "moon":{
    zoom: 1,
    center:[0, 0],
    range:[0, 0, 0, 0]
  },
  "earth":{
    zoom: 1,
    center:[0, 0],
    range:[-90, 90 , -180, 180]
  },
  "korea":{
    zoom: 6,
    center: [33.0041, 124.1491605] ,//results[0].geometry.location.la(위도-남북), results[0].geometry.location.lng(경도-동서)
    range: [33.0041, 43.01159, 124.1491605, 131.1603],//La.g, La.i, Ra.g, La.i
  },
  "seoul":{
    zoom: 11,
    center: [37.4259627, 126.7645827],
    range: [37.4259627, 37.7017495, 126.7645827, 127.1835899],
  },
  "jeju":{
    zoom: 10,
    center:[33.1032777, 126.1480697],
    range: [33.1032777, 34.053171, 126.1480697, 126.9979895],
  },
  "japan":{
    zoom: 6,
    center:[35.519042, 139.5628611],
    range: [30.9940087, 35.8174453, 129.5509008, 139.9188743],
  },
  "thailand":{
    zoom: 7,
    center:[5.613038, 97.343396],
    range: [5.613038, 20.465143, 97.343396, 105.636812],
  },
  "kalimantan":{
    zoom:6,
    center:[-4.178474899999999, 108.8406735],
    range: [-4.178474899999999, 7.0372045, 108.8406735, 119.2693619],
  },
  "europe":{
    zoom: 4,
    center:[34, -11],
    range: [34, 65, -11, 55],
  },
  "finland":{
    zoom: 5,
    center:[59.693623, 20.4565002],
    range: [59.693623, 70.0922932, 20.4565002, 31.5870999],
  },
  "spain":{
    zoom:6,
    center:[35.17300000000001, -12.524],
    range: [35.17300000000001, 45.244, -12.524, 5.098],
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
//==============================init map========================================
//==============================================================================
//mymap.html(callback) -> initMap()=============================================
//==============================================================================
//==============================================================================
//==============================================================================

//================================initMap=======================================
let map, mapOptions, service, infowindow;

function initMap(){
  //later -> first screen -> gps
  mapOptions = {
    center: {lat:0, lng:0},//center: new google.maps.LatLng(33.0041, 124.1491605),
    zoom: 1,//continetnt 5
    //streetViewControl: false,
  };

  map = new google.maps.Map(document.getElementById('my_map'),mapOptions);

}

//==============================================================================
//==============================================================================
//==============================================================================
//=================selectPlace(search and save) button action===================
//==============================================================================
//onchange -> select_area() -> (draw_maptype() -> getNormalizedCoord())=========
//==============================================================================
//==============================================================================
//==============================================================================

//================================place change action===========================
function select_area(){
  let area = $('#selectPlace option:selected').val();

  if(area === "moon"){
    draw_maptype();
  }
  else{

    console.log("select_place__________area_______:",area);
    mapOptions.zoom = areaInfo[area].zoom;
    map = new google.maps.Map(document.getElementById('my_map'),mapOptions);

  //  console.log("areaInfo[area]_______:",areaInfo[area].zoom,areaInfo[area].center[0],areaInfo[area].range[0]);

    const request = {
      query: area,
      fields: ["name", "geometry"],
    };

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {

      if (status === google.maps.places.PlacesServiceStatus.OK && results) {

        console.log(
        "select_place______________________:area:",area,
        "\n","status: ",status,
        "\n","results: ",results, results.length,
        "results[0].geometry.location: ", results[0].geometry.location, "\n",
        "results[0].geometry.location.lat: ", results[0].geometry.location.lat(), "\n",
        "results[0].geometry.location.lng: ", results[0].geometry.location.lng(), "\n",
        "\n","La: ",results[0].geometry.viewport.La,
        "\n","Ra: ",results[0].geometry.viewport.Ra,"\n",
        "results[0].geometry.location: ",results[0].geometry.location);

      /*  console.log(
          "results[0].place_id: ", results[0].place_id, "\n",
          "thisplace: ", thisplace, "\n", "fields: ", request.fields, "\n", "status: ",status, "\n",
          "results[0].geometry.location: ", results[0].geometry.location, "\n",
          "results[0].geometry.location.lat: ", results[0].geometry.location.lat(), "\n",
          "results[0].geometry.location.lng: ", results[0].geometry.location.lng(), "\n",
          "La: ", results[0].geometry.viewport.La, "Ra: ", results[0].geometry.viewport.Ra, "\n",
          "results.length: ", results.length, "\n", "results: ", results, "\n"
          );
  */
        map.setCenter(results[0].geometry.location);

      }
    });
  }
}

//================================google ex=====================================
//================================if select moon================================
////////////////////////////moon image set//////////////////////////////////////
function draw_maptype(){
  //later -> first screen -> gps
  mapOptions = {
    center: {lat:0, lng:0},//center: new google.maps.LatLng(33.0041, 124.1491605),
    zoom: 1,//continetnt 5
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ["moon"],
    },
  };

  map = new google.maps.Map(document.getElementById('my_map'),mapOptions);

  const moonMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      const normalizedCoord = getNormalizedCoord(coord, zoom);

      if (!normalizedCoord) {
        return "";
      }
      const bound = Math.pow(2, zoom);
      return (
        "https://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw" +
        "/" +
        zoom +
        "/" +
        normalizedCoord.x +
        "/" +
        (bound - normalizedCoord.y - 1) +
        ".jpg"
      );
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 9,
    minZoom: 0,
    radius: 1738000,
    name: "Moon",
  });
  map.mapTypes.set("moon", moonMapType);
  map.setMapTypeId("moon");

}

//================================google ex=====================================
// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
  const y = coord.y;
  let x = coord.x;
  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  const tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = ((x % tileRange) + tileRange) % tileRange;
  }
  return { x: x, y: y };
}

//==============================================================================
//==============================================================================
//==============================================================================
//====================mark(search and save) button action=======================
//==============================================================================
//btn -> search_place() -> create_markercolor() ->
//set_date() && get_dateColor() -> (make_dateColor()) -> create_marker()========
//==============================================================================
//==============================================================================
//==============================================================================

//================================search place==================================
async function search_place(){

  let area = $('#selectPlace option:selected').val();
  let rangelist = areaInfo[area].range;

  let thisplace = document.getElementById("searchHolder").value;

  const request = {
    query: thisplace,
    fields: ["geometry.location", "place_id", "name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {

      console.log(
        "results[0].place_id: ", results[0].place_id, "\n",
        "thisplace: ", thisplace, "\n", "fields: ", request.fields, "\n", "status: ",status, "\n",
        "results[0].geometry.location: ", results[0].geometry.location, "\n",
        "results[0].geometry.location.lat: ", results[0].geometry.location.lat(), "\n",
        "results[0].geometry.location.lng: ", results[0].geometry.location.lng(), "\n",
        "La: ", results[0].geometry.viewport.La, "Ra: ", results[0].geometry.viewport.Ra, "\n",
        "results.length: ", results.length, "\n", "results: ", results, "\n"
        );
      //range: [124.1491605, 131.1603, 33.0041, 43.01159]


      for (let i = 0; i < results.length; i++){
        console.log("results[i]__________________________", results[i]);

        if(rangelist[0] > parseFloat(results[0].geometry.location.lat()) || rangelist[1] < parseFloat(results[0].geometry.location.lat()) || rangelist[2] > parseFloat(results[0].geometry.location.lng()) || rangelist[3] < parseFloat(results[0].geometry.location.lng())){
          alert("Out of range!")
        }else{
          /*if(results.length > 1){
            results list 나열 후, 클릭하면 저장하는 방식 변경 고려
            };*/
          create_markercolor(results[i]);//results[0]
        }
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

//========================to set color befor make marker========================
//======marker 날짜별 구분할 색 지정

let now;
let markerDic = {};//get data from mysql
let datelist, timelist, year, month, date, hour;

function create_markercolor(place) {

  let area = $('#selectPlace option:selected').val();
  let centerlist = areaInfo[area].center;
  //let placeLat = centerlist[0];
  //let placeLon = centerlist[1];

  now = set_date();
  datelist = now.split(" GMT");
  now = datelist[0];

  datelist = now.split(" ");
  year = Number(datelist[3]);
  month = String(datelist[1])//.trim();
  date = Number(datelist[2]);

  timelist = datelist[4].split(":");
  hour = Number(timelist[0]);

  //colorkey = year+month+date;
  get_dateColor(place, year, month, date);

}

//=============================date & time======================================
//=============================set date=========================================
//https://www.w3schools.com/js/js_date_methods.asp
//Date(year, month, day, hours, minutes, seconds, milliseconds)
// ex. new Date(2018, 11, 24, 10, 33, 30, 0);
//(날짜만)dt.toDateString();
//(시간)dt.toISOString();// dt.toString();//dt.toUTCString();
function set_date(){
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var dt = new Date();

  yy = dt.getFullYear();
  mm = months[dt.getMonth()];
  dd = dt.getDate();
  day = days[dt.getDay()];

  h = dt.getHours();
  m = dt.getMinutes();
  s = dt.getSeconds();

  var dtText = dt.toString();
  //dtsplit = dtText.split("GMT");
  //dtsplit = dtText.split(" ");
  //dtText = dtsplit[0];//"(" + day + ") " + mm + " " + dd + ", " + yy + " " + h + ":" + m + ":" + s

  return dtText;
}

//==============================color===========================================
let dateColorlist, dateColor, colorChart, max, min;
//==============================get dbcolor=====================================
function get_dateColor(place, year, month, date){

  let datalist = [0,0,0];
  datalist[0] = year;
  datalist[1] = month;
  datalist[2] = date;

  console.log("get_dateColor", year, month, date, datalist);
  //myplace table에서 키=year+month+date가 같은 데이터의 칼라만 받아오기
  let httpRequestColor = new XMLHttpRequest();

  let data = JSON.stringify({
        id: "i_mymap",
        sig: "get_dateColor",
        contents: datalist
        })

  httpRequestColor.onload = function() {

    if (httpRequestColor.status === 200 || httpRequestColor.status === 201) {

      console.log("httpRequest_________text____________:\n",httpRequestColor.responseText);
      //받은데이터가 0이면 make_dateColor, 아니면 dateColorlist=받아온칼라split

      let dateColor = httpRequestColor.responseText;
      console.log("dateColor:________", dateColor);

      dateColorlist = dateColor.split("++end++");
      console.log("dateColorlist split:", dateColorlist, dateColorlist.length);
      //dateColorlist.pop(dateColorlist[dateColorlist.length-1]);
      console.log("dateColorlist split:", dateColorlist, dateColorlist.length);

      if (dateColorlist[0] !== "" && dateColorlist.length === 1){

        console.log("get_1_exist:",dateColorlist[0]);
        return create_marker(place, dateColorlist[0]);

      }else{

        console.log("get_2_goMakeColor:",dateColorlist);
        make_dateColor(place, dateColorlist);

      }
    };
  }
  httpRequestColor.open('POST', 'http://localhost:3000');
  httpRequestColor.send(data);
}

//==============================make random color===============================
function make_dateColor(place, dateColorlist){
  colorChart = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
  dateColor = "#";
  max = 16;
  min = 0;

  for (i = 0; i < 6; i++){

    colorIndex = parseInt(Math.random() * (max - min) + min); // max보다 작고 min보다 크거나 같은 값 랜덤 생성
    console.log("make_0_color:", colorIndex, colorChart[colorIndex]);
    dateColor += colorChart[colorIndex];

  }

  if(dateColorlist.includes(dateColor)){
    console.log("make_1_exist:",dateColor, dateColorlist, dateColorDic);

    return make_dateColor(place, dateColorlist);

  }else{

  //  dateColorlist.push(dateColor);
  //  dateColorDic[colorkey] = dateColor;
    console.log("make_2_confirm:",dateColor, dateColorlist);

    return create_marker(place, dateColor);
  }
}

//==============================create_marker===================================
//======mark button action -> mark 생성

function create_marker(place, dateColor){

  let labelText = place.name + "(" + now + ")";
  //console.log("now:", now);

  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({

    map,
    position: place.geometry.location,
    //draggable: true,
    animation: google.maps.Animation.DROP,

    icon: {
      //url :obj.img
      //scaledSize : new google.maps.Size(obj.width, obj.height)
      path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
      fillColor: dateColor,
      fillOpacity: 0.7,
      strokeColor: '#000000',
      strokeWeight: 1,
      scale: 2,
      anchor: new google.maps.Point(12, 24),
      text:place.name
    },

    label:{ // 라벨 글씨 크기 및 css지정
           text: labelText,
           color: "black",
           fontSize : "9px",
           fontFamily : "Dotum",
           fontWeight : "bold",
           anchor: new google.maps.Point(12, 24)
          },

    //placeLa: Math.round(placeLat),
    //placeRa: Math.round(placeLon),
    markerlat: Math.round(place.geometry.location.lat()),
    markerlng: Math.round(place.geometry.location.lng()),
    id: labelText,
    placetitle: place.name,
    markerid: place.place_id,
    diary: "diary",
    imageTitles:[],
    today: datelist[0],
    year: Number(datelist[3]),
    month: datelist[1],
    date: Number(datelist[2]),
    hour: Number(timelist[0])

  });

  markerDic[marker.id] = marker;

  marker.addListener("click", function(){
    let imageUrls = [];
    popup_marker(marker, imageUrls);
  });

  console.log("marker__________:",marker,"\n");
  console.log("markerDic___________:",markerDic,"\n");

  console.log("markerLat: ", place.geometry.location.lat(), "\n", "markerlng: ", place.geometry.location.lng(), "\n");
  console.log("marker_viewport.La: ", place.geometry.viewport.La, "\n", "marker_viewport.Ra: ", place.geometry.viewport.Ra, "\n");

  //sql처리
  //request to server(insert mysql)

  var httpRequest = new XMLHttpRequest();

  var data = JSON.stringify({
        id: "i_mymap",
        sig: "create_marker",
        contents: [marker.markerlat, marker.markerlng, marker.id, marker.placetitle, marker.markerid,
                    marker.today, marker.year, marker.month, marker.date, marker.hour, dateColor,
                    marker.diary]
        })

  //console.log("create_marker________contents_______data________:",data);
  console.log("create_marker_dateColor:", dateColor);
  httpRequest.open('POST', 'http://localhost:3000');
  httpRequest.send(data);


  var searchname = document.getElementById("searchHolder").value;

  if(searchname === ""){

    for(key in markerDic){
      markerDic[key].setVisible(false)
      //marker.setVisible(false);
    }

  }else{
    marker.setVisible(true);
  }
  return marker;
}

//==============================================================================
//==============================================================================
//==============================================================================
//=============================show(hide) button================================
//==============================================================================
//btn -> get_db() -> set_data() -> show_marker() ->
//init_marker() -> popup_marker()===============================================
//==============================================================================
//==============================================================================
//==============================================================================

let placeinfo = {};
let contentsinfo = [];

//==============================get_db==========================================
function get_db(){

  placeinfo = {};
  contentsinfo = [];

  let area = $('#selectPlace option:selected').val();
  let rangelist = areaInfo[area].range;

  let httpRequestFir = new XMLHttpRequest();

  rangelist[0] = Math.floor(rangelist[0]);
  rangelist[1] = Math.ceil(rangelist[1]);
  rangelist[2] = Math.floor(rangelist[2]);
  rangelist[3] = Math.ceil(rangelist[3]);

  let dataFir = JSON.stringify({
        id: "i_mymap",
        sig: "get_placedb",
        contents: rangelist
        })

  httpRequestFir.onload = function() {
    if (httpRequestFir.status === 200 || httpRequestFir.status === 201) {

      let httpRequestSec = new XMLHttpRequest();
      let dataSec = JSON.stringify({
            id: "i_mymap",
            sig: "get_contentsdb",
            contents: rangelist
            })

      httpRequestSec.onload = function() {
        if (httpRequestSec.status === 200 || httpRequestSec.status === 201) {

          if(document.querySelector('#showBtn').innerHTML === "hide"){
            document.querySelector('#showBtn').innerHTML = "show";

            for(key in markerDic){
              marker = markerDic[key];
              marker.setVisible(false);
            }

          }else{

            document.querySelector('#showBtn').innerHTML = "hide";

            ////////////
            /*` ${myplaces[i].placeID}++
                ${myplaces[i].placeTitle}++
                ${myplaces[i].today}++
                ${myplaces[i].year}++
                ${myplaces[i].month}++
                ${myplaces[i].date}++
                ${myplaces[i].hour}++
                ${myplaces[i].color}++end++`;*/
            let firText = httpRequestFir.responseText;
            console.log("httpRequestSec._________textSec____________:\n",httpRequestFir.responseText);
            let firList = firText.split("++end++");
            console.log("firList:",firList);

            /*`
            ${mycontents[i].contentsID}++
            ${mycontents[i].contentsTitle}++
            ${mycontents[i].imageTitle}++
            ${mycontents[i].diary}++
            ${mycontents[i].created}++end++`;*/
            let secText = httpRequestSec.responseText;
            console.log("httpRequestSec._________secText____________:\n",httpRequestSec.responseText);
            let secList = secText.split("++end++");
            console.log("secList:",secList);

            set_data(firList, secList);
          }

        } else {
          console.error("httpRequestSec________error:",httpRequestSec.responseText);
        }
      };

      httpRequestSec.open('POST', 'http://localhost:3000');
      httpRequestSec.send(dataSec);

    } else {
      console.error("httpRequestFir________error:",httpRequestFir.responseText);
    }
  };

  httpRequestFir.open('POST', 'http://localhost:3000');
  httpRequestFir.send(dataFir);

}

function set_data(firList, secList){

  ////////////////
  for(var i=0; i < firList.length-1; i++){

    let split_fir = firList[i].split("++");
    console.log("split_fir:",split_fir);

    placeinfo[split_fir[0]] = {

      id: split_fir[0],//contentsID -> labeltext
      placetitle: split_fir[1],//contentsTitle
      markerid: split_fir[2],
      imageTitles: [],
      diary: "diary",
      today: split_fir[3],
      year: Number(split_fir[4]),
      month: split_fir[5],
      date: Number(split_fir[6]),
      hour: Number(split_fir[7]),
      dateColor: split_fir[8]

    };
    console.log("placeinfo____________myplaceData___________:",placeinfo,placeinfo[split_fir[0]].diary);
  }
  ////////////////
  for(var j = 0; j < secList.length-1; j++){

    let split_sec = secList[j].split("++");
    console.log("split_sec:",split_sec);

    let contentsID = split_sec[0];
    let contentsTitle = split_sec[1];
    let markerid = split_sec[2];
    let imageTitle = split_sec[3];
    let diary = split_sec[4];

    //placeinfo[split_sec[0]].markerid = split_sec[2];

    if(imageTitle !== "null"){
      //console.log("imageTitle",imageTitle);
      placeinfo[contentsID].imageTitles.push(imageTitle);
    }else{
      //console.log("diary", diary);
      placeinfo[contentsID].diary = diary;
    }
  }

  console.log("placeinfo________________mycontentsData:", placeinfo);

  for(key in placeinfo){
    show_marker(key);
    console.log("go_show_marker:",key);
  }

}

//==============================show_marker=====================================
//======show button action db 불러왔던 데이터 처리 후 -> 존재하는 마커 표시
function show_marker(key){

  let thisplace;
  let markername;

  thisplace = placeinfo[key].placetitle;

  const request = {
    query: thisplace,
    fields: ["place_id", "name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {

    if (status === google.maps.places.PlacesServiceStatus.OK && results) {

      console.log(
          "results[0].place_id: ", results[0].place_id, "\n",
          "thisplace: ", thisplace, "\n", "fields: ", request.fields, "\n", "status: ",status, "\n",
          "results[0].geometry.location: ", results[0].geometry.location, "\n",
          "results[0].geometry.location.lat: ", results[0].geometry.location.lat(), "\n",
          "results[0].geometry.location.lng: ", results[0].geometry.location.lng(), "\n",
          "La: ", results[0].geometry.viewport.La, "Ra: ", results[0].geometry.viewport.Ra, "\n",
          "results.length: ", results.length, "\n", "results: ", results, "\n"
          );

      for (let i = 0; i < results.length; i++){

        console.log("results[i]__________________________", results[i]);
        //search함수,db 바꾼 후, 변경
        if(results[i].place_id === placeinfo[key].markerid){
          map.setCenter(results[i].geometry.location);
          return init_marker(results[i],key);

        }
        //init_marker(results[i],key);
      }
      //map.setCenter(results[0].geometry.location);
    }
  });
}

//==============================init marker=====================================
//======show button action db 불러왔던 데이터 처리 후 -> 존재하는 마커 표시 후 -> 찍은 마커 정보 저장
function init_marker(place,key) {

  let area = $('#selectPlace option:selected').val();
  let centerlist = areaInfo[area].center;
  //let placeLat = centerlist[0];
  //let placeLon = centerlist[1];

  let placekey = key;

  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({

    map,
    position: place.geometry.location,
    //draggable: true,
    //animation: google.maps.Animation.BOUNCE,
    //animation: google.maps.Animation.DROP

    icon: {
      //url :obj.img
      //scaledSize : new google.maps.Size(obj.width, obj.height)
      path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
      fillColor: placeinfo[placekey].dateColor,
      fillOpacity: 0.9,
      strokeColor: '#000000',
      strokeWeight: 1,
      scale: 2,
      anchor: new google.maps.Point(12, 24),
      text: placeinfo[placekey].placetitle //ex. 우도
    },

    label:{ // 라벨 글씨 크기 및 css지정
           text: placeinfo[placekey].id, //ex. 우도(Wed Mar 10 2021 21:00:34
           color: "black",
           fontSize : "9px",
           fontFamily : "Dotum",
           fontWeight : "bold",
           anchor: new google.maps.Point(12, 24)
          },

    //placeLa: Math.round(placeLat),
    //placeRa: Math.round(placeLon),
    markerlat: Math.round(place.geometry.location.lat()),
    markerlng: Math.round(place.geometry.location.lng()),
    id: placeinfo[placekey].id, //ex. 우도(Wed Mar 10 2021 21:00:34
    placetitle: placeinfo[placekey].placetitle, //ex. 우도
    markerid: placeinfo[placekey].markerid,
    imageTitles: placeinfo[placekey].imageTitles,
    diary: placeinfo[placekey].diary,
    today: placeinfo[placekey].today,
    year: placeinfo[placekey].year,
    month: placeinfo[placekey].month,
    date: placeinfo[placekey].date,
    hour: placeinfo[placekey].hour

  });

  markerDic[marker.id] = marker;

  marker.addListener("click", async e => {

    let images = marker.imageTitles;
    console.log("images________:",images);
    let imageUrls = [];

    for(var i=0; images.length > i; i++){
      console.log("async________________________");

      //let addr = "http://localhost:3000/image/"+images[i];
      let result = await fetch(`http://localhost:3000/image/${images[i]}`);
      console.log("images[i]___________",images[i],"\n","result____________",result,"\n");

      let blob = await result.blob();
      //console.log("blob_________________:",blob);
      let objectUrl = URL.createObjectURL(blob);
      console.log("objectUrl_________________:",objectUrl);

      imageUrls.push(objectUrl);
    }
    popup_marker(marker,imageUrls);
  });
}


//==============================marker action===================================

let mymap_id = "i_mymap";
let mymap_sig;

//====== marker button action -> iframe.html -> iframe.js(function popup_showMycontents(popup))

function popup_marker(marker,urls) {
  console.log("marker popup test");
  console.log("marker info:",marker);

  mymap_sig = "popup_marker";

  //marker.markerid
  let markerinfo = [marker.markerlat, marker.markerlng, marker.id, marker.placetitle, marker.markerid,
                    marker.imageTitles, marker.diary,
                    marker.today,marker.year,marker.month,marker.date,marker.hour,
                    urls];

  window.parent.postMessage([mymap_id,mymap_sig,markerinfo], 'http://localhost:3000/iframe.html');

  //reload_popupCanvas(tColor, bColor, wColor);
  //popup_showMylist();
}
