<template>
<v-card>
    
    <c-toolbar
        @child_insert="click_ins_upd"
        @child_update="click_ins_upd"
        :props_ctoolbar="props_ctoolbar"
        />

    <v-card-text>
        <v-form ref="form" style="padding-top:15px;">
            <v-text-field v-model="s_data.prod_nm" label="제품명" placeholder="" :rules="prodnmRules" required></v-text-field>
            <v-file-input small-chips show-size label="이미지명"></v-file-input><!-- 원본 -->
            <div style="margin-top: -15px;">{{ s_data.imgfile_nm }}</div>
            <v-file-input small-chips show-size label="도안파일명">{{ s_data.doanfile_nm }}</v-file-input>
            <div style="margin-top: -15px;">{{ s_data.doanfile_nm }}</div>

            <div style="padding-top: 25px;"></div>

            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="s_data.doanfile_date"
                    label="도안작업일"
                    append-icon="mdi-calendar-range"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker no-title v-model="s_data.doanfile_date" @input="menu2 = false"></v-date-picker><!--  locale="ko-kr" -->
            </v-menu>

            <v-text-field v-model="s_data.standard" label="규격" ></v-text-field><!-- 150x250+250+40 -->
            <v-text-field v-model="s_data.jejil" label="재질" ></v-text-field><!-- HDPE, LDPE -->
            <v-text-field v-model="s_data.yongdo" label="용도" ></v-text-field><!-- DM, 쇼핑백, 에어캡 -->
            <v-text-field v-model="s_data.dosu" label="인쇄도수" ></v-text-field>
            <v-text-field v-model="s_data.balju_comp_nm" label="발주사" ></v-text-field><!-- 교원,교원구몬,교원크리에이티브 -->
            <v-text-field v-model="s_data.damdang" label="담당자" ></v-text-field>
            <v-textarea v-model="s_data.memo" label="메모"></v-textarea>
        </v-form>
    </v-card-text>
</v-card>
</template>
<script>
export default {
    data() {
        return {
            props_ctoolbar: {
                //title: '그룹관리',
                //bg_color: 'red'
            },            
            prodnmRules: [
                v => !!v || '제품명을 입력하세요.',
                v => (v && v.length > 2) || '2자 이상 입력바랍니다.',
            ],
            menu2: false,
            imgfile_nm_arr: ['1','2'],
            doanfile_nm_arr: []
        }
    },
    computed: {
        s_data() {
            return this.$store.state.c_form.s_data
        }
    },
    mounted: function () {
        console.log(new Date() + " => PJepum.vue mounted")
    },  
	methods: {
        click_ins_upd(p_act, p_method) {
            if (this.$refs.form.validate()) {
                //
                let url = "http://21cnkc.iptime.org:4000/api/jepum"
                let p_arr = ["PJepum", p_act, p_method, url, this.s_data]
                this.$store.dispatch("axios_siud", p_arr)
            }
        }
    },
}
</script>