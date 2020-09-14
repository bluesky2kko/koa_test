<template>
<div></div>
</template>

<script>
export default {
    //   
    // layout사용법 참조 => https://www.youtube.com/watch?v=YOKnSTp7d38    
    layout: 'empty',  //선언 안하면 layouts/default.vue 가 할당됨.
    //
    // page onload ...
    mounted: function() {

        if (!localStorage) {
            alert("index.vue ==> localStorage 지원않함...")
            //return redirect('/login')
        }
        //
        // 모든(자식컴포넌트) 화면이 랜더링된 후 실행합니다.
        this.$nextTick(function() {
            //--------------------------------------
            // pc 여부 체크
            //--------------------------------------
            let filter = "win16|win32|win64|mac|macintel"
            //alert(navigator.platform)
            if (navigator.platform) {
                if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                    this.$store.state.platform = "MOBILE"
                } else {
                    //alert("PC")
                    this.$store.state.platform = "PC"
                }
            }
            //
            alert(this.$store.state.platform)
            //
            //
            //------------------------------------------------
            // v-navigation-drawer 에서 
            // mobile-break-point="960" 선언과 동일 효과 ??? 
            //------------------------------------------------
            // if(document.body.offsetWidth > 960) {
            //     this.$store.state.drawer_config.drawer = true
            // }
            //
            this.proc_go()
        });
    },
    methods: {
        proc_go() {
            // 쿠키 plugin 설치 해야함.
            // npm install vue-cookies --save
            //let cc = this.$cookies.get("user")
            //alert(cc)

            let token = localStorage.getItem("access_token")
            alert(token)
            if (token=='undefined') {
                this.$router.push("./login")
            } else {
                //this.$store.dispatch('axios_token')
                this.$router.push("./site/PSite")
            }

        },   
    }   
}
</script>
