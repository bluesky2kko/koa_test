<template>
  <div>
    <v-btn
      v-if="chk_data_cnt > 0"
        fixed dark fab bottom right
        :color="bg_color"
        @click.stop="click_delete()"
    >
        <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-btn v-else 
        fixed dark fab bottom right 
        :color="bg_color"
        @click.stop="click_add()">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: ["props_cfabuttons"],
  //
  data() {
    return {
      bg_color: this.$store.state.c_title.bg_color
    };
  },
  //
  computed: {
    chk_data_cnt() {
      let cpnt_nm = this.props_cfabuttons.cpnt_nm
      return this.$store.state[cpnt_nm].chk_data.length
    },
  },  
  //
  mounted: function () {
    if (this.props_cfabuttons.bg_color !== undefined) {
      this.bg_color = this.props_cfabuttons.bg_color
    }
  },
  // 자식 컴포넌트에서 부모 컴포넌트로 값 전달 $emit() 사용법
  methods: {
    click_add() {
      this.$emit("child_add")
    },
    click_delete() {
      this.$store.state.c_delete.dialog = true
    },
  },
};
</script>