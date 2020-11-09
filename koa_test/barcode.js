
//------------------------------------------------------------------------------------
// # cd /home/nodejs/proj-1/api
// # node app.js
//------------------------------------------------------------------------------------
const express = require('express');
const cors = require('cors'); // npm install --save cors
const app = express();
const port = 4000;
//---------------------------------------
// CORS 설정
// CORS란 Cross Origin Resource Sharing의 약자로, 
// 현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말한다.
// http://devstory.ibksplatform.com/2017/11/nodejs-cors.html
const corsOpt = require('./cors/corsOpt.js');
app.use(cors(corsOpt.corsOptions));
//
//app.use(cors());  // 무조건 통과 
//
//---------------------------------------
// body-parser middleware for json
//---------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//---------------------------------------

app.get('/barcode', function(req, res) {
    console.log('==> barcode !!' + req.query.no);
    let return_val = "S=0&K=0&RQ=21:"+ req.query.no + ":F";
    res.send(return_val);
    // 동일선상의 네트워크에서만 사요 가능 ... 아래는 현재 안됨...
    //res.redirect("http://192.168.219.121/xpo?"+ return_val);
});

//
//---------------------------------
// 서버 연동 부분
//---------------------------------
var server = app.listen(port, function() {
    console.log("Connect " + port + " port !! server is running");
});

module.exports = app; /* use at app.js */
