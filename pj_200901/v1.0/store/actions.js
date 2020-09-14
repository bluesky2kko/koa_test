//--------------------------------------------------------
// CORS에서 post는 network 통신을 2번 하는 이유 아래 설명.
//--------------------------------------------------------
// CORS -> Preflight: 요즘은 JSON 타입으로 통신을 하는 경우가 많습니다. 
// 하지만 예를 들어 POST 메서드로 콘텐츠 타입 Application/json으로 통신하는 것은 표준이 아닙니다. 
// 그렇기 때문에 브라우저는 OPTION 이라는 메서드로 서버로 사전 전달을 하여 승인을 받은(204) 후 -> 실제 데이터를 전송(200)합니다.
//
// https://lab.falsy.me/nodejs-express-%ED%86%B5%EC%8B%A0-cors-cors-pre-flight-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0/
// https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS
//----------------------------------
// 1. Request Method: OPTIONS -> 204
// 2. Request Method: POST -> 200
//----------------------------------

export default {
    //-------------------------------------
    // DB SIUD 공통 처리 
    //-------------------------------------
    async axios_siud({commit}, p_arr) {
        // Axios - delete body에 데이터 넣는 법
        // data: {} atrribute를 추가로 넣어주면 된다.
        // post, put에서는 data: {} 선언하면 언됨...(개고생 ...)
        // https://velog.io/@bigbrothershin/Axios-delete-%EC%9A%94%EC%B2%AD-%EC%8B%9C-body%EC%97%90-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%84%A3%EB%8A%94-%EB%B2%95
        //
        // Axios.delete(`/post/like`, {
        //     data: { // 서버에서 ctx.request.body 로 확인할 수 있다.
        //          postId: ...
        //          commentId: ...
        //     },
        //     ...
        // });
        //
        try {
            //return await return_data
            //
            let target = p_arr[0]           // PTree
            let act = p_arr[1]              // S/I/U/D
            let method = p_arr[2]           // get, post, ...
            let url = p_arr[3]              // url
            let ctx_body_para = p_arr[4]    // s_data, {}
            //
            //alert(method + ", " + act + ", " + url + ", " + ctx_body_para)

            await this.$axios[method](url, ctx_body_para)
                .then(res => {
                    //console.log("res : " + res.data)
                    // for(var k in res.data) {
                    //     console.log(res.data[k])
                    //     console.log(k + "-> " + res.data[k])
                    // }
                    let mutation_para = {}
                    mutation_para["target"] = target
        
                    if (act == "I") {
                        //{"id": 0,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"}
                        //alert("affectedRows : " + res.data.affectedRows)
                        //alert("insertId : " + res.data.insertId)
                        if (res.data.affectedRows > 0) {
                            mutation_para["id"] = res.data.insertId
                            commit("insert", mutation_para)
                        }

                    } else if (act == "U") {
                        //{"id": 177,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"}
                        commit("update", mutation_para)

                    } else if (act == "D") {
                        console.log(ctx_body_para)
                        //{"id": [175,176]}
                        if (res.data.affectedRows > 0) {
                            commit("delete", mutation_para)
                        }

                    } else if (act == "S") {
                        //state.c_form.s_data = {id: 0, site_nm: "DDDDD"}                        
                        //state.c_form.s_data = res.data[0]  // 싱글이지만 0번쨰 배열로 처리 안해서 개고생 ...
                        commit("seek", res.data[0])

                    } else if (act == "SM") {
                        //state[target]["m_data"] = res.data
                        mutation_para["data"] = res.data
                        commit("search", mutation_para)

                    } else {
                        this.commit("error/act_error", "act 옵션이 없습니다. PG 확인.")
                    }
                })
                .catch(error => {
                    //alert(error)
                    this.commit("error/act_error", error)
                })

        } catch(e) {
            this.commit("error/act_error", e)

        } finally {
            //return "r_data"
            //return true
        }   
    },
}