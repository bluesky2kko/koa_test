// 트랜잭션이 아닌놈만 처리 ...
exports.siud_normal = async (sql, param) => {
    let result = {
        err: true,
        obj: null
    };
    //    
    let rows, fields;
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            [rows, fields] = await connection.query(sql, param);
            //console.log("fields : " + fields);
            //
            // for(let ii in rows) {
            //     console.log(ii + " : " + rows[ii]);
            // }
            console.log("건수 : " + rows.length);
            //
            result["err"] = false;
            result["obj"] = rows;

        } catch (err) {
            console.log("sql rollback : " + sql + "\n" + err.sqlMessage);
            result["obj"] = "sql rollback : " + sql + "\n" + err.sqlMessage;

        } finally {
            connection.release();
        }

    } catch (err) {
        console.log("sql error : " + sql + "\n" + err.sqlMessage);
        result["obj"] = "sql error : " + sql + "\n" + err.sqlMessage;

    } finally {
        return result;
    }
}

// 트랜잭션인 놈만 처리 ...
// sql 도 array 로 여러개 처리 하도록 수저 필요함 ...
exports.siud_transaction = async (sql, param) => {
    let result = {
        err: true,
        obj: null
    };
    //    
    let rows, fields;
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            await connection.beginTransaction(); // START TRANSACTION

            [rows, fields] = await connection.query(sql, param);
            console.log("rows : " + rows);
            console.log("fields : " + fields);
            //
            await connection.commit(); // COMMIT
            // rows.affectedRows, rows.insertId

            result["err"] = false;
            result["obj"] = rows;

        } catch (err) {
            await connection.rollback(); // ROLLBACK
            console.log("sql rollback : " + sql + "\n" + err.sqlMessage);
            result["obj"] = "sql rollback : " + sql + "\n" + err.sqlMessage;

        } finally {
            connection.release();
        }

    } catch (err) {
        console.log("connection Error : " + err);
        result["obj"] = "connection Error : " + err;

    } finally {
        return result;
    }
};

// sql 도 array 로 여러개 처리 하도록 수저 필요함 ...
exports.md_transaction = async (master_pk_id, master_sql, detail_sql) => {
    //
    let result = {
        err: true,
        obj: null
    };
    //
    let rows, fields;

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            await connection.beginTransaction(); // START TRANSACTION

            // 1. master 처리 (id 구하기)
            [rows, fields] = await connection.query(master_sql);
            console.log("rows : " + rows);
            console.log("fields : " + fields);

            // 2. detail 처리 ...
            // 정규식에서 사용하는 특수문자 . ^ ( ) 를 치환할 때는 escape(\) 문자를 붙여 주어야 한다.
            // str.replace(/\./, "!");  => .를 !로 치환...
            if (rows.affectedRows > 0) {
                if (master_pk_id == 0) {
                    master_pk_id = rows.insertId;      // insert 인 경우 적용 ...
                }

                detail_sql = detail_sql.replace(/'@=pk_id=@'/gi, master_pk_id);    // master pk값 replace
                console.log("md_transaction : detail_sql ==> " + detail_sql);
    
                [rows, fields] = await connection.query(detail_sql);
                console.log("rows : " + rows);
                console.log("fields : " + fields);
                //
                await connection.commit(); // COMMIT
                // rows.affectedRows, rows.insertId
                result["err"] = false;
                result["obj"] = master_pk_id;

            } else {
                console.log("rows.affectedRows : 0 -> insert or update error ");
                result["obj"] = "rows.affectedRows : 0 -> insert or update error ";

            }

        } catch (err) {
            await connection.rollback(); // ROLLBACK
            console.log("sql rollback : " + err.sqlMessage);
            result["obj"] = "sql rollback : " + err.sqlMessage;

        } finally {
            connection.release();
        }

    } catch (err) {
        console.log("connection Error : " + err);
        result["obj"] = "connection Error : " + err;

    } finally {
        return result;
    }
};

