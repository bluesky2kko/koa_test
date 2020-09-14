<template>
<v-card>
    <c-toolbar
        @child_insert="click_ins_upd"
        @child_update="click_ins_upd"
        :props_ctoolbar="props_ctoolbar"
        />        
    <v-card-text>
        <v-form ref="form" style="padding-top:15px;">
            <v-text-field v-model="s_data.site_nm" label="사이트명" placeholder="" :counter="10" :rules="siteNameRules" required></v-text-field>
            <v-text-field v-model="s_data.login_id" label="아이디" :rules="idRules" required></v-text-field>
            <v-text-field v-model="s_data.login_pw" label="비번" :rules="pwRules" required></v-text-field>
            <v-textarea v-model="s_data.memo" label="메모"></v-textarea>
        </v-form>
    </v-card-text> 
</v-card>
</template>
<script>
//import delay from 'delay'   // npm install delay --save
//await delay(1000) // 1초간 대기
export default {
    data() {
        return {
            props_ctoolbar: {
                //title: '그룹관리',
                //bg_color: 'red'
            },
            siteNameRules: [
                v => !!v || '사이트명을 입력하세요.',
                v => (v && v.length > 2) || '2자 이상 입력바랍니다.',
            ],
            idRules: [
                v => !!v || '아이디를 입력하세요.',
                v => (v && v.length > 2) || '2자 이상 입력바랍니다.',
            ],
            pwRules: [
                v => !!v || '비번을 입력하세요.',
                v => (v && v.length > 2) || '2자 이상 입력바랍니다.',
            ],
        }
    },    
    computed: {
        s_data() {
            return this.$store.state.c_form.s_data
        }
    },
    created() {
        //
    },
    mounted() {
        console.log(new Date() + " => PSiteForm.vue mounted")
    },  
    updated: function(){
        //this.$nextTick(function() {
            this.$refs.form.resetValidation()
        //})
    },    
	methods: {
        click_ins_upd(p_act, p_method) {
            if (this.$refs.form.validate()) {
                let obj_para = {
                    target: "PSite",
                    act: p_act,
                    method: p_method,
                    url: "http://21cnkc.iptime.org:4000/api/site",
                    ctx_body_para: this.s_data
                }
                //
                this.$store.dispatch('axios_siud', obj_para)
            }
        },
    },
}
</script>
