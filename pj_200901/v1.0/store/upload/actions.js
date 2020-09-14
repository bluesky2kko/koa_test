
export default {
    //참조: https://stackabuse.com/the-node-js-request-module/
    // 즉, 파일이 아닌 데이터를 통해 서버에 전달할 수 있습니다 .
    //------------------------------------------------
    // 현재, CMemberForm.vue에서 사용 ...
    //------------------------------------------------
    async axios_upload({store,commit}, db_para) {
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
                    this.commit("error/act_error", res.data.error_message)
                }
            })
            .catch(error => {
                //alert(error)
                this.commit("error/act_error", error)
            })
            .finally(() => {
                //alert("finally")
                //this.loading = false
            })
    },
}