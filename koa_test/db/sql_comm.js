// 트랜잭션이 아니놈만 처리 ...
exports.siud_normal = async (sql, param) => {
    let rows, fields;
    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            [rows, fields] = await connection.query(sql, param);
            //console.log("rows : " + rows);
            //console.log("fields : " + fields);
            // rows.affectedRows, rows.insertId
            for(var idx in rows) {
                console.log(rows[idx])
            }

        } catch (err) {
            console.log("sql error : " + sql + "\n" + err.sqlMessage);
            rows = "sql error -> LOG 파일 확인 요망...";

        } finally {
            connection.release();
        }

    } catch (err) {
        rows = "connection Error : " + err;

    } finally {
        return rows;
    }
}

// 트랜잭션인 놈만 처리 ...
// sql 도 array 로 여러개 처리 하도록 수저 필요함 ...
exports.siud_transaction = async (sql, param) => {
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

        } catch (err) {
            await connection.rollback(); // ROLLBACK
            console.log("sql rollback : " + sql + "\n" + err.sqlMessage);
            rows = "sql rollback -> LOG 파일 확인 요망...";

        } finally {
            connection.release();
        }

    } catch (err) {
        rows = "connection Error : " + err;

    } finally {
        return rows;
    }
};
