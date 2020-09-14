//[{"id": 0,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"},{"id": 0,"site_nm": "www2","login_id": "www2","login_pw": "www2","memo": "메모2"}]
// string data는 stringify 후 parse하여 배열 처리 가능...
// json_data = JSON.stringify(ctx.request.body);
// json_data = JSON.parse(json_data);
// console.log(json_data[0]);
// console.log(json_data[1]);
//---------------------------------

// 다중 QUERY 참조
// https://junspapa-itdev.tistory.com/10
// https://know-thy-code.com/multiple-inserts-mysql/
// 매개 변수 바인딩 사용 참조 할 것 ...

// GET => http://21cnkc.iptime.org:4000/api/books?id=50
// 참조 => https://holywater-jeong.github.io/2018/06/08/node-mysql-async-await


const sql_comm = require('../../db/sql_comm.js');

// GET => http://21cnkc.iptime.org:4000/api/books/search?site_nm=google
exports.get_search = async (ctx) => {
    let sql = "";
    let site_nm = ctx.query.site_nm;
    console.log("site_nm : " + site_nm);

    sql = "SELECT * FROM site WHERE site_nm like ?;";
    ctx.body = await sql_comm.siud_normal(sql, [ '%'+site_nm+'%' ]);
};


// GET => http://21cnkc.iptime.org:4000/api/books?id=50
exports.get_query = async (ctx) => {
    //postman : GET : BODY 이하 관련 없음
    let sql = "";
    let obj = {};

    let id = ctx.query.id;
    obj["param"] = { "id": id };
    console.log("id : " + id);

    sql = "SELECT * FROM site WHERE id = ?;";
    ctx.body = await sql_comm.siud_normal(sql, [ id ]);  // [ obj["param"] ] 배열로 -> ?, ?, ... 물음표 만큼 배열 처리...
    // 또는 아래처럼 ...
    //sql = "SELECT * FROM site WHERE ?;";
    //ctx.body = await sql_comm.siud_normal(sql, [ obj["param"] ]);  // [ obj["param"] ] 배열로 -> ?, ?, ... 물음표 만큼 배열 처리...    

    //--------------------------------------------------------------------------
    // 서버에서 select한 자료를 변수에 저장 하지 않는다 ... (쓸데없는 공간 차지함.)
    // 대신 클라이 언트에서 오류 및 display 판단 체크 한다.
    //--------------------------------------------------------------------------
    /*
    console.log(return_data.length);]
    if (return_data == "") {
        let col_nm = {};
        for(var idx in fields) {
            col_nm[fields[idx].name] = null;
            console.log("fields : " + fields[idx].name);
        }
        ctx.body = fields;
        ctx.body = col_nm;
        ctx.body = "data not found";
    } else {
        // client pg 에서는 배열인지 체크하여 -> 배열이 아니면 오류 처리
        // 1. if data not found
        // 2. error msg 처리 
        ctx.body = return_data;
    }
    */
};

// GET => http://21cnkc.iptime.org:4000/api/books/10
exports.get_params = async (ctx) => {
    //postman : GET : BODY 이하 관련 없음
    let sql = "";
    let obj = {};
    //
    let cnt = parseInt(ctx.params.cnt);     // 숫자 타입 반드시 parseInt 적용바람 => 개고생 ...
    console.log(":cnt => " + cnt);

    sql = "SELECT * FROM site LIMIT ?;";
    ctx.body = await sql_comm.siud_normal(sql, [ cnt ]);  // [ cnt ] 배열로 -> ?, ?, ... 물음표 만큼 배열 처리...
};

// http://21cnkc.iptime.org:4000/api/books
exports.post_insert = async (ctx) => {
    //postman : POST : BODY -> raw -> JSON 타입 -> 
    //{"id": 0,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"}
    let sql = "";
    let req_json_data = {};
    //
    //const { id, site_nm, login_id, login_pw, memo } = ctx.request.body;
    req_json_data = ctx.request.body;
    //
    sql = "INSERT INTO site SET ?;";
    ctx.body = await sql_comm.siud_normal(sql, req_json_data);
};

// http://21cnkc.iptime.org:4000/api/books/multiInsert
exports.post_multiInsert = async (ctx) => {
    //postman : POST : BODY -> raw -> JSON 타입 -> 
    //[{"id": 0,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"},{"id": 0,"site_nm": "www2","login_id": "www2","login_pw": "www2","memo": "메모2"}]
    let sql = "";
    let arr_req_data = [];
    let arr_data = [];
    // let arr_json_data = [
    // 	[0, 'www', 'www', 'www', 'memo'],
    // 	[9, 'www2', 'www2', 'www2', 'memo2']
    // ];
    arr_req_data = ctx.request.body;
    //
    for (var i = 0; i < arr_req_data.length; i++) {
        // push 할떄 배열형식 [컬럼1, 컬럼2, ...]으로 해야함 => 아주 중요 ...
        arr_data.push( [arr_req_data[i].id, arr_req_data[i].site_nm, arr_req_data[i].login_id, arr_req_data[i].login_pw, arr_req_data[i].memo] );
        console.log(arr_data[i]);
    }
    //

    sql = "INSERT INTO site (id, site_nm, login_id, login_pw, memo) VALUES ?;";
    ctx.body = await sql_comm.siud_transaction(sql, [arr_data]);
};

// http://21cnkc.iptime.org:4000/api/books
// patch vs put의 차이점
// PATCH : 자원의 부분 교체
exports.patch_update = async (ctx) => {
    //postman : PATCH : BODY -> raw -> JSON 타입 -> 
    //{"id": 206, "memo": "메모---"}
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
    sql = "UPDATE site SET ? WHERE ?;";
    ctx.body = await sql_comm.siud_normal(sql, arr_json_data);
};

// http://21cnkc.iptime.org:4000/api/books
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
    sql = "UPDATE site SET ? WHERE ?;";
    ctx.body = await sql_comm.siud_normal(sql, arr_json_data);
};

// http://21cnkc.iptime.org:4000/api/books
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
    
    console.log(arr_id);

    // 1개 또는 여러게 삭제 가능 ...
    sql = "DELETE FROM site WHERE id IN (?)";
    ctx.body = await sql_comm.siud_normal(sql, [arr_id]);    
};
