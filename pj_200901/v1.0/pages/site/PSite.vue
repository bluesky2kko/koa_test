<template>
  <v-container fluid>

    <v-card style="padding: 20px 20px 40px 20px;">

        <c-title />

        <v-card-title class="pa-0"><!-- padding: 0px -->
            <v-spacer></v-spacer>
            <v-text-field
            dense
            class="shrink mx-4"
            style="margin-top: 20px; width: 250px;"
            v-model="search"
            label="필터링 ..."
            :outlined="true"
            clearable
            clear-icon="mdi-close-circle-outline"
            ></v-text-field>
        </v-card-title>
<!--
    타이틀 부분 style로 컬러 적용 참조 하기 ...
    https://stackoverflow.com/questions/52473478/styling-vuetify-v-data-table
-->
        <!-- <v-card-text> -->
          <v-data-table
            style="padding-bottom:10px;"
            v-model="PSite.chk_data"
            :headers="headers"
            :items="PSite.m_data"
            :items-per-page="10"
            :search="search"
            filterable
            class="elevation-1"
            item-key="id"
            show-select
            @update:page="click_updatePagination"
            @click:row="click_row"
          >
          </v-data-table>
        <!-- </v-card-text> -->

    </v-card>
        
    <c-fabuttons
        @child_add="click_add"
        :props_cfabuttons="props_cfabuttons"
            />        

  </v-container>
</template>
<script>
export default {
  //layout: 'default',  // 선언 안해도 default.vue를 가리킴 ...
  data() {
    return {
      props_cfabuttons: {
          cpnt_nm: 'PSite',
          //bg_color: 'red'
      },
      search: '',
      headers: [
        { 
          text: "ID", align: "start", sortable: false, value: "id",
          filterable: false,
          class:"success--text title"
        },
        { text: "사이트명", value: "site_nm", class:"success--text title" },
        { text: "아이디", value: "login_id", class:"success--text title" },
        { text: "비번", value: "login_pw", class:"success--text title" },
        { text: "메모", value: "memo", class:"success--text title" },
      ],
    }
  },
  computed: {
    //===============================================================
    // json이 대분류가 안닌 놈, 즉 json이 말단 위치인 값 변경은 아래처럼
    // get, set 모두 선언해야 함...
    //===============================================================
    // act: {
    //     get: function() {
    //         return this.$store.state.dialog.act
    //     },
    //     set: function(newValue) {
    //         //alert("set : " + newValue)
    //         this.$store.state.dialog.act = newValue
    //     }
    // },
    //===============================================================
    PSite() {
      return this.$store.state.PSite
    },
    c_form() {
      return this.$store.state.c_form
    },
  },
  mounted: function () {
    console.log(new Date() + " => PSite.vue mounted")
    //
    this.c_form.cpnt_nm = "PSiteForm"
    //
    //alert(this.PSite.m_data.length)
    // db 추출 건수를 체크하여 처음만 db 호출
    if (this.PSite.m_data.length==0) {
        this.click_search()
    }
  },
  methods: {
    click_updatePagination(pagination) {
      //console.log('update:pagination', pagination)
      alert(pagination)
    },
    //
    //---------------------------------------------------
    // 반드시 async await으로 해야 리턴값을 제대로 받는다.
    //---------------------------------------------------
    click_search() {
      let param = "site_nm=" + this.PSite.cond.site_nm
      //
      let url = "http://21cnkc.iptime.org:4000/api/site/search?" + param
      let p_arr = ["PSite", "SM", "get", url, {}]
      this.$store.dispatch("axios_siud", p_arr)
    },
    //
    click_row(row) {
      // for(var idx in row) {
      //     console.log(row[idx])
      // }        
      this.PSite.idx = this.$store.getters["get_row_index"]("PSite", row.id)
      //alert("idx : " + this.PSite.idx)

      let url = "http://21cnkc.iptime.org:4000/api/site?id=" + row.id
      let p_arr = ["PSite", "S", "get", url, {}]
      this.$store.dispatch("axios_siud", p_arr)
    },
    //
    click_add() {    
      let s_data = {
        id: 0,
        site_nm: "",
        login_id: "",
        login_pw: "",
        memo: "",
      }

      this.$store.commit("add", s_data)

      //e.preventDefault()      // 현재 이벤트의 동작을 중단한다.
      //e.stopPropagation()     // 현재 이벤트의 버블링을 중단한다.
      //e.stopImmediatePropagation()    // 현재 이벤트의 버블링을 중단하며, 같은 레밸에 있는 이벤트도 동작하지 않도록 중단한다.
    },
  },
}
</script>