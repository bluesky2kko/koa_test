<template>
<div>
    <v-card>
        <!-- @child="click_close()" 자식에서 호출 -->
        <c-toolbar
            @child_insert="click_ins_upd"
            @child_update="click_ins_upd"
            :props_ctoolbar="props_ctoolbar"
            />    

        <v-card-text>
            <v-form ref="form" style="padding: 20px 20px 20px 20px;">
                <v-radio-group :readonly="group_cd_readonly" v-model="s_data.group_cd" row><!-- row : 가로 display -->
                    <v-radio label="개인" value="1"></v-radio>
                    <v-radio label="공용" value="2"></v-radio>
                    <v-radio label="사내" value="3"></v-radio>
                </v-radio-group>
                <v-text-field 
                    v-model="s_data.group_nm_up" 
                    label="상위그룹명" readonly 
                    append-icon="mdi-folder" 
                    @click:append="click_toogle_treeview">
                </v-text-field>
                <v-text-field
                ref="group_nm"
                autofocus
                v-model="s_data.group_nm"
                label="그룹명(띄어쓰기금지)"
                required
                placeholder=""
                :rules="groupNameRules">
                </v-text-field>
            </v-form> 
        </v-card-text>
    </v-card>
</div>
</template>
<script>
export default {
    data() {
        return {
            props_ctoolbar: {
                //title: '그룹관리',
                //bg_color: 'red'
            },
            dialog: false,
            groupNameRules: [
                v => !!v || '그룹명을 입력하세요.',
                v => (v && v.length > 2) || '2자 이상 입력바랍니다.',
            ],
            group_cd_readonly: false,
        }
    },
    computed: {
        s_data() {
            return this.$store.state.c_form.s_data
        }
    },
    //
	methods: {
        focus_chk() {
            alert("focus")
        },
        click_toogle_treeview() {
            this.$store.state.c_select.parent_cpnt_nm = "PTreeForm"
            this.$store.state.c_select.cpnt_nm = "CTreeView"
            this.$store.state.c_select.dialog = true
        },
        click_ins_upd(p_act, p_method) {
            if (this.$refs.form.validate()) {
                //
                let url = "http://21cnkc.iptime.org:4000/api/tree"
                let p_arr = ["PTree", p_act, p_method, url, this.s_data]
                this.$store.dispatch("axios_siud", p_arr)
            }
        }, 
    },
}
</script>
