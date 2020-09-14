
<template>
  <v-app-bar
    id="app-bar"
    fixed
    app
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click.stop="click_drawer()"
    >
      <v-icon style="color:gray;">mdi-menu</v-icon><!-- mdi-dots-vertical -->
    </v-btn>

    <!-- v-text="$route.name" -->
    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$store.state.c_appbar.barLocation"
    />

    <v-spacer />

    <v-text-field
      :label="search"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/board/PDashBoard"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>5</span>
            </template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list        
        style="margin:0px; padding:10px;"
      >
        <div id="alrim_msg">
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="click_go_msg(item)"   
            >
                <v-list-item-title 
                    style="margin:0px; padding:0px;"
                    v-text="item.text"
                ></v-list-item-title>
            </v-list-item>
        </div>
    </v-list>
    </v-menu>

    <v-btn
      class="ml-2"
      min-width="0"
      text
      @click.stop="click_rightDrawer()"
    >
      <v-icon>mdi-cog</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            items: [
                {
                    text: 'Mike John Responded to your email',
                    to: '/lguplus/PChacsin'
                },            
                {
                    text: 'You have 5 new tasks',
                    to: '/member/PUser'
                },            
                {
                    text: 'You\'re now friends with Andrew',
                    to: '/tree/PTree'
                },
                {
                    text: 'Another Notification',
                    to: '/company/PCompany'
                },
                {
                    text: 'Another one',
                    to: '/gwanri/PGwanribi'
                }
            ],
        }
    },
    computed: {
        c_drawer() {
            return this.$store.state.c_drawer
        },
        c_drawer_right() {
            return this.$store.state.c_drawer_right
        },
    },
    methods: {        
        click_drawer() {
            this.c_drawer.drawer = !this.c_drawer.drawer
        },
        click_rightDrawer() {
            this.c_drawer_right.drawer = !this.c_drawer_right.drawer
        },
        click_go_msg(item) {
            alert(item.to)
        }
    }
}
</script>
<style scoped>
#alrim_msg div:hover{
    background: purple;
    color: white;
}
</style>