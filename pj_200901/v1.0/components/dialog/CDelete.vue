
<template>
<v-dialog v-model="c_delete.dialog" persistent max-width="300">
    <v-card>
        <v-card-title class="headline grey lighten-2">
            삭제 확인
        </v-card-title>
        <v-card-text style="padding:20px;">
            선택한 자료를 삭제 하시겠습니까 ?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions style="height:50px;">
            <v-spacer></v-spacer>
            <v-btn color="blue" small @click.stop="click_yes">Yes</v-btn>          
            <v-btn color="red" small @click.stop="click_no">No</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</v-dialog>    

</template>
<script>
export default {
    computed: {
        c_delete() {
            return this.$store.state.c_delete
        }
    },
    mounted () {
        console.log(new Date() + " => CDelete.vue mounted")
    },
    methods: {
        click_yes () {
            let path = this.$route.path     // /tree/PTree
            //alert(path)
            //
            let cpnt_nm = ""
            let folder = ""
            //
            switch(path){
                case "/tree/PTree":
                    cpnt_nm = "PTree"
                    folder = "tree"
                    break
                case "/site/PSite":
                    cpnt_nm = "PSite"
                    folder = "site"
                    break
                case "/jepum/PJepum":
                    cpnt_nm = "PJepum"
                    folder = "jepum"
                    break    
                default:
                    break
            }
            //
            alert(cpnt_nm)

            let arr_id = []

            // LIST 화면에서 삭제
            if (cpnt_nm == "PTree" || cpnt_nm == "PSite") {
                let chk_data = this.$store.state[cpnt_nm].chk_data
                let cnt = chk_data.length
                for (let i = 0; i < cnt; i++) {
                    arr_id.push(chk_data[i].id)
                }
            } else if (cpnt_nm == "PJepum") { 
                // 싱글Form 화면에서 삭제
                arr_id.push(this.$store.state.c_form.id)
            }

            alert(arr_id)
            //
            //delete_commit(arr_id, cpnt_nm, folder)
        },
        delete_commit(arr_id, cpnt_nm, folder) {
            // Axios - get, delete 요청 시 body에 데이터 넣는 법
            // data: {} atrribute를 추가로 넣어주면 된다.
            // post, put에서는 data: {} 선언하면 언됨...(개고생 ...)
            let param = {
                data: {
                    id: arr_id,
                },
            };
            //
            let obj_para = {
                target: cpnt_nm,
                act: "D",
                method: "delete",
                url: "http://21cnkc.iptime.org:4000/api/"+ folder,
                ctx_body_para: param,
            };
            //
            this.$store.dispatch("axios_siud", obj_para)
        },
        click_no() {
            this.c_delete.dialog = false
        }
    }
}
</script>