//
let whitelist = [
'http://21cnkc.iptime.org:4000', 'http://21cnkc.iptime.org:4100',
'http://21cnkc.iptime.org:3100', 'http://106.246.111.180:3100', 'http://192.168.0.200:3100'
];

let corsOptions = {
    //allowedHeaders: ['sessionId', 'Content-Type'],
    //exposedHeaders: ['sessionId'],
    //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //preflightContinue: false,
    //optionsSuccessStatus: 200, // IE 11이나 여러 스마트 TV들에 대한 확인
    //withCredentials: true,
    //-------------------------------------------------
    // 이부분은 client에서 click시 마다 매번 호출된다. 
    // 뭔가 watch로 지켜보고 있다가 수행 되는것 같음. ???
    //-------------------------------------------------    
    origin: '*'
    // origin: function(origin, callback) {
    //     console.log("origin : " + origin);
    //     if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         //callback(new Error('Not allowed by CORS'));
    //         //-----------------------------------
    //         // 모든 도메인 허용 하려면 아래것을 사용 ...
    //         //-----------------------------------
    //         callback(null, true);
    //     }
    // },
}

module.exports = {
    corsOptions
};