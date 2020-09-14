<template>
    
    <v-sheet elevation="6" width="100%" class=".rounded-2 pa-6 text-left white--text" 
    :style="{'margin-top':'-40px', 'background-color': c_title.bg_color}">
        <v-icon x-large color="white">{{ c_title.icon }}</v-icon>                
        <div style="margin-left: 60px; margin-top: -40px;" class="display-1 white--text">{{ c_title.title }}</div>
    </v-sheet>

</template>
<script>
export default {
    computed: {
        c_title() {
            return this.$store.state.c_title
        }  
    }
}
</script>
