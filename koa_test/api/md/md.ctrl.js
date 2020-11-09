const sql_comm = require('../../db/sql_comm.js');
const md_json = require('../../db/master_detail.json');
//
let  mysql = require('mysql');  // mysql 모듈 import 해야 함...
//
// nodejs mysql 다중쿼리
// 참조 => https://junspapa-itdev.tistory.com/10
// 무조건 array로 만들어 처리 => 소스 통일성
//
function call_array_make(tmp_data) {
    //
    let p_data = [];
    if (Array.isArray(tmp_data)) {        
        p_data = tmp_data;
    } else {
        p_data.push(tmp_data);
    }

    return p_data;
}
//
function call_iu_sql(p_table_nm, p_data) {
    let sql_total = "";
    let sql = "";
    //
    if (Array.isArray(p_data)) {
        p_data.forEach(function(item){
            if (item.id==0) {
                sql = "INSERT INTO " + p_table_nm + " SET ?; ";
                //
                sql_total += mysql.format(sql, item);

            } else {
                sql = "UPDATE " + p_table_nm + " SET ? WHERE ?; ";
                //
                let id = item.id;
                delete item.id; // update_column 속의 id 컬럼 제거 
                //
                let para = [item, {"id":id}];
                //
                sql_total += mysql.format(sql, para);

            }
        });
    }

    return sql_total;
}
//
function call_del_sql(arr_delete) {
    let sql_total = "";
    let sql = "";
    let table_nm = "";
    let id = 0;
    let ii;
    let item = [];
    //
    for (ii in arr_delete) {
        //
        table_nm = arr_delete[ii].table_nm;
        id = arr_delete[ii].id;
        //
        item.push({"id": id});

        sql = "DELETE FROM " + table_nm + " WHERE ?; ";
        sql_total += mysql.format(sql, item);
    }

    return sql_total;
}
//
exports.iud = async (ctx) => {
    // let arr_para = ctx.request.body["members"];
    // for (let k in arr_para) {
    //     console.log(" >>> " + k + " : " + arr_para[k]);
    // }
    //----------------------------------------
    // master 테이블 SQL 생성
    //----------------------------------------
    // let btn_cmd = "insert";
    // if (p_url.indexOf("/U?") > -1) {
    //     btn_cmd = "update";
    // }
    //    
    const menu = ctx.query.menu;   // members, ..
    console.log("menu : " + menu);
    //----------------------------------------
    // detail 테이블 INSERT, UPDATE SQL 생성
    //----------------------------------------
    //"members": ["members", "members_basic", "members_tel", "members_fax", "members_email", "members_sotial", "members_anvday", "members_addr"],
    const arr_table = md_json[menu];
    let table_nm = arr_table[0];    // 0번쨰는 무조건 master table 임 ...
    let p_data = call_array_make(ctx.request.body[table_nm]);   // 무조건 배열 형태로 바꿈...
    let master_pk_id = p_data[0].id;
    const master_sql = call_iu_sql(table_nm, p_data);


    console.log("arr_table : " + arr_table);
    console.log("table_nm : " + table_nm);    
    console.log("p_data : " + JSON.stringify(p_data));
    console.log("master_sql : " + master_sql);

    //
    let detail_sql = "";

    let ii;
    for (ii=1; ii < arr_table.length; ii++) {
        table_nm = arr_table[ii];
        p_data = call_array_make(ctx.request.body[table_nm]);   // 무조건 배열 형태로 바꿈...
        detail_sql += call_iu_sql(table_nm, p_data);
        //
        //console.log("p_data.length : " + p_data.length);
        // json값을 display 시키기 위함...
        console.log("detail_table_nm : " + table_nm);
        console.log("p_data : " + JSON.stringify(p_data));
    }

    //----------------------------------------
    // detail 테이블 DELETE SQL 생성
    //----------------------------------------
    const arr_delete = ctx.request.body["arr_delete"];
    if (arr_delete.length > 0) {
        detail_sql += call_del_sql(arr_delete);
        //
        console.log("delete : detail_sql => " + detail_sql);
    }
    
    //
    const result  = await sql_comm.md_transaction(master_pk_id, master_sql, detail_sql);

    // 이하 정리 필요...
    if (result["err"] == false) {
        const id = result["obj"];
        console.log("id ==> " + id);
        //ctx.redirect('http://21cnkc.iptime.org:4000/api');
        ctx.redirect("/api/comm/Q2?menu="+menu+"&id="+id);   // Q2 : inquiry => 1줄 삽입
        
    } else {
        ctx.body = result;

    }
    //
};

exports.delete = async (ctx) => {
    //
};
