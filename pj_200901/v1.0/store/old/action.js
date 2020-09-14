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

export const actions = {
    //참조: https://stackabuse.com/the-node-js-request-module/
    // 즉, 파일이 아닌 데이터를 통해 서버에 전달할 수 있습니다 .
    //------------------------------------------------
    // 현재, CMemberForm.vue에서 사용 ...
    //------------------------------------------------
    async axios_upload(store, db_para) {
        let obj = {}
        obj["p1"] = "para3" // image 이외의 param
        obj["p2"] = "para4" // image 이외의 param
            //
        let formData = new FormData()
        formData.append('data', JSON.stringify(obj))
            //
        let files = db_para.ctx_body_para
        let i
        //alert(files)
        //
        if (files.length > 0) {
            for (i = 0; i < files.length; i++) {
                formData.append('files[' + i + ']', files[i])
            }
        } else {
            // 배열이 아니면 ...
            for (i in files) {
                console.log(i + " : " + files[i])
            }
            formData.append('files', files)
        }
        //

        //let config = { headers: { 'Content-Type': 'multipart/form-data' } }
        //
        await this.$axios
            .post("http://21cnkc.iptime.org:4000/api/updown", formData)
            //.post("http://21cnkc.iptime.org:4000/api/updown", formData, config)
            .then(res => {
                console.log(res)
                //업로드 실패시에만 s_data.sajin을 아이콘으로 설정함...
                if (res.data.error_code !=0) {

                    this.commit("mutation/act_error", res.data.error_message)
                }
            })
            .catch(error => {
                //alert(error)
                this.commit("mutation/act_error", error)
            })
            .finally(() => {
                //alert("finally")
                //this.loading = false
            })
    },
    //-------------------------------------
    // DB 처리 후 -> 리턴 처리
    //-------------------------------------
    async axios_return(store, db_para) {
        let result =  {
            err: false,
            obj: {}
        }
        //        
        try {       
            await this.$axios.post(db_para.url, db_para.ctx_body_para)
                .then(res => {

                    // for(var k in res) {
                    //     console.log(k + "-> " + res[k])
                    // }          
                    
                    console.log("-> " + res.data[0])

                    if (db_para.act == "S") {              
                        if (res.data[0]===undefined) {
                            result.err = true
                            result.obj = "not found data"
                        } else {
                            result.obj = res.data[0]
                        }

                    } else if (db_para.act == "SM") {                        
                        result.obj = res.data

                    } else if (db_para.act == "DOWNLOAD") {                        
                        result.obj = res.data

                    } else if (db_para.act == "LGUPLUS") {
                        console.log(res.data)
                        result.obj = res.data
                        
                    }
                })
                .catch(error => {
                    result.err = true, 
                    result.obj = error
                })
        } catch(e) {
            result.err = true, 
            result.obj = e
        } finally {
            return result
        }
    },
    async axios_token(store) {
        let token = localStorage.getItem("access_token")
        let config = {
            headers: {
                "access-token": token
            }
        }
        //
        let url = "http://21cnkc.iptime.org:4000/api/login/token"

        try {
            await this.$axios.get(url, config)
            .then(res => {
                console.log(res)
                this.commit("mutation/token_info", res.data[0])
                //
                this.$router.push("./site/PSite")
            })

        } catch(e) {
            this.commit("mutation/act_error", e)

        } finally {
            //return "r_data"
            //return true
        }   
    },
    //-------------------------------------
    // DB 공통 처리 
    //-------------------------------------
    async axios_siud(store, db_para) {
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
            let target = db_para.target
            let method = db_para.method
            let act = db_para.act
            let url = db_para.url
            let ctx_body_para = db_para.ctx_body_para
            //
            let mutation_para = {}
            mutation_para["target"] = target

            //alert(method + ", " + act + ", " + url + ", " + ctx_body_para)

            await this.$axios[method](url, ctx_body_para)
                .then(res => {
                    //console.log("res : " + res.data)
                    // for(var k in res.data) {
                    //     console.log(res.data[k])
                    //     console.log(k + "-> " + res.data[k])
                    // }
                    if (act == "I") {
                        //{"id": 0,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"}
                        //alert("affectedRows : " + res.data.affectedRows)
                        //alert("insertId : " + res.data.insertId)
                        if (res.data.affectedRows > 0) {
                            mutation_para["id"] = res.data.insertId
                            this.commit("mutation/insert", mutation_para)
                        }

                    } else if (act == "U") {
                        //{"id": 177,"site_nm": "www","login_id": "www","login_pw": "www","memo": "메모"}
                        this.commit("mutation/update", mutation_para)

                    } else if (act == "D") {
                        console.log(ctx_body_para)
                        //{"id": [175,176]}
                        if (res.data.affectedRows > 0) {
                            this.commit("mutation/delete", mutation_para)
                        }                        

                    } else if (act == "S") {
                        //this.state.CSite.s_data = {id: 0, site_nm: "DDDDD"}                        
                        //this.state[target]["s_data"] = res.data[0]  // 싱글이지만 0번쨰 배열로 처리 안해서 개고생 ...
                        if (res.data[0]===undefined) {
                            this.commit("mutation/act_error", "data not found")
                        } else {
                            mutation_para["data"] = res.data[0]
                            this.commit("mutation/seek", mutation_para)
                        }                        

                    } else if (act == "SM") {
                        //this.state[target]["m_data"] = res.data
                        mutation_para["data"] = res.data
                        this.commit("mutation/search", mutation_para)

                    } else {
                        this.commit("mutation/act_error", "act 옵션이 없습니다. PG 확인.")
                    }
                })
                .catch(error => {
                    //alert(error)
                    this.commit("mutation/act_error", error)
                })

        } catch(e) {
            this.commit("mutation/act_error", e)

        } finally {
            //return "r_data"
            //return true
        }   
    },
}