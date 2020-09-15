module.exports = (function() {
    return {
        local: { // localhost
            host: 'localhost',
            port: '3306',
            user: 'root',
            //password: 'xpogate!@#',
            password: process.env.DB_PW_LOCAL,  // .env 숨김파일 import
            database: 'mysql',
            dateStrings: true // nodejs timestamp와 같은 형식으로...
        },
        dev: { // real server db info
            host: 'localhost',
            port: '3306',
            user: 'xpo',
            //password: 'xpogate',
            password: process.env.DB_PW_DEV,    // .env 숨김파일 import
            database: '21cnkc',
            connectionLimit: 10,
            waitForConnections: true, // pool에 여유 커넥션이 없는 경우 대기 여부
            // 이하 mysql-pool-booster 에서 사용
            /*
            initialSize: 10,
            maxIdle: 10,
            minIdle: 10,
            queueTimeout: 10000 // 밀리세컨드
            */
            dateStrings: true // nodejs timestamp와 같은 형식으로...
        },
        real: { // dev server db info
            host: 'localhost',
            port: '3306',
            user: 'xpo',
            //password: 'xpogate',
            password: process.env.DB_PW_REAL,   // .env 숨김파일 import
            database: '21cnkc',
            connectionLimit: 10,
            dateStrings: true // nodejs timestamp와 같은 형식으로...
        }
    }
})();