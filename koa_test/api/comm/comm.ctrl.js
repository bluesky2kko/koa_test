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
const comm_func = require('../comm/comm.func.js')
//
//
// GET => http://21cnkc.iptime.org:4000/api/comm/SM?menu=site&site_nm=%%
// GET => http://21cnkc.iptime.org:4000/api/comm/S?menu=site&?id=50

exports.comm_siud = async (ctx) => {
    //----------------------------------------
    // 공통
    //----------------------------------------
    let cmd =  await comm_func.cmd(ctx.request.url);
    let menu = await comm_func.menu(cmd, ctx.query.menu);
    let sql = await comm_func.sql(menu, cmd, ctx.query.menu);
    //----------------------------------------
    let arr_para;

    if (ctx.request.method=="GET") {
        arr_para = await comm_func.para("get", cmd, ctx.query);

    } else if (ctx.request.method=="POST") {
        arr_para = await comm_func.para("post", cmd, ctx.request.body);

    // } else  if (ctx.request.method=="PUT") {
    // } else  if (ctx.request.method=="PATCH") {
    // } else  if (ctx.request.method=="DELETE") {
    }

    console.log(sql);
    console.log(arr_para);
    
    ctx.body = await sql_comm.siud_normal(sql, arr_para);    
};


/*
sqlcon.query('SELECT 1; SELECT 2', function(err, results) {
    if (err) throw err;

    // `results` is an array with one element for every statement in the query:
    console.log(results[0]); // [{1: 1}]
    console.log(results[1]); // [{2: 2}]
});
*/
    

/* multi insert vue 소스 
    async click_insert_multi() {
        alert("click_insert_multi")
        let s_data = {}
        s_data["xxx"] = [
            {
                id: 0,
                site_nm: "xxx",
                login_id: "xxx",
                login_pw: "xxx",
                memo: "xxx"
            },
            {
                id: 0,
                site_nm: "xxx2",
                login_id: "xxx2",
                login_pw: "xxx2",
                memo: "xxx2"
            }
        ]
        //
        let axios_para = {
            method: "post",
            url: this.$store.state.base_url.api + "/comm/MI?menu=site",
            body: s_data
        }
        //
        let { err, obj } = await this.$store.dispatch("axios_return", axios_para)
        alert(err + " : " + obj)
    }
*/        
exports.post_multiInsert = async (ctx) => {
    console.log("body : " + JSON.stringify(ctx.request.body["xxx"]));   // data를 보려고 JSON.stringify 함...
    //
    let arr_req_data = [];
    let arr_row = [];
    let i, j;
    let col_nm = [];
    let arr_para = [];
    //
    arr_req_data = ctx.request.body["xxx"];
    //
    console.log("cnt : " + arr_req_data.length);

    for (i=0; i < arr_req_data.length; i++) {
        arr_row = [];
        for (j in arr_req_data[i]) {
            if (i==0) {
                col_nm.push(j);
            }
            arr_row.push(arr_req_data[i][j]);
        }
        arr_para.push(arr_row)
    }

    const table_nm = ctx.query.menu;

    //const sql = "INSERT INTO site (site_nm, login_id, login_pw, memo) VALUES ?;";
    const sql = "INSERT INTO "+ table_nm +" (" + col_nm + ") VALUES ?;";
    //
    console.log(sql);
    console.log("arr_para : " + JSON.stringify(arr_para));
    //
    ctx.body = await sql_comm.siud_transaction(sql, [arr_para]);
};
