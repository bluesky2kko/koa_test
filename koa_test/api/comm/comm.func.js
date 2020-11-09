const sql_json = require('../../db/sql.json');

module.exports = {
    //
    cmd: function(p_url) {
        console.log(p_url);

        let cmd;
        if (p_url.indexOf("/SM?") > -1) {
            cmd = "search";
        }
        else if (p_url.indexOf("/Q?") > -1) {
            cmd = "inquiry";
        }
        else if (p_url.indexOf("/Q2?") > -1) {
            cmd = "inquiry2";
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
        else if (p_url.indexOf("/U2?") > -1) {
            cmd = "update2";
        }    
        else if (p_url.indexOf("/D?") > -1) {
            cmd = "delete";
        }
    
        console.log("cmd : " + cmd);
    
        return cmd;
    },
    //
    menu: function(p_cmd, p_menu) {
        //
        let menu;
        if (p_cmd=="seek" || p_cmd=="insert" || p_cmd=="update" || p_cmd=="delete") {
            menu = "comm";
        } else {        
            menu = p_menu;  // site, jepun, tree, todo
        }
        console.log("menu : " + menu);
    
        return menu;
    },
    //
    sql: function(p_menu, p_cmd, p_table_nm) {

        //sql = "SELECT * FROM site WHERE site_nm = ?;";
        //let sql = sql_json[tbl][cmd].toString().replace(/,/g, '');
        //
        let sql = "";
        //
        if (p_menu=="comm") {
            sql = sql_json["comm"][p_cmd];
            sql = sql.toString().replace("<table>", p_table_nm);

        } else {
            sql = sql_json[p_menu][p_cmd];

        }
        //
        // sql string으로 만들기...
        let sql_str = "";
        //
        if (Array.isArray(sql)) {
            //
            let i;
            for (i in sql) {
                console.log("==> " + i + " : " + sql[i]);
                sql_str += sql[i];
            }

        } else {
            sql_str = sql;

        }
        
        console.log("SQL : " + sql_str);

        return sql_str;
    },
    para: function(gubun, cmd, req) {
        //
        // https://junspapa-itdev.tistory.com/10
        // 먼저 postman 에서 테스트 후 vue에 적용해보자 ...
        //
        let col_nm;
        let arr_para = [];    // sql 파라메터는 무조건 배열로 통일 ...

        if (gubun=="get") {
            // get
            for (col_nm in req) {
                console.log("get => " + col_nm + " : " + req[col_nm]);
                if (col_nm !== "menu") {
                    arr_para.push(req[col_nm]);
                }
            }
    
        } else {
            // post
            if (cmd=="insert") {
                arr_para.push(req);
        
            }
            else if (cmd=="update") {
            
                let id = req.id;
                console.log("id : " + id);
        
                delete req.id; // update_column 속의 id 컬럼 제거
        
                arr_para.push(req);
                arr_para.push({"id": id});
        
            } 
            else {
                // search, inquery, delete, update2
                // ? 갯수만큼 처리 ...
                for (col_nm in req) {
                    console.log("post => " + col_nm + " : " + req[col_nm]);
                    arr_para.push(req[col_nm]);
                }
            }
        }
        //
        // data를 보려고 JSON.stringify 함...
        // 
        console.log("모두 문자로 보임, 숫자도 문자로 보임");
        console.log("arr_para : " + JSON.stringify(arr_para));

        return arr_para;
    }
}