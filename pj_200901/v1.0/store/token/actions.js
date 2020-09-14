export default {
    async axios_token({store, commit}) {
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
                commit("token_info", res.data[0])
                //
                this.$router.push("./site/PSite")
            })

        } catch(e) {
            this.commit("error/act_error", e)

        } finally {
            //return "r_data"
            //return true
        }   
    },
}
