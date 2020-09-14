//-------------------------------------
// DB 처리 후 -> 리턴 처리
//-------------------------------------
export default {    
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
                    
                    if (db_para.act == "S") {              // login.vue 에서 call                       
                        result.obj = res.data[0]

                    } else if (db_para.act == "SM") {      // PTree.vue 에서 call : tree 만들기 data 재편성         
                        result.obj = res.data

                    } else if (db_para.act == "DOWNLOAD") {     // 어디에서 사용했지 ???              
                        result.obj = res.data

                    } else if (db_para.act == "LGUPLUS") {  // CDrawerRight.vue 에서 call
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
}   