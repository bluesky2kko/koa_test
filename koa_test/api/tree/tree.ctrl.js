const sql_comm = require('../../db/sql_comm.js');

// POST => http://21cnkc.iptime.org:4000/api/tree
exports.post = async (ctx) => {
    let sql = "";
    let req_json_data = {};
    req_json_data = ctx.request.body;
    //
    //let group_cd = req_json_data.group_cd;
    let group_cd = [1,2,3];
    //
    sql = "SELECT c.id, c.group_nm, c.parent_id, c.group_cd, c.lev, c.pos, x.id as id_members, x.member_nm "
    sql += "FROM group_t c left outer join "
    sql += "    ( "
    sql += "    SELECT * FROM members a, members_basic b "
    sql += "    WHERE a.id = b.id_members "
    sql += "    ) x "
    sql += "ON c.id = x.id_group "
    sql += "WHERE group_cd IN (?) ";

    console.log(sql);

    ctx.body = await sql_comm.siud_normal(sql, [group_cd]);    
};


// GET => http://21cnkc.iptime.org:4000/api/tree?id=50
exports.get_query = async (ctx) => {
    let sql = "";
    let obj = {};

    let id = ctx.query.id;
    console.log("id : " + id);

    sql = "SELECT *, (SELECT group_nm FROM group_t WHERE id=a.parent_id) as group_nm_up " // 상위그룹명...
    sql += "FROM group_t a "
    sql += "WHERE id = ? "

    ctx.body = await sql_comm.siud_normal(sql, [ id ]);
};
