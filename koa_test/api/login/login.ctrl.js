const sql_comm = require('../../db/sql_comm.js');

// POST => http://21cnkc.iptime.org:4000/api/login
exports.post_login = async (ctx) => {

    //{"login_id": "joncc", "login_pw": "..."}
    let req = ctx.request.body;
    let id = req.login_id;
    let pw = req.login_pw;
    //console.log(id + " / " + pw);
    
    let sql = "SELECT COUNT(login_id) as cnt FROM login WHERE login_id = ? AND login_pw = ?;";

    let result = await sql_comm.siud_normal(sql, [id, pw]);
    console.log("cnt : " + result.obj[0].cnt);

    if (result.obj[0].cnt > 0) {
        
        const token = require('../../config/token.js');

        const token_value = await token.setToken();
        console.log("token_value : " + token_value);
        //
        if (token_value == "Error") {
            result["err"] = true;
            result["obj"] = "Token Error";
        } else {
            //
            result["err"] = false;
            result["obj"] = [token_value];   // 배열 형태로 리턴
        }

    } else {
        console.log("LOGIN Error");
        //
        result["err"] = true;
        result["obj"] = "아이디 또는 비밀번호을 확인 바람니다.";
    }

    ctx.body = result;
};
