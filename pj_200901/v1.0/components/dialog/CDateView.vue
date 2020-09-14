<template>
    <v-menu
        ref="menu"
        v-model="c_date_view.dialog"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <v-date-picker 
            v-model="c_form.s_data.start" 
            no-title 
            scrollable
            @input="save(c_form.s_data.start)"
        >    
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="click_cancel">Cancel</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
  export default {
    computed: {
        c_date_view() {
            return this.$store.state.c_date_view
        },
        c_form() {
            return this.$store.state.c_form
        }
    },
    mounted: function () {
        console.log(new Date() + " => c_dateview.vue mounted")
        //alert(this.$route.path)
    },
    methods: {
        save(p_date) {
            alert(p_date)
            //this.$refs.menu.save(p_date)

            if (this.$store.state.c_date_view.gubun=="start") {
                this.c_form.s_data.start = p_date
            } else {
                this.c_form.s_data.end = p_date
            }

            this.c_date_view.dialog = false
        },
        click_cancel() {
            this.c_date_view.dialog = false
        }
    },
  }
  </script>