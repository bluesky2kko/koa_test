<template>
  <v-app><!-- dark, light nuxt.config.js에서 선언함 -->

    <c-drawer />

    <c-app-var />

    <v-main style="margin-top:0px; background-color: #F4F4F4;">
        <c-dialog />

        <nuxt /><!-- nuxt는 반드시 사용해야함 ==> layout: '...' 과 연관됨. -->
    </v-main>

    <c-drawer-right />

    <!-- <v-footer fixed>
        <v-spacer></v-spacer>
        <div style="font-size: 0.9em; color:gray;">
            Copyright © 2016-{{ new Date().getFullYear() }} &nbsp;&nbsp;(주) Xpogate LTD.
        </div>
        <v-spacer></v-spacer>
    </v-footer>      -->

  </v-app>
</template>

<script>
export default {
    //미들웨어를 사용하면 페이지나 페이지 그룹을 렌더링하기 전에 실행할 사용자 지정함수를 정의할 수 있습니다.
    //https://ko.nuxtjs.org/guide/routing
    middleware: ['context_example'],
    //
    // 특정 페이지에 대해서만 미들웨어를 셋팅하고 싶을 수 있습니다.
    // 이럴 때에는 직접적으로 함수를 생성하시면 됩니다(혹은 함수의 배열).
    // middleware({ store, redirect }) {
    //   // 유저가 인증되지 않았다면
    //   if (!store.state.authenticated) {
    //     return redirect('/login')
    //   }
    // },
    //
    data () {
      return {
        //
      }
    },
    computed: {
        //
    },
    //
    //
    // update와 겹치면 안되나 ?
    beforeRouteEnter: function(to, from, next){
        console.log(new Date() + " => default.vue beforeRouteEnter")
        console.log(to)
        next()  // 또는 next('/login')
    },
    // update와 겹치면 안되나 ?
    beforeRouteLeave: function(to, from, next){
        console.log(new Date() + " => default.vue beforeRouteLeave")
        console.log(to)
        next()  // 또는 next('/login')
    },    
    beforeCreate: function(){
        //alert("beforeCreate")
        console.log(new Date() + " => default.vue beforeCreate")
    },
    created: function(){
        //alert("created")
        console.log(new Date() + " => default.vue created")
    },
    beforeMount: function(){
        //alert("beforeMount")
        console.log(new Date() + " => default.vue beforeMount")
    },     
    mounted: function () {
        //alert("mounted")
        console.log(new Date() + " => default.vue mounted")
    },
    beforeUpdate: function(){
        //alert("beforeUpdate")
        console.log(new Date() + " => default.vue beforeUpdate")
    },     
    updated: function(){
        //alert("updated") 
        console.log(new Date() + " => default.vue updated")
    },
    beforeDestory: function(){
        //alert("beforeDestory") 
        console.log(new Date() + " => default.vue beforeDestory")
    },
    destoryed: function(){
        //alert("destoryed")
        console.log(new Date() + " => default.vue destoryed")
    },
    //
    //
    methods: {
      //
    }
}
</script>