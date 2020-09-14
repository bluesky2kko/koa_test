const sql_comm = require('../../db/sql_comm.js');

// GET => http://21cnkc.iptime.org:4000/api/jepun/search?prod_nm=교원
exports.get_search = async (ctx) => {
    let sql = "";
    let prod_nm = ctx.query.prod_nm;
    console.log("prod_nm : " + prod_nm);

    sql = "SELECT * FROM prod_nk WHERE prod_nm like ?;";
    ctx.body = await sql_comm.siud_normal(sql, [ '%'+prod_nm+'%' ]);
};


// GET => http://21cnkc.iptime.org:4000/api/jepum?id=50
exports.get_query = async (ctx) => {
    let sql = "";
    let obj = {};

    let id = ctx.query.id;
    console.log("id : " + id);

    sql = "SELECT * "
    sql += "FROM prod_nk "
    sql += "WHERE id = ? "

    ctx.body = await sql_comm.siud_normal(sql, [ id ]);
};

// http://21cnkc.iptime.org:4000/api/jepum
exports.post_insert = async (ctx) => {
    //postman : POST : BODY -> raw -> JSON 타입 -> 
    //{"id": 0,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"}
    let sql = "";
    let req_json_data = {};
    //
    //const { id, site_nm, login_id, login_pw, memo } = ctx.request.body;
    req_json_data = ctx.request.body;
    //
    sql = "INSERT INTO prod_nk SET ?;";
    ctx.body = await sql_comm.siud_normal(sql, req_json_data);
};


// http://21cnkc.iptime.org:4000/api/site
// patch vs put의 차이점
// PATCH : 자원의 전체 교체
exports.put_update = async (ctx) => {
    //postman : PUT : BODY -> raw -> JSON 타입 -> 
    //{"id": 206,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"}
    let sql = "";
    let req_json_data = {};
    let id = 0;
    let arr_json_data = [];
    //
    req_json_data = ctx.request.body;
    id = req_json_data.id;
    console.log(req_json_data);
    console.log(id);

    delete req_json_data.id; // update_column 속의 id 컬럼 제거 
    console.log(req_json_data);
            
    arr_json_data.push(req_json_data);
    arr_json_data.push({"id": id});

    // 싱글용 UPDATE
    sql = "UPDATE prod_nk SET ? WHERE ?;";
    ctx.body = await sql_comm.siud_normal(sql, arr_json_data);
};


// http://21cnkc.iptime.org:4000/api/jepum
exports.delete = async (ctx) => {
    //postman : DELETE : BODY -> raw -> JSON 타입 -> 
    //{"id": [175,176]}
    let sql = "";
    let req_json_data = {};
    let arr_id = [];
    //
    req_json_data = ctx.request.body;
    arr_id = req_json_data.id;
    //또는 아래와 같이 ...
    //arr_id.push(200);
    //arr_id.push(205);
    
    console.log("arr_id : " + arr_id);

    // 1개 또는 여러게 삭제 가능 ...
    sql = "DELETE FROM prod_nk WHERE id IN (?)";
    ctx.body = await sql_comm.siud_normal(sql, [arr_id]);    
};
