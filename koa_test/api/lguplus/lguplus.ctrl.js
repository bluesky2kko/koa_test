
// POST => http://21cnkc.iptime.org:4000/api/lguplus/userinfo
// POST => http://21cnkc.iptime.org:4000/api/lguplus/setforward
// POST => http://21cnkc.iptime.org:4000/api/lguplus/stopforward
//
exports.post = async (ctx) => {
    //postman : GET : BODY 이하 관련 없음
    let restapi = ctx.params.restapi;     // 숫자 타입 반드시 parseInt 적용바람 => 개고생 ...
    console.log(":restapi => " + restapi);

    //let telno_070 = "07048669987";
    let telno_070 = ctx.request.body.telno_070;
    let chacsin_telno = ctx.request.body.chacsin_telno;

    let url = "";
    let sha512_pass = "5a7bf515f6b24667febe74fbee04342c764cb16b29ea1ea1c93004d3c26fec6abddad31e7b2824e6164c54b2731c882fe3fb50f8f17dbd4da19855b3329c66ba";

    // 착신설정
    if (restapi == "setforward") {
        url = "https://centrex.uplus.co.kr/RestApi/setforward";
        url += "?id=" + telno_070;
        url += "&pass=" + sha512_pass;
        url += "&destnumber=" + chacsin_telno;
        
        // 착신해제
    } else if (restapi == "stopforward") {
        url = "https://centrex.uplus.co.kr/RestApi/stopforward"
        url += "?id=" + telno_070
        url += "&pass=" + sha512_pass
    
        // 착신설정 상태 정보
    } else if (restapi == "userinfo") {
        url = "https://centrex.uplus.co.kr/RestApi/userinfo"
        url += "?id=" + telno_070
        url += "&pass=" + sha512_pass
    }

    // memi.dev 참조
    //https://medium.com/harrythegreat/node-js%EC%97%90%EC%84%9C-request-js-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-28744c52f68d
    // XMLHttpRequest 대신 request 사용하기
    
    const options = {
        uri: url,
        method: 'POST',
        json: true      // false는 text로 넘어옴
    }
    
    // request는 main인 app.js에서 선언
    //const request = require('request');
    ctx.body = await request.post(options, function(err,httpResponse,body) { 
        console.log(body);
        if (err==null) {
            console.log(body.DATAS);
            return body
        } else {
            return err
        }
    });
    
    /*
    라. 결과 응답 형식  
    { 
    SVC_RT: 결과 코드  
    SVC_MSG: 결과 코드에 대한 메시지  
    DATAS: 명령수행 결과 정보들 
        {
            NAME: 사용자 이름 
            EXTEN : 내선번호 
            NUMBER070: 070번호 ④ FORWARD_TYPE : 착신전화 설정 형식 (‘F’:착신전환전화,V:음성사서함,’N’,’’:사용안함 
            FORWARD_DATA : 해당 착신전환 설정에 대한 설정값 
            FORWARD_STR : 해당 착신전환에 대한 설명
        }
    }
    */    
};
