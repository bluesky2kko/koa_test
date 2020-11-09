// [sqlite3 설치 & 활용하기] => 추후 사용 ...
// https://m.blog.naver.com/PostView.nhn?blogId=top60331&logNo=220860647794&proxyReferer=https:%2F%2Fwww.google.com%2F
//
//========================================
// 1-4 koa-router 사용하기 참조
// https://backend-intro.vlpt.us/1/04.html

require('dotenv').config(); // .env 숨김파일 import
//console.log(process.env.SITE_SEARCH);
//console.log(process.env.SITE_SEEK);

// const sql_json = require('./db/sql.json');
// let sql = sql_json.site.search.toString();
// sql = sql.replace(/,/g, '');
// console.log("SQL : " + sql);


const Koa = require('koa');
const KorRouter = require('koa-router');
//---------------------------------------------------
// firebase function애서는 koa-bodyparser 선언 불필요
// ctx.request.body 대신 -> ctx.req.body 로 하면 됨
//---------------------------------------------------
const KorbodyParser = require('koa-bodyparser');

// 업로드 즉, multipart 는 아래처럼 별도로 선언하여 사용한다.
// 세 가지 솔루션중 2 번째것 사용함...
// https://stackoverflow.com/questions/33751203/how-to-parse-multipart-form-data-body-with-koa
const Koa2formidable = require('koa2-formidable');

const cors = require('@koa/cors'); // npm install --save koa2-cors

//const corsOpt = require('./cors/corsOpt.js');
//app.use(cors(corsOpt.corsOptions));
//
//
// XMLHttpRequest대신 ==> Request.js 사용하기
// 설치는 2개 필요 => request, request-promise-native
// 선언은 1개만 필요 => request-promise-native
// 참조 : https://medium.com/harrythegreat/node-js%EC%97%90%EC%84%9C-request-js-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-28744c52f68d
// # npm install request --save
// # npm install request-promise-native --save
//
// 전역변수로 사용
//request = require('request');
request = require('request-promise-native');    // async, awiat 적용시 사용...


const app = new Koa();

let corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));


app.use(async (ctx, next) => {

    //console.log("ctx.request.url : " + ctx.request.url);

    if (ctx.request.url !== "/api/login") {
        const req_h = ctx.request.headers
        for(let k in req_h) {
            console.log("" + k + " >> " + req_h[k])
        }

        const a_token = ctx.request.headers.access_token;
        console.log("access_token : " + a_token);
        if (a_token === undefined) {
            ctx.body = "Login";     // vue에서 login 화면으로 go 처리
            return false;
        }
        //
        const token = require('./config/token.js');

        const out = await token.getToken(a_token);
        console.log("out : " + out);
        //
        if (out != "OK") {
            ctx.body = "Login";     // vue에서 login 화면으로 go 처리
            return false;
        }
    }

    console.log("== next() ==");

    await next();
});
//



//---------------------------------------
// pool 전역변수로 사용 -> var 없이 선언함
//---------------------------------------
/* Step 1, create DB Pool */
pool = require('./db/dbpool');
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


const router = new KorRouter();
const api = require('./api');

app.use(Koa2formidable());  // multipart

app.use(KorbodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.


router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

//--------------------------------------------------------
// npm run generate 로 build된 directory(dist/)를
// 정적으로 호출...아주 중요...
//--------------------------------------------------------
// koa용으로 쓰려면 아래 url 참조하여 설치 
// npm install koa-static
// https://github.com/koajs/static
//--------------------------------------------------------
//console.log('__dirname : ' + __dirname);
//const KoaStatic = require('koa-static');
//app.use(KoaStatic('/home/xpo/nuxt/admin_vuetify/dist'));


app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000');
});

// firebase function애서는 아래 추가
//module.exports = app.callback();
