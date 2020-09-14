
export default {
    // 2가지 타입으로 전송 가능 ...
    // add(state, {data1, data2}) { }
    add(state, s_data) {
        state.c_toolbar.act = "I"
        state.c_form.s_data = s_data
        state.c_form.dialog = true
    },
    //
    //
    seek(state, s_data) {
        state.c_toolbar.act = "U"
        state.c_form.s_data = s_data
        state.c_form.dialog = true
    },   
    //
    //------------------------------------------------------
    // 이하는 db 처리 후 반영되는 부분 
    //------------------------------------------------------
    search(state, payload) {
        state[payload.target]["m_data"] = payload.data
    },
    //
    insert(state, para) {
        let obj = state[para.target]
        let s_data = obj.s_data
        s_data["id"] = para.id
        //
        obj.m_data.unshift(s_data)   // 맨 위에 추가
        //obj.m_data.push(s_data)      // 맨 아래에 추가
        //
        obj.chk_data = [] // 반드시 clear 해줘야 함... -> 배열 추가 후 체크 박스가 모두 체크됨..

        state.c_form.dialog = false // 삭제여부 디이얼로그창 close
    },
    //
    update(state, para) {
        let obj = state[para.target]
        //
        // v-data-table에서는 아래의 2개 모두 컬럼별로 UPDATE가 안됨 ...
        //obj.m_data[obj.idx] = obj.s_data
        //obj.m_data[obj.idx] = Object.assign(obj.s_data)
        
        let s_data = obj.s_data
        let m_data = obj.m_data[obj.idx]
        
        // v-data-table에서는 컬럼별로 move해야 UPDATE가 됨 ...
        for(var i in s_data) {
            console.log(i + "-> " + s_data[i])
            m_data[i] = s_data[i]
        }
        //
        state.c_form.dialog = false // 삭제여부 디이얼로그창 close
    },
    //
    delete(state, para) {
        let obj = state[para.target]
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
        state.c_delete.dialog = false // 디이얼로그창 close
    },        
};