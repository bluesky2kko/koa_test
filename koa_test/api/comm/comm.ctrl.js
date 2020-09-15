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

    //
    // 포스트맨 테스트
    // DELETE : BODY -> raw -> JSON 타입 -> {"id": [175,176]}
    //
    // 1개 또는 여러게 삭제 가능 ...
    //sql = "DELETE FROM site WHERE id IN (?);";

    
//--------------------------------------------------------------------------
// 서버에서 select한 자료를 변수에 저장 하지 않는다 ... (쓸데없는 공간 차지함.)
// 대신 클라이언트에서 오류 및 display 판단 체크 한다.
//--------------------------------------------------------------------------
/*
http://test.com/path1/path2/1?q=test
router.get('/path1/path2/:userId', (req, res) => {
    console.log(req.params.userId);        // "1"
    console.log(req.query.q);              // "test"
});
*/

    // req.body.params는  JSON.parse() 하면 안됨...???
    // .get 또는 .delete는 clicnt에서 올라오는 json은 배열이건, 오브젝트이건 -> string이므로 parse로 해야함...???
    // 
    // console.log("body : " + JSON.stringify(ctx.request.body) // data를 보려고 JSON.stringify 함...
    // let cond = JSON.parse(para.cond);
    //

    // SQL컬럼명이 있으면 ? 갯수 많큼  배열로 선언


const sql_comm = require('../../db/sql_comm.js');
//
const sql_json = require('../../db/sql.json');


//
function comm_cmd(p_url) {
    //
    console.log(p_url);

    let cmd;
    if (p_url.indexOf("/SM?") > -1) {
        cmd = "search";
    }
    else if (p_url.indexOf("/INQ?") > -1) {
        cmd = "inquiry";
    }
    //
    else if (p_url.indexOf("/S?") > -1) {
        cmd = "seek";
    }
    else if (p_url.indexOf("/I?") > -1) {
        cmd = "insert";
    } 
    else if (p_url.indexOf("/U?") > -1) {
        cmd = "update";
    }
    else if (p_url.indexOf("/D?") > -1) {
        cmd = "delete";
    }

    console.log("cmd : " + cmd);

    return cmd;
}


//
function comm_menu(p_cmd, p_menu) {
    //
    let menu;
    if (p_cmd=="search" || p_cmd=="inquiry") {
        menu = p_menu;
    } else {
        // seek, insert, update, delete
        menu = "comm";
    }
    console.log("menu : " + menu);

    return menu;
}

//
function comm_sql(p_menu, p_table_nm, p_cmd) {

    //sql = "SELECT * FROM site WHERE site_nm = ?;";
    //let sql = sql_json[tbl][cmd].toString().replace(/,/g, '');
    //
    let sql_str = "";
    //
    if (p_menu=="comm") {
        sql_str = sql_json["comm"][p_cmd];
        sql_str = sql_str.toString().replace("<table>", p_table_nm);

    } else {
        sql_str = sql_json[p_menu][p_cmd];

    }
    //
    //
    let sql = "";
    //
    if (Array.isArray(sql_str)) {
        //
        let i;
        for (i in sql_str) {
            console.log("==> " + i + " : " + sql_str[i]);
            sql += sql_str[i];
        }

    } else {
        sql = sql_str;

        console.log("SQL : " + sql);

    }
    
    return sql;
}

//
function comm_para(gubun, req) {
    //
    // https://junspapa-itdev.tistory.com/10
    // 먼저 postman 에서 테스트 후 vue에 적용해보자 ...
    //
    let col_nm;
    let arr_para = [];    // sql 파라메터는 무조건 배열로 통일 ...

    if (gubun=="get") {
        // get
        for (col_nm in req) {
            console.log("para(col_nm) => " + col_nm + " : " + req[col_nm]);
            if (col_nm !== "menu") {
                arr_para.push(req[col_nm])
            }
        }

    } else {
        // post
        for (col_nm in req) {
            console.log("para(col_nm) => " + col_nm + " : " + req[col_nm]);
            arr_para.push(req[col_nm]);
        }
    }


    console.log("arr_para : " + arr_para);

    return arr_para;
}


// GET => http://21cnkc.iptime.org:4000/api/comm/SM?menu=site&site_nm=%%
// GET => http://21cnkc.iptime.org:4000/api/comm/S?menu=site&?id=50
exports.get_query = async (ctx) => {
    //----------------------------------------
    // 공통
    //----------------------------------------
    let cmd =  comm_cmd(ctx.request.url);
    let menu = comm_menu(cmd, ctx.query.menu);
    let table_nm = ctx.query.menu;
    let sql = comm_sql(menu, table_nm, cmd);
    //console.log("table_nm : " + table_nm);
    //----------------------------------------


    let arr_para = comm_para("get", ctx.query);

    ctx.body = await sql_comm.siud_normal(sql, arr_para);
};

// http://21cnkc.iptime.org:4000/api/books
exports.post_siud = async (ctx) => {
    //----------------------------------------
    // 공통
    //----------------------------------------
    let cmd =  comm_cmd(ctx.request.url);
    let menu = comm_menu(cmd, ctx.query.menu);
    let table_nm = ctx.query.menu;
    let sql = comm_sql(menu, table_nm, cmd);
    //console.log("table_nm : " + table_nm);
    //----------------------------------------


    let arr_para = [];

    if (cmd=="insert") {
        arr_para.push(ctx.request.body);

    }
    else if (cmd=="update") {
    
        let req = ctx.request.body;
        let id = req.id;
        console.log("id : " + id)

        delete req.id; // update_column 속의 id 컬럼 제거

        arr_para.push(req);
        arr_para.push({"id": id});

    } 
    else {
        // search, inquery, delete
        arr_para = comm_para("post", ctx.request.body);

    }
    
    ctx.body = await sql_comm.siud_normal(sql, arr_para);    
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
        arr_data.push(
            [
                arr_req_data[i].id, arr_req_data[i].site_nm, arr_req_data[i].login_id, arr_req_data[i].login_pw, arr_req_data[i].memo
            ]
        );
        console.log(arr_data[i]);
    }
    //

    sql = "INSERT INTO site (id, site_nm, login_id, login_pw, memo) VALUES ?;";
    ctx.body = await sql_comm.siud_transaction(sql, [arr_data]);
};
