<template>
    <v-dialog 
        v-model="c_form.dialog"
        :fullscreen="get_mobile_chk"
        persistent
        scrollable
        hide-overlay        
        max-width="500"
        >
        <keep-alive><!-- keep-alive를 지정해야 this.$nuxt.$emit, this.$nuxt.on 등이 여러번 발생하지 않는다. -->
            <component 
                :is="c_form.cpnt_nm">
            </component>
        </keep-alive>
    </v-dialog>
</template>

<script>
export default {
  components: {
    'PJepumForm': () => import('~/pages/jepum/PJepumForm.vue'),
    'PTreeForm': () => import('~/pages/tree/PTreeForm.vue'),
    'PMemberForm': () => import('~/pages/member/PMemberForm.vue'),
    'PSiteForm': () => import('~/pages/site/PSiteForm.vue'),
  },
  data() {
    return {
        get_mobile_chk: this.$store.getters["get_mobile_chk"],
    };
  },
  computed: {
    c_form() {
        return this.$store.state.c_form
    }
  },
  mounted: function () {
    console.log(new Date() + " => "+ this.$route.path + "CForm.vue mounted");
  },
  methods: {
    //
  },
};
</script>