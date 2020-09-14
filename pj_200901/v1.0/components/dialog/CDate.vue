<template>
    <v-menu
        ref="menu"
        v-model="modal"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="props_cdate.label"
            append-icon="mdi-calendar-range"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        
        <v-date-picker 
            v-model="date" 
            no-title 
            scrollable
            @input="save(date)"
        >    
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <!-- <v-btn text color="primary" @click="save(date)">OK</v-btn> -->
        </v-date-picker>
    </v-menu>
</template>
<script>
export default {
    props: ["props_cdate"],
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
        date: {
            get: function() {
                let c_date = this.$store.state.c_date
                if (this.props_cdate.gubun=='start') {
                    return c_date.start
                } else if (this.props_cdate.gubun=='end') {
                    return c_date.end
                }
            },
            set: function(newValue) {
                //alert("set : " + newValue)
                let c_date = this.$store.state.c_date
                if (this.props_cdate.gubun=='start') {
                    c_date.start = newValue
                } else if (this.props_cdate.gubun=='end') {
                    c_date.end = newValue
                }
            }
        },
        //===============================================================
    },
    mounted: function () {
        console.log(new Date() + " => c_date.vue mounted")
        //alert(this.$route.path)
        //alert("CDate mounted")
    },
    methods: {
        save(p_date) {
            //alert(this.props_cdate.label)
            this.$refs.menu.save(p_date)
            this.$emit("child_cdate", p_date)
            this.modal = false
        }
    },
};
</script>