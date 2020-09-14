<template>
<!-- mobile-breakpoint="960" 화면이 960 보다 크면 좌측메뉴가 보이게 하라 -->
<v-navigation-drawer
    v-model="c_drawer.drawer"
    :mini-variant="c_drawer.miniVariant"
    :src="c_drawer.bg_image"
    mini-variant-width="65"
    app
    dark
    mobile-breakpoint="960"
    width="260"
    height="100%"
    class="overflow-y-auto"
    >
    <!--v-system-bar></v-system-bar-->
    <div v-bind:style="{'height':'100%','background-color':c_drawer.bg_color, 'opacity':'0.90'}">
    <v-list
      dense
      nav>
        <v-list-item>
            <v-list-item-avatar>
                <v-img v-if="c_drawer.miniVariant==false" src="https://cdn.pixabay.com/photo/2013/07/13/10/09/detective-156647__340.png"></v-img><!-- https://cdn.vuetifyjs.com/images/john.png -->
                <v-btn v-else  elevation="1" icon @click.stop="click_miniVariant()">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </v-list-item-avatar>
            <v-list-item-content>
              엑스피오게이트
            </v-list-item-content>
            <v-list-item-action>
                <v-btn elevation="1" icon @click.stop="click_miniVariant()">
                    <v-icon>mdi-{{ `chevron-${c_drawer.miniVariant ? 'right' : 'left'}` }}</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>

        
        <v-list-item v-if="xpo_disp_yn">
            <v-list-item-content>
                <v-list-item-title class="subtitle-1">Team Of Xpogate</v-list-item-title>
                <v-list-item-subtitle>bluesky@xpogate.co.kr</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-icon style="margin-left: -5px;">mdi-menu-down</v-icon>
            </v-list-item-action>
        </v-list-item>

    </v-list>
      
    <!--v-divider class="mb-2" /-->

    <!-- nav : 모서리 라운드 -->
    <v-list
        dense
        nav
    >
        <v-list-item-group
            v-model="item"
            v-bind:style="{'margin-left': bind_left, 'width': bind_width}"
        >
          <!-- :to="item.to" -->
            <v-list-item 
                v-for="(item, i) in items"
                :key="i"
                router
                exact
                dark
                active-class=""
                @click.stop="go_menu(item)"
                ><!-- active-class="blue white--text" ==> pink, green, blue, -->
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
    </div>

</v-navigation-drawer>
</template>
<script>
export default {
    data () {
      return {
        bind_left: "10px",
        bind_width: "92%",
        xpo_disp_yn: true,
        //
        item: 0,
        items: [         
          {
            icon: 'mdi-view-dashboard',
            text: 'DASHBOARD',
            to: '/board/PDashBoard'
          },
          {
            icon: 'mdi-calendar-range',
            text: '일정관리',
            to: '/todo/PCalendar'
          },          
          {
            icon: 'mdi-account',
            text: '프로파일',
            to: '/member/PUser'
          },
          {
            icon: 'mdi-account-multiple',
            text: '그룹관리',
            to: '/tree/PTree'
          },
          {
            icon: 'mdi-microsoft-internet-explorer',
            text: '사이트관리',
            to: '/site/PSite'
          },
          {
            icon: 'mdi-image-album',
            text: '제품관리',
            to: '/jepum/PJepum'
          },          
          {
            icon: 'mdi-domain',
            text: '업체관리',
            to: '/company/PCompany'
          },
          {
            icon: 'mdi-star',
            text: '즐겨찾기',
            to: '/company/PStar'
          },          
          {
            icon: 'mdi-clipboard-outline',
            text: '발주서',
            to: '/balju/PBalju'
          },
          {
            icon: 'mdi-cash-100',
            text: '관리비',
            to: '/gwanri/PGwanribi'
          }        
        ],
        //
        title: 'Xpogate'
      }
    },
    computed: {
        c_drawer() {
            return this.$store.state.c_drawer
        }
    },
    mounted () {
      console.log("CDrawer.vue => ")
      console.log(this.$vuetify.breakpoint)
      //this.$vuetify.breakpoint.mobileBreakpoint = 960
    },
    methods: {
      click_miniVariant() {
        this.c_drawer.miniVariant = !this.c_drawer.miniVariant
        //
        // 아래부분 아주 잘 했음 ... ㅋㅋ
        if (this.c_drawer.miniVariant) {
            this.xpo_disp_yn = false
            this.bind_left = "0px"
            this.bind_width = "100%"
        } else {
            this.xpo_disp_yn = true
            this.bind_left = "10px"
            this.bind_width = "92%"
        }        
      },
      go_menu(item) {
        this.$store.state.c_appbar.barLocation = "Home" + item.to
        //
        this.$store.state.c_title.icon = item.icon
        this.$store.state.c_title.title = item.text
        //
        //alert(item.to)
        this.$router.push(item.to);
      },
    }    
}
</script>
