<template>
<v-card>
    <v-card-title>
        <v-chip 
            dark
            :color="bg_color"
        >
            &nbsp;&nbsp;그룹을 선택하세요...&nbsp;&nbsp;
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="click_close()">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height:300px;">         
        <v-treeview
            hoverable
            selected-color
            :items="$store.state.PTree.m_data"
            >
            <template v-slot:label="{ item }">
                <a v-if="item.icon=='folder'" @click.stop="click_treeview(item)">{{ item.name }}</a>
            </template>
        </v-treeview>
    </v-card-text>
</v-card>
</template>
<script>
export default {
    computed: {
        bg_color() {
            return this.$store.state.c_title.bg_color
        },       
    },    
    methods: {
        click_treeview(item) {
            //
            if (this.$store.state.c_select.parent_cpnt_nm=="PTreeForm") {
                this.$store.commit("click/click_treeview_ptree", item)
                //
            } else if (this.$store.state.c_select.parent_cpnt_nm=="PMemberForm") {
                this.$store.commit("click/click_treeview_pmember", item)
            }
            //
            this.$store.state.c_select.dialog = false
        },
        click_close() {
            this.$store.state.c_select.dialog = false
        }
    }
}
</script>