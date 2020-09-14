//---------------------------------------------------- 
// 출처: http://jaesu.tistory.com/entry/max-connection-확인-및-늘이기
//---------------------------------------------------- 
// 최대 사용자 접속수 보기
// show variables like 'max_connect%';
//---------------------------------------------------- 
// 접속수 보기
// show global status like 'threads_connected';
//---------------------------------------------------- 
// 최대 사용자 접속 허용수(default:100) 변경 하기
// vi /etc/mysql/my.cnf 파일에서 
// max_connections = 3000 으로 수정 해주고 재시작 한다.
//---------------------------------------------------- 
//
//---------------------------------------------------- 
// node app.js 시 최초에 한번만 실행되는 부분임...
//---------------------------------------------------- 
// https://nesoy.github.io/articles/2017-04/Nodejs-MySQL
// 

function db_conn() {
    console.log("=== db_conn ===");
    //
    // 더블 쿼테이션("./db_config.js")으로해서 개고생 -> 싱글 쿼테이션임
    //
    //var db_config = require('./db_config.js').real;
    //var db_config = require('./db_config.js').local;
    var db_config = require('./db_config.js').dev;
    if (!db_config) {
        console.log("=== db_config.js not defined ===");
        return false;
    }


    //var mysql = require('mysql');
    //
    // npm i --save mysql2  or  yarn add mysql2
    var mysql = require('mysql2/promise'); // async await 용...
    // connection pool이 제대로 수행이 안될때 아래의 모듈로 대체
    //var MysqlPoolBooster = require('mysql-pool-booster');
    //mysql = MysqlPoolBooster(mysql);

    var db = mysql.createPool(db_config);
    console.log("db : " + db);
    return db;
}

module.exports = db_conn();