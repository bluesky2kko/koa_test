//---------------------------------------------------
// 실행방법 아래와 같이 (자꾸 작업 방법을 잊어버림...)
//---------------------------------------------------
// cd /home/xpo/nuxt/namk2
// npm run dev
//-----------------------------------
// cd /home/xpo/dbconn/21cnkc
// sudo node app.js
//----------------------------------
//
//------------------------------------------------------------------------------------
// 참조 -> https://mail.daum.net/?nil_profile=mini&nil_src=mail#MINE/00000000000009j
//------------------------------------------------------------------------------------
// 실행 사용법
const os = require("os");
console.log(os.hostname());
//
const path = require('path');
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

//---------------------------------------
// pool 전역변수로 사용 -> var 없이 선언함
//---------------------------------------
/* Step 1, create DB Pool */
pool = require('./db/dbpool');
//
//
// pool 오류 display
pool.on('error', function(err) {
    console.log('connect pool error : ' + err);
});
pool.on('acquire', function(connection) {
    console.log('Connection %d acquired', connection.threadId);
});
// pool내의 connection의 자원이 생길때 발생하는 이벤트처리입니다.
pool.on('connection', function(connection) {
    //console.log('=== SET SESSION auto_increment_increment=1 ===', connection);
    console.log('==> connection threadId : ', connection.threadId);
});
// pool내의 connection의 자원이 release
pool.on('release', function(connection) {
    // escapeId, getId, _id, ...
    console.log('==> pool release threadId : ', connection.threadId);
});
// pool의 크기를 넘어서는 요청을 받아 대기열에 들어갈 경우 발생하는 이벤트 처리입니다.
pool.on('enqueue', function() {
    console.log('==> pool wait ');
});
// pool내의 connection의 자원 재사용 ???
//----------------------------------------
//
app.all('*', function(req, res, next) {
    console.log('Accessing the * section ...');
    next(); // pass control to the next handler
});


app.get('/esp32', function(req, res) {
    console.log('==> esp32 !!');
        res.send(' esp32 !!! ');
});

//----------------------------------------
// 다운로드 전용 -> router적용 추후 정리...
//----------------------------------------
app.get('/download', function(req, res) {
    console.log("/download")
    let fileName = "COPY_ESERO_TAX.xls";
    res.setHeader('Content-Type', 'writeTheType');
    //res.setHeader('Content-Disposition', 'attachment;filename=' + fileName + '');
    res.download("/home/xpo/dbconn/21cnkc/xls/" + fileName);
    //res.download("AAA.xls", "BBB.xls"); // 여러개 파일 download
    //res.sendfile("/home/xpo/dbconn/21cnkc/xls/COPY_ESERO_TAX.xls");
    //res.end();
});

//--------------------------------
// 파일 upload 부분
//--------------------------------
// 1. 위지윅(WYSIWYG)에서 사용 ...
// 2. axios_upload에서 사용...
//--------------------------------
app.use('/upload', require('./router/upload.rout.js')); // http://21cnkc.iptime.org:4000/upload

//--------------------------------
// image 파일 display 부분 ==> 파일서버로 대체 ...
// 추후 제거 ...
// 테스트는 아래의 url을 브라우저에 입력 - 엔터
// http://21cnkc.iptime.org:4000/image/65.jpg
//--------------------------------
app.use('/image', require('./router/image.rout.js'));


//--------------------------------
// get, post 부분 ...
//--------------------------------
// url이 /siud 로 시작되면 모두 /router/siud.rout.js로
app.use('/siud', require('./router/siud.rout.js')); // http://21cnkc.iptime.org:4000/siud
//
// url이 /trans 로 시작되면 모두 /router/trans.rout.js로
app.use('/trans', require('./router/trans.rout.js')); // http://21cnkc.iptime.org:4000/trans
//
// url이 /lguplus 로 시작되면 모두 /router/lguplus.rout.js로
app.use('/lguplus', require('./router/lguplus.rout.js')); // http://21cnkc.iptime.org:4000/lguplus
//
// url이 /email 로 시작되면 모두 /router/email.rout.js로
app.use('/email', require('./router/email.rout.js')); // http://21cnkc.iptime.org:4000/email
//
// url이 /excel 로 시작되면 모두 /router/excel.rout.js로
app.use('/excel', require('./router/excel.rout.js')); // http://21cnkc.iptime.org:4000/excel
//
// url이 /excel 로 시작되면 모두 /router/fax.rout.js로
app.use('/fax', require('./router/fax.rout.js')); // http://21cnkc.iptime.org:4000/fax

//--------------------------------------------------------
// npm run generate 로 build된 directory(dist/)를
// 정적으로 호출...아주 중요...
//--------------------------------------------------------
console.log('__dirname : ' + __dirname);
//app.use(express.static(path.join('/home/xpo/nuxt', 'admin_vuetify', 'dist'))); // join하면 ->  /home/xpo/nuxt/admin_vuetify/dist
app.use(express.static('/home/xpo/nuxt/admin_vuetify/dist'));
//
//
//----------------------------------------------------------
// 위에서 선언한
// app.use('/phpcall', ...
// app.use('/lguplus', ...
// app.use('/users', ...
// 라우트가 존재하지 않는 경우 아래의 로직이 적용된다...
//----------------------------------------------------------
app.use(function(req, res, next) {
    let msg = "위에서 선언한 라우트가 존재하지 않습니다.\r\n";
    msg += "실행 url을 확인 바랍니다. ==>>> " + req.headers.host + req.url;
    console.log(msg);
    // Change the 404 message modifing the middleware
    res.status(404).send("Sorry, that route doesn't exist.");
});
//
//
//---------------------------------
// 서버 연동 부분
//---------------------------------
var server = app.listen(port, function() {
    console.log("Connect " + port + " port !! server is running");
});
//-----------------------------------------------------------
//
//
//-----------------------------------------------------------
// process 가 죽을때 처리해야할 부분 ...
// https://code.i-harness.com/ko-kr/q/505ae8
//-----------------------------------------------------------
// 사례 2 - 외부 신호로 인한 종료 (SIGINT / SIGTERM / 기타) 
// SIGINT : Ctrl + c
// SIGTERM : 
/*
process.on('SIGINT', function() {
    pool.end(function(err) {
        console.log('==> Ctrl + c pool end ', err);
    });
    //
    server.close(function() {
        console.log('==> Ctrl + c server close ');
        // 아래의 pool.end는 프로세스가 종료 될때 -> 실행 되도록 해야함...
    });
});
*/
//-----------------------------------------------------------
// 사례 3 - 내부 오류
//-----------------------------------------------------------
process.on('exit', function() {
    pool.end(function(err) {
        console.log('***=> 내부 오류 pool end ', err);
    });
    console.log('***=> 내부 오류 pool exit ');
    //process.exit(1);
    process.exitCode = 1;
    process.exitCode = 0; // 정상적인 종료시 사용...
});

module.exports = app; /* use at app.js */
