<template>
  <v-app>
    <!-- 로그인 오류 다이얼 로그창 부분 -->
    <c-error-msg />

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar :color="bg_color" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <span>{{ date }}</span>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field prepend-icon="mdi-account" ref="login_id" label="아이디" type="text" v-model="cond.login_id"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" ref="login_pw" label="비밀번호" type="password" v-model="cond.login_pw"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="bg_color" class="white--text" @click.stop="click_login">로그인</v-btn>
                <v-btn color="primary" @click.stop="click_fax">FAX</v-btn>
                <v-btn color="primary" @click.stop="click_youtobe">유투브</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import CErrorMsg from "~/components/dialog/CErrorMsg.vue"
export default {
    // components: {
    //     CErrorMsg
    // },
    //
    // layout사용법 참조 => https://www.youtube.com/watch?v=YOKnSTp7d38    
    layout: 'empty',  //선언 안하면 layouts/default.vue 가 할당됨.
    //
    data() {
        return {
            date: this.$store.getters["get_date"]("today"),
            //date: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
            cond: {
                login_id: "joncc",
                login_pw: "nam1103@"
            }
        }
    },
    computed: {
        bg_color() {
            return this.$store.state.c_title.bg_color
        }
    },    
    mounted () {
        //
    }, 
    methods: {
        async click_login() {
            if (this.cond.login_id=="") {
                //document.getElementById("login_id").focus()
                this.$refs.login_id.focus()
                this.err_txt = "아이디를 입력하세요..."
                this.dialog = true
                return
            }
            //
            if (this.cond.login_pw=="") {
                this.$refs.login_pw.focus()
                this.err_txt = "비번을 입력하세요..."
                this.dialog = true
                return
            }
            //
            //alert(this.cond.login_id)
            let obj_para = {
                act: "S",
                url: "http://21cnkc.iptime.org:4000/api/login",
                ctx_body_para: this.cond
            }
            //
            let { err, obj } = await this.$store.dispatch('return/axios_return', obj_para)
            //alert(err)
            if (err) {
                this.$store.commit("error/act_error", obj)
            } else {
                // middleware/auth.js 에서 체크함...
                this.$store.state.authenticated = true

                console.log("obj ==> " + obj)
                // 쿠키값으로 저장...
                //obj = { id:1, name:"KJO",session:"25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX" }
                //this.$cookies.set("user", obj)
                //console.log(this.$cookies.get("user").login_id)
                //
                let token = obj.session
                localStorage.setItem("access_token", token)
                //
                await this.$store.dispatch('token/axios_token')           
            }
        },
        //
        click_fax() {
            let obj = this.$store.state
            let db_para = obj.db_para
            db_para["s"] = "CPdfPrint.click_fax"
            db_para["t"] = "CPdfPrint"
            db_para["url"] = obj.url.fax+"/faxsend"     
            db_para["method"] = "post"
            db_para["cond"] = {}
            db_para["data"] = ""
            //
            this.$store.dispatch("axios_siud", "S")
        },
        click_youtobe() {
            this.$store.dispatch("axios_youtobe_search")
        },
    },  
}
</script>