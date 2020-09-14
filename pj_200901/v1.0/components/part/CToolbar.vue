<template>
    <v-toolbar v-bind:style="{'background-color': bg_color}"
        class="rounded-0">
        <v-btn icon dark @click.stop="click_close()">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title style="color:white;">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
            <v-btn dark text v-if="act=='I'" @click.stop="click_insert()">                
                <v-icon left>mdi-content-save</v-icon>등록
            </v-btn>
            <v-btn dark text v-if="act=='U'" @click.stop="click_update()">
                <v-icon left>mdi-pencil</v-icon>수정
            </v-btn>
            <v-btn 
            dark text v-if="act=='U'" @click.stop="click_delete()">
                <v-icon left>mdi-delete</v-icon>삭제
            </v-btn>
    </v-toolbar>
</template>
<script>
export default {
    // 참조 => https://www.youtube.com/watch?v=L8VLByQLtjc
    // 아래의 props는 부모에서 자식으로 넘겨주는 행위...
    // PTreeForm.vue에서 :props_ctoolbar="props_ctoolbar"로 선언함.
    props: ['props_ctoolbar'],
    //
    data() {
        return {
            title: this.$store.state.c_title.title,
            bg_color: this.$store.state.c_title.bg_color
        }
    },
    computed: {
        act() {
            return this.$store.state.c_toolbar.act
        },           
    },
    mounted: function () {
        //alert(this.props_ctoolbar.bg_color)
        if (this.props_ctoolbar.bg_color !== undefined) {
            this.bg_color = this.props_ctoolbar.bg_color
        }

        if (this.props_ctoolbar.title !== undefined) {
            this.title = this.props_ctoolbar.title
        }
    },    
    // 자식 컴포넌트에서 부모 컴포넌트로 값 전달 $emit() 사용법
    methods:{
        click_insert() {
            this.$emit("child_insert", "I", "post")
        },
        click_update() {
            this.$emit("child_update", "U", "put")
        },  
        click_delete() {
            this.$emit("child_delete")
        },                  
        click_close(){
            this.$store.state.c_form.dialog = false
        },
   }

}
</script>