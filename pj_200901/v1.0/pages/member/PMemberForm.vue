<!-- 일정 pop -->
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
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col cols="4">
                            <v-avatar color="blue" size="62" @click.stop="click_sajin">
                                <input style="display:none;" type="file" name="myFile" ref="image" accept="image/*" @change="change_sajin">
                                <img v-if="s_data.sajin" :src="s_data.sajin">
                                <v-icon v-else large color="indigo">mdi-account-circle</v-icon>
                            </v-avatar>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field autofocus v-model="s_data.member_nm" label="이름" :rules="nameRules"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field 
                                v-model="s_data.group_nm"
                                readonly 
                                label="그룹을 선택하세요." 
                                append-icon="mdi-folder" 
                                @click:append="click_toogle_treeview">
                            </v-text-field>                    
                        </v-col>        
                        <v-col cols="12">
                            <v-text-field v-model="s_data.company_nm" label="회사" style="margin:0; padding:0;"></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="s_data.dept_nm" label="부서" style="margin:0; padding:0;"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="s_data.jickub_nm" label="직급" style="margin:0; padding:0;"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="s_data.upmoo_nm" label="업무" style="margin:0; padding:0;"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="s_data.memo" label="메모"></v-text-field>
                        </v-col>                    
                        <v-col cols="12">
                            <v-expansion-panels focusable>

                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        <span><v-icon color="blue" @click.stop="click_add_arr('tel')">mdi-plus</v-icon> 전화번호</span>
                                        <template v-slot:actions>
                                            <v-icon color="primary">$expand</v-icon>
                                        </template>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row v-for="(item, index) in s_data.s_arr_tel" :key="index">
                                            <v-col cols="4">
                                                <v-select :items="combo_data.tel" v-model="item.cb_val" style="width:110px;"></v-select>
                                            </v-col>
                                            <v-col cols="8">
                                                <v-text-field v-model="item.txt_val" :rules="telRules" append-outer-icon="mdi-minus" @click:append-outer="click_remove_arr(index,'tel')"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        <span><v-icon color="blue" @click.stop="click_add_arr('fax')">mdi-plus</v-icon> 팩스번호</span>
                                        <template v-slot:actions>
                                            <v-icon color="primary">$expand</v-icon>
                                        </template>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row v-for="(item, index) in s_data.s_arr_fax" :key="index">
                                            <v-col cols="4">
                                                <v-select :items="combo_data.fax" v-model="item.cb_val" style="width:110px;"></v-select>
                                            </v-col>
                                            <v-col cols="8">
                                                <v-text-field v-model="item.txt_val" :rules="telRules" append-outer-icon="mdi-minus" @click:append-outer="click_remove_arr(index,'fax')"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        <span><v-icon color="blue" @click.stop="click_add_arr('email')">mdi-plus</v-icon> 이메일</span>
                                        <template v-slot:actions>
                                            <v-icon color="primary">$expand</v-icon>
                                        </template>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row v-for="(item, index) in s_data.s_arr_email" :key="index">
                                            <v-col cols="4">
                                                <v-select :items="combo_data.email" v-model="item.cb_val" style="width:110px;"></v-select>
                                            </v-col>
                                            <v-col cols="8">
                                                <v-text-field v-model="item.txt_val" :rules="emailRules" append-outer-icon="mdi-minus" @click:append-outer="click_remove_arr(index,'email')"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        <span><v-icon color="blue" @click.stop="click_add_arr('addr')">mdi-plus</v-icon> 주소</span>
                                        <template v-slot:actions>
                                            <v-icon color="primary">$expand</v-icon>
                                        </template>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <div v-for="(item, index) in s_data.s_arr_addr" :key="index">
                                            <v-row>
                                                <v-col cols="5">
                                                    <v-select :items="combo_data.addr" v-model="item.cb_val"></v-select>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field v-model="item.zipno" label="우편번호" append-icon="mdi-magnify" @click:append="click_zipno_arr(index)"></v-text-field>
                                                </v-col>
                                                <v-col cols="1">
                                                    <v-text-field append-outer-icon="mdi-minus" @click:append-outer="click_remove_arr(index, 'addr')"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field v-model="item.txt_val" label="주소"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-expansion-panel-content>

                                </v-expansion-panel>

                            </v-expansion-panels>
                        </v-col>
                    </v-row>
                </v-container>
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
                title: '주소록',
                //bg_color: 'red'
            },
            nameRules: [
                v => !!v || '이름을 입력하세요.',
                v => (v && v.length > 1) || '1자 이상 입력바랍니다.',
            ],
            telRules: [
                v => !!v || '전화번호 입력하세요.',
                v => (v && v.length > 5) || '5자 이상 입력바랍니다.',
            ],
            emailRules: [
                v => !!v || '이메일 입력하세요.',
                v => (v && v.length > 5) || '5자 이상 입력바랍니다.',
            ],
            dayRules: [
                v => !!v || '기념일 입력하세요.',
                v => (v && v.length > 5) || '5자 이상 입력바랍니다.',
            ],
            //                                    
            imageChange: "N",   // 이미지가 변경된 경우만 서버 전송 ...   
            imageFile: "",  // 서버 전송용 파일 ...   
            // 그룹리스트 펼치기용 ...
            v_list_group: {
                tel: true,
                fax: true,
                email: true,
                sotial: true,
                addr: true,
                anvday: true,
            },
            combo_data: {
                tel: ["집", "회사", "공장", "기타"],
                fax: ["집", "회사", "공장", "기타"],
                addr: ["집", "회사", "공장", "기타"],
                email: ["개인", "회사", "기타"],
                sotial: ["카카오톡", "페이스북", "인스타그램", "기타"],
                anvday: ["생일", "결혼"],
            },     
        }
    },
    computed: {
        s_data() {
            return this.$store.state.c_form.s_data
        },
    },
    mounted: function () {
        console.log(new Date() + " => CMemberForm.vue mounted")

    },  
    updated: function(){
        //alert("3. updated")
    },    
	methods: {
        click_sajin() {
            alert("click_sajin")
            this.$refs.image.click()
        },
		change_sajin(e) {
            const files = e.target.files
            //
			if(files[0] !== undefined) {
                //console.log("files[0] " + files[0])
                //console.log("files[0].name : " + files[0].name)
                //console.log("files[0].size : " + files[0].size)
                //
				let imageName = files[0].name
                let idx = imageName.lastIndexOf('.')
                let ext = imageName.slice(idx+1).toLowerCase()  // jpg, png, bmp ...
                //alert(ext)
                if (ext=="jpg" || ext=="jpeg" || ext=="gif" || ext=="png" || ext=="bmp") {
                    //
                } else {
                    alert("이미지 파일이 아닙니다.\n jpg, jpeg, png, gif, bmp파일만 가능...")
                    return
                }
                //
                if (files[0].size > 2097152) {
                    alert("파일 사이즈는 2M 까지만 가능 합니다.")
                    return
                }
                //
                //
                this.imageChange = "Y"
                this.imageFile = files[0] // 서버로 보낼 수 있는 이미지 파일입니다 ...
                //
				const fr = new FileReader()
				fr.readAsDataURL(files[0])
				fr.addEventListener("load", () => {
                    console.log("fr.result : " + fr.result)
                    this.s_data.sajin = fr.result   // data로 사진 display...
                    // 이미지 업로드...
                    this.click_upload()
                })
			} else {
				this.s_data.sajin = ""
			}
		}, 
        //
        click_toogle_treeview() {
            this.$store.state.c_select.parent_cpnt_nm = "PMemberForm"
            this.$store.state.c_select.cpnt_nm = "CTreeView"
            this.$store.state.c_select.max_width = "500"
            this.$store.state.c_select.dialog = true
        }, 
        // 우편번호 찾기 API 어떤걸로
        click_zipno_arr(idx) {
            this.$store.state.c_daum_post.idx = idx
            this.$store.state.c_daum_post.parent_cpnt_nm = "PMemberForm"
            this.$store.state.c_daum_post.dialog = true
            //
            this.$nuxt.$emit('PMemberForm.click_zipno_arr', "para")
        },
        click_add_arr(gubun) {
            //alert("gubun : " + gubun)
            this.v_list_group[gubun] = true // 그룹리스트 펼치기
            //
            let obj = { cb_val: "", txt_val: "" }   // 공통 사용 ...
            //
            if (gubun=="addr") {
                obj["zipno"] = ""    // 위의 공통사항 적용 후, 우편번호만 추가...
            }
            this.s_data["s_arr_"+gubun].push(obj)
            
            //
            //this.v_list_group[gubun] = true
        },
        click_remove_arr(idx, gubun) {
            //alert(idx)
            let arr = this.s_data["s_arr_"+gubun]
            arr.splice(idx, 1)
        },
        click_upload() {
            //alert("click_upload")
            if (this.imageChange != "Y") {
                return
            }
            //
            let obj_para = {
                target: "PMember",
                act: "A",
                method: "upload",
                url: "http://21cnkc.iptime.org:4000/api/upload",
                ctx_body_para: this.imageFile
            }
            //
            this.$store.dispatch("upload/axios_upload", obj_para)
        },    
        click_ins_upd(p_act, p_method) {
            if (this.$refs.form.validate()) {
                //
                let url = "http://21cnkc.iptime.org:4000/api/member"
                let p_arr = ["PMember", p_act, p_method, url, this.s_data]
                this.$store.dispatch("axios_siud", p_arr)
            }
        },
    },
}
</script>