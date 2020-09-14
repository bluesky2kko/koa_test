export default {
    //
    click_treeview_ptree(state, item)  {
        let s_data = this.state.c_form.s_data
        //
        s_data.parent_id = item.id
        s_data.group_cd = item.group_cd
        s_data.group_nm_up = item.name
        s_data.lev = parseInt(item.lev) + 1
        s_data.pos = 1 // 동일그룹 count해서 + 1 값 ???
        s_data.icon = "folder"
    },
    click_treeview_pmember(state, item)  {
        let s_data = this.state.c_form.s_data
        //
        s_data.parent_id = item.id
        s_data.group_nm = item.name
    },
    click_daumpost_pmember(state, obj)  {
        let idx = this.state.c_daum_post.idx
        //
        let s_data = this.state.c_form.s_data
        s_data.s_arr_addr[idx].zipno = obj.zipno
        s_data.s_arr_addr[idx].txt_val = obj.txt_val
        //
        console.log(s_data.s_arr_addr[idx].txt_val)
    },
}