<template>
    <v-menu
        ref="menu"
        v-model="modal"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            :label="props_ctime.label"
            append-icon="mdi-clock-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal"
          v-model="time"
          full-width
          @click:minute="save(time)"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <!-- <v-btn text color="primary" @click="save(time)">OK</v-btn> -->
        </v-time-picker>
      </v-menu>
</template>
<script>
export default {
    props: ["props_ctime"],
    //
    data () {
        return {
            modal: false
        }
    },
    computed: {
        //===============================================================
        // json이 대분류가 안닌 놈, 즉 json이 말단 위치인 값 변경은 아래처럼
        // get, set 모두 선언해야 함...
        //===============================================================
        time: {
            get: function() {
                let c_time = this.$store.state.c_time
                if (this.props_ctime.gubun=='start') {
                    return c_time.start
                } else if (this.props_ctime.gubun=='end') {
                    return c_time.end
                }
            },
            set: function(newValue) {
                //alert("set : " + newValue)
                let c_time = this.$store.state.c_time
                if (this.props_ctime.gubun=='start') {
                    c_time.start = newValue
                } else if (this.props_ctime.gubun=='end') {
                    c_time.end = newValue
                }
            }
        },
        //===============================================================        
    },
    mounted: function () {
        console.log(new Date() + " => c_time.vue mounted")
        //alert(this.$route.path)
        //alert("CTime mounted")
    },
    methods: {
        save(p_time) {
            //alert(this.props_ctime.label)
            this.$refs.menu.save(p_time)
            this.$emit("child_ctime", p_time)
            this.modal = false
        }
    },
};
</script>