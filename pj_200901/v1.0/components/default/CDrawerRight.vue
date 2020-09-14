<template>
  <v-navigation-drawer
    v-model="c_drawer_right.drawer"
    :right="c_drawer_right.right"
    temporary
    app
    width="260"
    style="padding: 10px;"
  >
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-icon light @click.stop="click_close()">mdi-close</v-icon>
        </v-list-item-action>
        <v-list-item-title>설정</v-list-item-title>
        <v-list-item-action>
          <v-icon @click.stop="click_logout()">mdi-logout</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card class="text-center mb-1">
      <v-card-text>
        <strong class="mb-3 d-inline-block">TITLE FILTERS</strong>

        <v-item-group>
          <v-item v-for="(color, index) in avatar_color" :key="index" style="margin: 1px;"
            >
            <v-avatar :color="color" size="30"
            @click="click_color(color, index)">
                <v-icon color="white" style="font-size:12pt">{{ avatar_check[index] }}</v-icon>
            </v-avatar>
          </v-item>
        </v-item-group>

        <v-divider class="my-4 gray" />

        <v-row align="center" no-gutters>
          <v-col cols="auto">Dark Mode</v-col>
          <v-spacer />
          <v-col cols="auto">
            <v-switch
              v-model="switch_mode"
              class="ma-0 pa-0"
              color="secondary"
              hide-details
              @click="click_switch_mode()"
            />
          </v-col>
        </v-row>

        <v-divider class="my-2 gray" />

        <v-row align="center" no-gutters>
          <v-col cols="auto">Sidebar Image</v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-switch
              v-model="switch_img"
              class="ma-0 pa-0"
              color="secondary"
              hide-details
              @click="click_switch_img()"
            />
          </v-col>
        </v-row>

        <v-divider class="my-4 gray" />

        <strong class="mb-3 d-inline-block">IMAGES</strong>

        <v-item-group class="d-flex justify-space-between mb-3">
          <v-item v-for="(image, index) in images" :key="index" class="mx-1">
            <v-sheet
              class="d-inline-block v-settings__item"
              :color="sheet_color[index]"
              @click="click_image(image, index)"
            >
              <v-img :src="image" height="100" width="50" />
            </v-sheet>
          </v-item>
        </v-item-group>

        <div class="my-6" />

        <v-divider class="my-4 gray" />

        <div class="my-10" />

        <div>
          <v-btn class="ma-1" color="blue" dark default rounded @click.stop="click_setforward()">
            <v-icon>mdi-phone-check</v-icon>착신
          </v-btn>

          <v-btn class="ma-1" color="orange" dark default rounded @click.stop="click_stopforward()">
            <v-icon>mdi-phone</v-icon>해제
          </v-btn>
        </div>

        <div style="margin-top: -0px;">
          <v-text-field
            v-model="telno"
            append-icon="mdi-magnify"
            @click:append="click_search"
          ></v-text-field>
        </div>

        <v-alert nax-width="250" v-model="disp_yn" :color="msg_color" dismissible>{{ msg }}</v-alert>

        <div class="my-6" />
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      sheet_color: ["red", "white", "white"],
      //
      avatar_color: ["#2196F3","#00001E","#9C27b0","#4CAF50","#ff9800","#FF5252"],  // #3F51B5
        avatar_check: ["","","","","",""],
      //
      image:
        "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
      images: [
        "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
        "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-2.jpg",
        "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-3.jpg",
      ],
      //
      switch_mode: false,
      switch_img: true,
      //
      telno_070: "07048669987",
      telno: "",
      msg: "...",
      disp_yn: false,
      msg_color: "orange",
    };
  },
  computed: {
    c_drawer_right() {
      return this.$store.state.c_drawer_right;
    }
  },
  mounted: function () {
    //alert("착신조회")
    this.avatar_check[0] = "mdi-check-circle-outline";
    //
    this.click_search();
  },
  //
  methods: {
    click_close() {
      this.c_drawer_right.drawer = false
    },
    click_logout() {
      this.c_drawer_right.drawer = false
      //
      this.$store.state.authenticated = false
      this.$router.push('/login')
      //
    },
    click_color(color, index) {
        // 먼저 초기화 값으로 => 배열 형태로 모두 set 해야함... 개고생...
        this.avatar_check = ["","","","","",""];
        // 그 다음 해당 index에 set 해야함 ...
        this.avatar_check[index] = "mdi-check-circle-outline";
        //
        //alert(this.avatar_color[index]);
        this.$store.state.c_title.bg_color = this.avatar_color[index];
    },
    click_switch_mode() {
      //alert(this.$vuetify.theme.dark);
      this.switch_mode = !this.switch_mode;
      this.$vuetify.theme.dark = this.switch_mode;
    },
    click_switch_img() {
      this.switch_img = !this.switch_img;
      //
      //alert(this.switch_img)
      if (!this.switch_img) {
        this.$store.state.c_drawer.bg_image = "";
      }
    },
    click_image(img, index) {
      if (!this.switch_img) {
        return false;
      }

      this.$store.state.c_drawer.bg_image = img;
      //
      //alert(index)
      //
      // 먼저 초기화 값으로 => 배열 형태로 모두 set 해야함... 개고생...
      this.sheet_color = ["white", "white", "white"];
      // 그 다음 해당 index에 set 해야함 ...
      this.sheet_color[index] = "red";
    },
    // 착신조회
    async click_search() {
      let param = {
        telno_070: this.telno_070,
        chacsin_telno: this.telno,
      };

      let obj_para = {
        target: "PChacsin",
        act: "LGUPLUS",
        method: "post",
        url: "http://21cnkc.iptime.org:4000/api/lguplus/userinfo",
        ctx_body_para: param,
      };
      //
      let { err, obj } = await this.$store.dispatch("return/axios_return", obj_para)
      //
      console.log(obj.DATAS);
      /*
            console.log(obj.DATAS.DOMAIN)
            console.log(obj.DATAS.NAME) // 이름
            console.log(obj.DATAS.EXTEN) // 내선번호
            console.log(obj.DATAS.NUMBER070) // 070번호
            console.log(obj.DATAS.FORWARD_TYPE) // 착신전환설정형식 (F:착신전환전화, V:음성사서함, N:사용안함)
            console.log(obj.DATAS.FORWARD_DATA) // 해당 착신전환 설정에 대한 설정값
            console.log(obj.DATAS.FORWARD_STR) // 해당 착신전환에 대한 설명
            */
      //
      this.telno = obj.DATAS.FORWARD_DATA;
      if (obj.DATAS.FORWARD_DATA == "") {
        this.msg = "착신해제 상태임.";
        this.msg_color = "orange";
      } else {
        this.msg = "착신설정 상태임.";
        this.msg_color = "blue";
      }
      this.disp_yn = true;
    },
    // 착신설정
    async click_setforward() {
      //alert("click_setforward");
      let param = {
        telno_070: this.telno_070,
        chacsin_telno: this.telno,
      };

      let obj_para = {
        target: "PChacsin",
        act: "LGUPLUS",
        method: "post",
        url: "http://21cnkc.iptime.org:4000/api/lguplus/setforward",
        ctx_body_para: param,
      };
      //
      let { err, obj } = await this.$store.dispatch("return/axios_return", obj_para)
      //
      this.msg = obj.DATAS.STATUS;
      if (obj.DATAS.STATUS == "OK") {
        this.msg = "착신설정 완료.";
        this.msg_color = "blue";
      } else {
        this.msg = "착신설정 미완료 \n 관리자에게 문의 바람.";
        this.msg_color = "red";
      }
      //
      this.disp_yn = true;
    },
    // 착신해제
    async click_stopforward() {
      let param = {
        telno_070: this.telno_070,
        chacsin_telno: this.telno,
      };

      let obj_para = {
        target: "PChacsin",
        act: "LGUPLUS",
        method: "post",
        url: "http://21cnkc.iptime.org:4000/api/lguplus/stopforward",
        ctx_body_para: param,
      };
      //
      let { err, obj } = await this.$store.dispatch("return/axios_return", obj_para)
      //
      this.msg = obj.DATAS.STATUS;
      if (obj.DATAS.STATUS == "OK") {
        this.telno = "";
        this.msg = "착신해제 완료.";
        this.msg_color = "orange";
      } else {
        this.msg = "착신해제 미완료, 관리자에게 문의 바람.";
        this.msg_color = "red";
      }
      //
      this.disp_yn = true;
    },
  },
};
</script>
<style lang="sass">
.v-settings
    .v-item-group > *
        cursor: pointer

    &__item
        border-width: 3px
        border-style: solid
        border-color: transparent !important

    &--active
        border-color: #00cae3 !important
</style>
