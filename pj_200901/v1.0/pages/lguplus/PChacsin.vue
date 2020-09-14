<template>
<div>
    <v-toolbar fixed class="form-toolbar">
        <v-icon @click.stop="click_close" style="font-size:36px;">close</v-icon>
        <v-toolbar-title>착신설정</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
        
    <div style="padding-top:100px; width:250px; margin:auto;">
        <v-form>
            <v-text-field v-model="telno" label="착신전화번호" append-icon="mdi-magnify" @click:append="click_search"></v-text-field>
            <v-btn color="primary" @click.stop="click_setforward">착신</v-btn>
            <v-btn color="orange" @click.stop="click_stopforward">해제</v-btn>
            <br><br>
            <v-alert v-model="disp_yn" :color="msg_color" dismissible>{{ msg }}</v-alert>
        </v-form>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            telno_070: "07048669987",
            telno: "",
            msg: "처리결과",
            disp_yn: false,
            msg_color: "orange"
        }
    },
    //
    computed: {
        //
    },    
    //
    mounted: function () {
        console.log(new Date() + " => PChacsin.vue mounted")
        this.click_search()
    },
    //    
    methods: {
        //
        click_close() {
            this.$store.commit("right_slide_close")
        },        
        // 착신조회
        async click_search() {
            let param = {
                telno_070: this.telno_070,
                chacsin_telno: this.telno
            }

            let obj_para = {
                    target: "PChacsin",
                    act: "LGUPLUS",
                    method: "post",
                    url: "http://21cnkc.iptime.org:4000/api/lguplus/userinfo",
                    ctx_body_para: param
                }
                //
            let { err, obj } = await this.$store.dispatch('return/axios_return', obj_para)

            //
            console.log(obj.DATAS)
            /*
            console.log(obj.DATAS.DOMAIN)
            console.log(obj.DATAS.NAME) // 이름
            console.log(obj.DATAS.EXTEN) // 내선번호
            console.log(obj.DATAS.NUMBER070) // 070번호
            console.log(obj.DATAS.FORWARD_TYPE) // 착신전환설정형식 (F:착신전환전화, V:음성사서함, N:사용안함)
            console.log(obj.DATAS.FORWARD_DATA) // 해당 착신전환 설정에 대한 설정값
            console.log(obj.DATAS.FORWARD_STR) // 해당 착신전환에 대한 설명
            */
            //
            this.telno = obj.DATAS.FORWARD_DATA
            if (obj.DATAS.FORWARD_DATA=="") {
                this.msg = "현재 착신해제 상태임."
                this.msg_color = "orange"
            } else {
                this.msg = "현재 착신설정 상태임."
                this.msg_color = "blue"
            }
            this.disp_yn = true

        },    
        // 착신설정
        async click_setforward() {
            let param = {
                telno_070: this.telno_070,
                chacsin_telno: this.telno
            }

            let obj_para = {
                    target: "PChacsin",
                    act: "LGUPLUS",
                    method: "post",
                    url: "http://21cnkc.iptime.org:4000/api/lguplus/setforward",
                    ctx_body_para: param
                }
                //
            let { err, obj } = await this.$store.dispatch('return/axios_return', obj_para)
            //
            this.msg = obj.DATAS.STATUS
            if (obj.DATAS.STATUS=="OK") {
                this.msg = "착신설정 완료..."+" ("+obj.DATAS.STATUS+")"
                this.msg_color = "blue"
            } else {
                this.msg = "착신설정 미완료, 관리자에게 문의 바람."
                this.msg_color = "red"

            }
            //
            this.disp_yn = true
        },
        // 착신해제
        async click_stopforward() {
            let param = {
                telno_070: this.telno_070,
                chacsin_telno: this.telno
            }

            let obj_para = {
                    target: "PChacsin",
                    act: "LGUPLUS",
                    method: "post",
                    url: "http://21cnkc.iptime.org:4000/api/lguplus/stopforward",
                    ctx_body_para: param
                }
                //
            let { err, obj } = await this.$store.dispatch('return/axios_return', obj_para)
            //
            this.msg = obj.DATAS.STATUS
            if (obj.DATAS.STATUS=="OK") {
                this.telno = ""
                this.msg = "착신해제 완료..."+" ("+obj.DATAS.STATUS+")"
                this.msg_color = "orange"
            } else {
                this.msg = "착신해제 미완료, 관리자에게 문의 바람."
                this.msg_color = "red"
            }
            //
            this.disp_yn = true            
        },
    }
}
</script>