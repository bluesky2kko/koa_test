<template>
    <!-- 그룹선택, -->
    <v-dialog 
        v-model="c_select.dialog"
        :fullscreen="c_select.fullscreen"
        :max-width="c_select.max_width"
        persistent
        scrollable
        >
        <keep-alive><!-- keep-alive를 지정해야 this.$nuxt.$emit, this.$nuxt.on 등이 여러번 발생하지 않는다. -->
            <component 
                :is="c_select.cpnt_nm">
            </component>
        </keep-alive>
    </v-dialog>
</template>
<script>
export default {
  components: {
    'CTreeView': () => import('~/components/dialog/CTreeView.vue'),
  },
  data() {
    return {
        //
    };
  },
  computed: {
    c_select() {
      return this.$store.state.c_select
    },
  },
  mounted: function () {
    console.log(new Date() + " => CSelect.vue mounted")
    //alert(this.$route.path)
  },
  methods: {
    //
  },
};
</script>