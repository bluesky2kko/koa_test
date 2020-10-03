const sql_comm = require('../../db/sql_comm.js');

// POST => http://21cnkc.iptime.org:4000/api/login
exports.post_login = async (ctx) => {

    let jwt = require("jsonwebtoken");
    let secretObj = require("../../config/jwt.js");
    
    
    //{"login_id": "joncc", "login_pw": "..."}
    let req = ctx.request.body;
    let id = req.login_id;
    let pw = req.login_pw;
    
    let sql = "SELECT COUNT(login_id) as cnt FROM login WHERE login_id = ? AND login_pw = ?;";

    let obj = await sql_comm.siud_normal(sql, [id, pw]);
    console.log(id + " / " + pw + " => " + obj[0].cnt);

    if (obj[0].cnt > 0) {
        let token = jwt.sign(
            {
                email: "xpo@example.com"   // 토큰의 내용(payload)
            },
            secretObj.secret ,    // 비밀 키
            {
                expiresIn: '1m'    // 유효 시간은 5분
            }
        );
    
        console.log("create token => " + token);

        ctx.body = [token];
    } else {
        console.log("LOGIN Error");

        ctx.body = "LOGIN Error";
    }
};

// exports.get_token = async (ctx) => {
//     let req = ctx.request.header;
//     //
//     // for (let i in req) {
//     //     console.log("==> " + i + " : " + req[i])
//     // }
//     //
//     console.log("access_token : " + req.access_token);
//     let token = req.access_token;

//     try {
//         let decoded = jwt.verify(token, secretObj.secret);
        
//         console.log("decoded ==> " + decoded);
//         for (let i in decoded) {
//             console.log("==> " + i + " : " + decoded[i])
//         }
    
//         if (decoded) {
//             ctx.body = "권한이 있어서 API 수행 가능";
//         } else {
//             ctx.body = "권한이 없습니다.";
//         }

//     } catch (error) {
//         console.log(" catch error => " + error);
//     }
// };