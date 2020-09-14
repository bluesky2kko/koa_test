<template>
  <v-container fluid>

        <v-card style="padding: 20px;">
          <c-title />
          <p />
          <!--
Material Design Viewport Breakpoints
======================================
Extra small	xs      (핸드폰)    small to large handset	< 600px
Small	    sm	    (테블릿)    small to medium tablet	600px > < 960px
Medium	    md	    (노트북)    large tablet to laptop	960px > < 1264px*
Large	    lg	    (데스크탑)  desktop	1264px* > < 1904px*
Extra large	xl	    (TV)       4k and ultra-wides	> 1904px*
          -->
          <v-row dense>
            <v-col
              style="padding: 15px;"
              v-for="(card, index) in PJepum.m_data"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              xl="3"
            >
              <v-card>
                <v-img :contain="$store.state.mobile_chk" :src="card.imgfile_nm" height="200"></v-img>
                <!-- card.imgfile_nm -->
                <v-card-title>{{ card.standard }} / {{ card.jejil }}</v-card-title>

                <v-card-text>
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                    <v-chip>2019-08-01</v-chip>
                    <v-chip>2018-08-01</v-chip>
                    <v-chip>2017-08-01</v-chip>
                  </v-chip-group>
                </v-card-text>

                <v-card-actions>
                  <v-btn text @click.stop="click_row(card)">Edit</v-btn>

                  <v-btn color="black" text>도안보기</v-btn>

                  <v-spacer></v-spacer>

                  <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      <div class="my-4 subtitle-1 green--text">-- 최근내역 --</div>- 도안 : 2020-07-20 (미례산업)
                      <br />- 발주 : 2020-07-20 (동우실업)
                      <br />- 입고 : 2020-07-25 (남경창고)
                      <br />- 납품 : 2020-08-01 (성수동)
                      <br />
                      <br />
                      <v-icon>mdi-database</v-icon>동판보관장소 : 남경창고
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <!-- 추가 또는 삭제 버튼 -->
        <c-fabuttons
            @child_add="click_add" 
            :props_cfabuttons="props_cfabuttons" />

  </v-container>
</template>
<script>
//import PJepumForm from "~/pages/jepum/PJepumForm.vue"
export default {
  //layout: 'default',  // 선언 안해도 default.vue를 가리킴 ...
//   components: {
//     PJepumForm,
//   },
  data() {
    return {
      props_cfabuttons: {
        cpnt_nm: "PJepum",
        //bg_color: 'red'
      },
      show: false,
      cards: [
        {
          title: "Pre-fab homes",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          //src: "http://21cnkc.iptime.org:3200/_nuxt/static/img/21cnkc_logo.gif",
          //src: "~/static/img/21cnkc_logo.gif",
        },
        {
          title: "Favorite road trips",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        },
        {
          title: "Best airlines",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
        {
          title: "Pre-fab homes",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          title: "Favorite road trips",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        },
        {
          title: "Best airlines",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
        {
          title: "Best airlines",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
        {
          title: "Pre-fab homes",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        },
        {
          title: "Favorite road trips",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        },
        {
          title: "Best airlines",
          imgfile_nm: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
      ],
    }
  },
  computed: {
    PJepum() {
      return this.$store.state.PJepum
    },
    c_form() {
      return this.$store.state.c_form
    },
  },
  mounted() {
    this.c_form.cpnt_nm = "PJepumForm"

    // db 추출 건수를 체크하여 처음만 db 호출
    if (this.PJepum.m_data.length==0) {
        this.click_search()
    }
  },
  methods: {
    click_search() {
      let param = "prod_nm=" + this.PJepum.cond.prod_nm
      //
      let url = "http://21cnkc.iptime.org:4000/api/jepum/search?" + param
      let p_arr = ["PJepum", "SM", "get", url, {}]
      this.$store.dispatch("axios_siud", p_arr)
    },
    //
    click_row(row) {
      // row 배열 index 구하기
      this.PJepum.idx = this.$store.getters["get_row_index"]("PJepum", row.id)
      //alert("idx : " + this.PJepum.idx)

      let url = "http://21cnkc.iptime.org:4000/api/jepum?id=" + row.id
      let p_arr = ["PJepum", "S", "get", url, {}]
      this.$store.dispatch("axios_siud", p_arr)
    },
    //
    click_add() {
      let s_data = {
        id: 0,
        prod_nm: "",
        imgfile_wonbon: null,
        doanfile_nm: null,
        doanfile_date: this.$store.getters["get_date"]("today"),  //new Date().toISOString().substr(0, 10),
        standard: "",
        jejil: "",
        yongdo: "",
        dosu: "",
        balju_comp_nm: "",
        damdang: "",
        memo: "",
      }

      this.$store.commit("add", s_data)
    },
  },
}
</script>