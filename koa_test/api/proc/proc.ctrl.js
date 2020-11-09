const sql_comm = require('../../db/sql_comm.js');
const sql_json = require('../../db/procedure.json');
const comm_func = require('../comm/comm.func.js')
//
//
function comm_sql(p_menu, p_cmd) {

    let sql = "";
    let sql_str = sql_json[p_menu][p_cmd];
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
                arr_para.push(req[col_nm]);
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

/*
---------------------------------------------------------
db_config.js 파일에 아래 옵션을 추가해야함...
multipleStatements: true,   // procedure 사용시 적용...
---------------------------------------------------------

---------------------------------------------------
1. INOUT 파라메터가 있는 부분은 아래처럼 -> @test ...
---------------------------------------------------
sql = "SET @test = 1; call pp(@test, 123); SELECT @test as inout_i;";
---------------------------------------------------
2. OUT 파라메터가 있는 부분은 아래처럼 -> @test ...
---------------------------------------------------
sql = "CALL 21cnkc.MEMBERS_IU(?,?,?,?,..., @RESULT); SELECT @RESULT as id;";
---------------------------------------------------
3. INOUT, OUT 파라메터가 없는 경우는 아래처럼
---------------------------------------------------
sql = "CALL 21cnkc.MEMBERS_IU(?,?,?,?,?,?,?,?,?,?);";

arr_para = ["I", 0, "2", "2", "3", "4", "5", "6", "7", "8", "9"];
*/

exports.insert = async (ctx) => {

    //----------------------------------------
    // 공통
    //----------------------------------------
    let menu = ctx.query.menu;
    let sql = comm_sql(menu, "insert");     // procedure.json에서 해당 insert sql 찾기
    //----------------------------------------

    let arr_para = [];
    arr_para = comm_para("post", ctx.request.body);  // [0, 0]; // 배열형식으로 해야함...
    arr_para.unshift("I")   // 맨 위에 추가
    console.log(arr_para);  // ? display
    
    let q_arr_para = [];
    let i;
    for (i in arr_para) {
        q_arr_para.push("?");
    }
    console.log(q_arr_para);  // ? display

    sql = sq.replace("?", q_arr_para);
    console.log(sql);  // ? display

    let result = await sql_comm.siud_transaction(sql, arr_para);    
    /*
    [
        ResultSetHeader {
            fieldCount: 0,
            affectedRows: 2,
            insertId: 0,
            info: '',
            serverStatus: 11,
            warningStatus: 0
        },
        [ TextRow { id: 70 } ]
    ]
    */
    console.log(result);

    console.log("result[0].affectedRows => " + result[0].affectedRows);
    console.log("result[1].affectedRows => " + result[1].affectedRows);
    console.log("id ==> " + result[1][0].id);

    // let aa = result[1][0];
    // for (let i in aa) {
    //     console.log(i + " => " + aa[i]);
    // }

    ctx.body = result;
};

exports.update = async (ctx) => {
    //----------------------------------------
    // 공통
    //----------------------------------------
    let menu = ctx.query.menu;
    let sql = comm_sql(menu, "update");     // procedure.json에서 해당 update sql 찾기
    //----------------------------------------

    let arr_para = [];
    arr_para = comm_para("post", ctx.request.body);  // [0, 0]; // 배열형식으로 해야함...
    arr_para.unshift("U")   // 맨 위에 추가
    console.log(arr_para);  // ? display
    
    let q_arr_para = [];
    let i;
    for (i in arr_para) {
        q_arr_para.push("?");
    }
    console.log(q_arr_para);  // ? display

    sql = sql.replace("?", q_arr_para.toString());
    console.log(sql);  // ? display


    let result = await sql_comm.siud_transaction(sql, arr_para);    
    console.log(result);
    console.log("result[0].affectedRows => " + result[0].affectedRows);
    console.log("result[1].affectedRows => " + result[1].affectedRows);


    ctx.body = result;
};