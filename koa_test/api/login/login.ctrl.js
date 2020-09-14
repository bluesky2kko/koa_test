const sql_comm = require('../../db/sql_comm.js');

// POST => http://21cnkc.iptime.org:4000/api/login
exports.post_login = async (ctx) => {
    //{"login_id": "joncc", "login_pw": "..."}
    let sql = "";
    let req_json_data = {};
    req_json_data = ctx.request.body;
    //
    let id = req_json_data.login_id;
    let pw = req_json_data.login_pw;
    
    sql = "SELECT json_value(data,'$.login_id') as login_id "
    sql += "FROM json_login a "
    sql += "WHERE json_value(data,'$.login_id') = ? "
    sql += "AND json_value(data,'$.login_pw') = ? ";

    console.log(id + " : " + pw);
    
    ctx.body = await sql_comm.siud_normal(sql, [id, pw]);
};
//
exports.get_token = async (ctx) => {
    let sql = "";
    let req_json_data = {};
    req_json_data = ctx.request.body;
    //
    let id = req_json_data.login_id;
    
    sql = "SELECT * "
    sql += "FROM json_login a "
    sql += "WHERE json_value(data,'$.login_id') = ? ";

    console.log(id + " : ");
    
    ctx.body = await sql_comm.siud_normal(sql, [id]);
};