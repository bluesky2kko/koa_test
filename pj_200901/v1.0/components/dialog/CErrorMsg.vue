<template>
    <v-dialog v-model="c_error_msg.dialog" persistent max-width="320">
        <v-card>
            <v-card-title class="headline" style="color:red;">Error</v-card-title>
            <v-card-text>{{ c_error_msg.msg }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="bg_color" @click.stop="click_confirm">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    computed: {
        c_error_msg() {
            return this.$store.state.c_error_msg
        },
        bg_color() {
            return this.$store.state.c_toolbar.bg_color
        }
    },
    mounted () {
        console.log(new Date() + " => CErrMsg.vue mounted")
    },
    methods: {
        click_confirm () {
            this.c_error_msg.dialog = false
        }
    }
}
</script>