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
                outlined
                clearable
                clear-icon="mdi-close-circle-outline"
            ></v-text-field>
        </v-card-title>

        <v-divider></v-divider>

        <v-row dense style="margin-top: -0px">
            <v-col>
                <v-card-text style="height: 100%;">
                    <!--
                    TypeError: Cannot read property 'toLocaleLowerCase' of undefined 오류발생시
                    db data 가공시 name를 name으로 바꾸어 주어야 함 ... (개고생)
                    -->
                    <v-treeview
                    :activatable="true"
                    :selectable="true"
                    :open-all="true"
                    :search="search"
                    :filter="filter"
                    selected-color="red"
                    return-object
                    :items="PTree.m_data"
                    v-model="PTree.chk_data"
                    >
                    <template v-slot:label="{ item, open, leaf }">
                        <v-icon style="color:orange;">{{"mdi-" + item.icon}}</v-icon>
                        <a
                        v-if="item.icon == 'folder'"
                        @click.stop="click_edit_group(item, open, leaf)"
                        >{{ item.name }}</a>
                        <a v-if="item.icon != 'folder'" @click.stop="click_edit_addr(item)">{{ item.name }}</a>
                        &nbsp;&nbsp;&nbsp;
                        <v-icon
                        v-if="item.icon == 'folder'"
                        @click.stop="click_add_tree(item)"
                        >mdi-folder-plus-outline</v-icon>&nbsp;&nbsp;
                        <v-icon
                        v-if="item.icon == 'folder'"
                        @click.stop="click_add_addr(item)"
                        >mdi-account-plus-outline</v-icon>&nbsp;&nbsp;
                        (
                        <v-icon v-if="item.icon != 'folder'" @click.stop="click_phone(item)">mdi-phone</v-icon>
                        <v-icon v-if="item.icon != 'folder'" @click.stop="click_sms(item)">mdi-message</v-icon>
                        <v-icon v-if="item.icon != 'folder'" @click.stop="click_fax(item)">mdi-fax</v-icon>
                        <v-icon v-if="item.icon != 'folder'" @click.stop="click_email(item)">mdi-email</v-icon>)
                    </template>
                    </v-treeview>
                </v-card-text>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col cols="12" md="6">
                <v-card-text>
                    <div v-if="PTree.chk_data.length === 0"
                            key="title"
                            class="title font-weight-light grey--text pa-4 text-center"
                            >
                            좌측의 그룹선택 자료 ...
                    </div>

                    <v-scroll-x-transition group hide-on-leave>
                    <v-chip
                        v-for="(selection, i) in PTree.chk_data"
                        :key="i"
                        color="grey"
                        dark
                        small
                        class="ma-1"
                    >
                        <v-icon left small>mdi-checkbox-marked-outline</v-icon>
                        {{ selection.name }}
                    </v-chip>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn text @click="PTree.chk_data = []">Reset</v-btn>

            <v-spacer></v-spacer>

            <v-btn v-if="PTree.chk_data.length > 0" class="white--text" 
                :color="$store.state.c_title.bg_color" depressed>
            SMS
            <v-icon right>mdi-message</v-icon>
            </v-btn>

            <v-btn v-if="PTree.chk_data.length > 0" 
                class="pink white--text"
                color="red" 
                depressed
                @click.stop="click_delete()"
                >
                삭제
                <v-icon right>mdi-delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

</v-container>
</template>

<script>
export default {
  //layout: 'default',  // 선언 안해도 default.vue를 가리킴 ...
  data() {
    return {
        search: "",
    }
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
    PTree() {
      return this.$store.state.PTree
    },
    c_form() {
      return this.$store.state.c_form
    },
  },
  mounted: function () {
    console.log(new Date() + " => PTree.vue mounted")
    //
    if (this.PTree.m_data.length==0) {
        this.get_tree()
    }
  },
  methods: {
    async get_tree() {
      this.PTree.m_data = [] // clear
      //
      let obj_para = {
        act: "SM",
        url: "http://21cnkc.iptime.org:4000/api/tree",
        ctx_body_para: this.cond,
      }
      //
      let { err, obj } = await this.$store.dispatch("return/axios_return", obj_para)
      //alert(err)
      if (err) {
        this.$store.commit("error/act_error", obj)
        return false;
      }

      //
      let j_obj
      let tree_rows = []
      //
      obj.forEach(function (value) {
        j_obj = {};
        j_obj["id"] = value.id.toString()
        j_obj["parent_id"] = value.parent_id.toString()
        j_obj["group_cd"] = value.group_cd
        j_obj["name"] = value.group_nm // group_nm을 반드시 name으로 set 해야함... -> filter링시 오류 발생함.(개고생)
        j_obj["lev"] = value.lev
        j_obj["pos"] = value.pos
        j_obj["icon"] = "folder"
        if (value.name == "개인주소록") {
          j_obj["icon"] = "folder"
        } else if (value.name == "공유주소록") {
          j_obj["icon"] = "folder"
        } else if (value.name == "회사주소록") {
          j_obj["icon"] = "folder"
        }
        tree_rows.push(j_obj)
      })

      // 완전 별개로 tree 복제... : 아래처럼 json으로 처리...
      //this.$store.state.menu.tree_folder_copy = JSON.parse(JSON.stringify(obj))
      //alert(this.$store.state.menu.tree_folder_copy)
      //
      this.tree_convert(tree_rows)
    },
    tree_convert(rows) {
      function exists(rows, parent_id) {
        let i
        for (i = 0; i < rows.length; i++) {
          if (rows[i].id == parent_id) return true
        }
        return false
      }

      let nodes = []
      // get the top level nodes
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        if (!exists(rows, row.parent_id)) {
          nodes.push({
            id: row.id,
            parent_id: row.parent_id,
            group_cd: row.group_cd,
            name: row.name,
            lev: row.lev,
            pos: row.pos,
            icon: row.icon,
          })
        }
      }

      var toDo = []
      for (let i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i])
      }

      while (toDo.length) {
        let node = toDo.shift() // the parent node
        // get the children nodes
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i]
          if (row.parent_id == node.id) {
            let child = {
              id: row.id,
              parent_id: row.parent_id,
              group_cd: row.group_cd,
              name: row.name,
              lev: row.lev,
              pos: row.pos,
              icon: row.icon,
            };
            if (node.children) {
              node.children.push(child)
            } else {
              node.children = [child]
            }
            toDo.push(child)
          }
        }
      }

      this.PTree.m_data = nodes
    },
    //
    //----------------------------------------------------------------------------
    click_add_tree(item) {
      this.c_form.cpnt_nm = "PTreeForm"

      //alert(item.name)
      let s_data = {
        id: 0,
        parent_id: item.id,
        group_cd: item.group_cd, // 개인,공통,사내 주소록
        group_nm: "",
        lev: item.lev + 1,
        pos: 0,
        group_nm_up: item.name,
      }
      //
      this.$store.commit("add", s_data)
    },
    click_add_addr(item) {
      this.c_form.cpnt_nm = "PMemberForm"

      let s_data = {
        id: 0,
        name: "",
        sajin: "",
        member_nm: "",
        group_nm: "",
        parent_id: item.id,
        company_nm: "",
        dept_nm: "",
        jickub_nm: "",
        upmoo_nm: "",
        memo: "",
        s_arr_tel: [],
        s_arr_fax: [],
        s_arr_email: [],
        s_arr_sotial: [],
        s_arr_addr: [],
        s_arr_anvday: [],
      }
      
      this.$store.commit("add", s_data)
    },
    click_edit_group(item, open, leaf) {
      this.c_form.cpnt_nm = "PTreeForm"
      //
      let url = "http://21cnkc.iptime.org:4000/api/tree?id=" + item.id
      let p_arr = ["PTree", "S", "get", url, {}]
      this.$store.dispatch("axios_siud", p_arr)
    },
    //
    click_edit_addr(item) {
      // for (let i in item) { console.log(i + " ==> " + item[i]) } 
    
      // 동적 컴포넌트명 set -> PForm.vue 에서 사용...
      this.c_form.cpnt_nm = "PMemberForm"

      let id = item.id.replace("A", "") // 주소록은 A+주소록ID 임...
      //
      let url = "http://21cnkc.iptime.org:4000/api/member?id=" + id
      let p_arr = ["PTree", "S", "get", url, {}]
      this.$store.dispatch("axios_siud", p_arr)
    },
    //
    //
    click_phone(item) {
      //
    },
    click_sms(item) {
      alert("click_sms")
    },
    click_fax(item) {},
    click_email(item) {},
    //
    click_delete() {
      this.$store.state.c_delete.dialog = true
    },
  },
};
</script>
<style scoped>
a {
  color: black;
}
</style>