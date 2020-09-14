
export const mutations = {
    //-----------------------------------------------------
    // 오른쪽 slide open / close 처리...
    //-----------------------------------------------------
    right_slide_open(state, cpnt_nm) {
        //alert("cpnt_nm : " + cpnt_nm)
        this.state.drawer.right.cpnt_nm = cpnt_nm
        this.state.drawer.right.open = true
    },
    right_slide_close(state) {
        this.state.drawer.right.open = false
    },
    //  
    act_error(state, error) {
        //alert(error)
        this.state.cerrormsg_dialog.msg = error
        this.state.cerrormsg_dialog.confirm_cpnt_nm = "CErrorMsg" // CPdfPrint, CDelete, CErrorMsg
        this.state.cerrormsg_dialog.open_yn = true
    },
    //
    click_treeview_ptree(state, item)  {
        let s_data = this.state.PTree.s_data
        //
        s_data.parent_id = item.id
        s_data.group_cd = item.group_cd
        s_data.group_nm_up = item.name
        s_data.lev = parseInt(item.lev) + 1
        s_data.pos = 1 // 동일그룹 count해서 + 1 값 ???
        s_data.icon = "folder"
    },
    click_treeview_pmember(state, item)  {
        let s_data = this.state.PMember.s_data
        //
        s_data.parent_id = item.id
        s_data.group_nm = item.name
    },
    //
    //
    // 2가지 타입으로 전송 가능 ...
    // add(state, {data1, data2}) { }
    add(state, payload) {
        this.state[payload.target]["s_data"] = payload.data

        this.state.c_toolbar.act = "I"
        //
        // 보내는쪽
        //window.$nuxt.$emit("PTree.click_add", para);
        //
        // 받는쪽 mounted에서 아래처럼...
        //this.$nuxt.$on("PTree.click_add", (para) => { ... })
    },
    //
    //------------------------------------------------------
    // 이하는 db 처리 후 반영되는 부분 
    //------------------------------------------------------
    search(state, payload) {
        this.state[payload.target]["m_data"] = payload.data
    },
    //
    seek(state, payload) {
        this.state[payload.target]["s_data"] = payload.data

        this.state.c_toolbar.act = "U"
    },
    //
    //
    insert(state, para) {
        let obj = this.state[para.target]
        let s_data = obj.s_data
        s_data["id"] = para.id
        //
        obj.m_data.unshift(s_data)   // 맨 위에 추가
        //obj.m_data.push(s_data)      // 맨 아래에 추가
        //
        obj.chk_data = [] // 반드시 clear 해줘야 함... -> 배열 추가 후 체크 박스가 모두 체크됨..
        obj.dialog = false // 입력 다이알로그창 close   
    },
    //
    update(state, para) {
        let obj = this.state[para.target]
        let s_data = obj.s_data
        let m_data = obj.m_data[obj.idx]
        //
        // 컬럼별로 move해야 UPDATE가 됨 ...
        for(var i in s_data) {
            console.log(i + "-> " + s_data[i])
            m_data[i] = s_data[i]
        }
        //
        obj.dialog = false // 입력 다이알로그창 close
    },
    //
    delete(state, para) {
        let obj = this.state[para.target]
        let i, idx
        let cnt = obj.chk_data.length
        console.log("cnt : " + cnt)	
        //
        for (i = 0; i < cnt; i++) {
            idx =
                obj.m_data.findIndex(function(item) {
                    return item.id === obj.chk_data[i].id
                })
            //
            console.log(idx + " : " + obj.chk_data[i].id)	// obj.chk_data[i] -> :value="item.id"
                //
            if (idx > -1) {
                // 1줄 삭제
                obj.m_data.splice(idx, 1)
            }
        }
        // 초기화 ...
        obj.chk_data = []
        //
        // 입력 다이알로그창이 있으면 close 없으면 말구 v-data-table에서는 없음 ...
        obj.dialog = false 
    },        
};