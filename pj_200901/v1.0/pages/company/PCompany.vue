<template>
  <v-container fluid
    height="100%"
  >

    <v-card style="padding: 20px 20px 40px 20px; margin-top: 12px;">

        <c-title />

        <v-card-text class="pt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi nobis a at voluptates culpa optio amet! Inventore deserunt voluptatem maxime a veniam placeat, eos impedit nulla quos? Officiis, aperiam ducimus.
        </v-card-text>

        <v-divider></v-divider>
            
        <v-virtual-scroll
            :items="items"
            :item-height="50"
            id="myHeight"
        >
            <template v-slot="{ item }">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-avatar
                            color="primary"
                            size="56"
                            class="white--text"
                            >
                            {{ item.id }}
                        </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn
                        depressed
                        small
                        >
                        View User

                        <v-icon
                            color="orange darken-4"
                            right
                        >
                            mdi-open-in-new
                        </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>

                <v-list-item v-if="item.id==tot_cnt"
                    v-intersect="{
                        handler: onIntersect,
                        options: {
                            threshold: [0, 0.5, 1.0]
                        }
                    }">
                    <v-list-item-action>
                        <v-btn depressed small>
                        + More &nbsp;
                        <v-icon
                            color="orange darken-4"
                        >
                            mdi-dots-horizontal-circle
                        </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </template>

        </v-virtual-scroll>

        <v-divider></v-divider>

    </v-card>

    <c-fabuttons
        @child_add="click_add"
        :props_cfabuttons="props_cfabuttons"
        />   

  </v-container>
</template>

<script>
export default {
    data: () => ({ 
        props_cfabuttons: {
            cpnt_nm: 'PCompany',
            //bg_color: 'red'
        },         
        page: 1,
        items: [],
        tot_cnt: 0
    }),
    //
    computed: {
      //
    },
    //
    async mounted() {
        // 항목 => postId, id, name, email, body
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/comments?_page=${this.page}&_limit=20`
        )

        this.items = await res.json()
        
        this.tot_cnt = this.items.length
    },
    //
    methods: {
        async onIntersect (entries, observer, isIntersecting) {
            alert(isIntersecting);
            this.page++;
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/comments?_page=${this.page}&_limit=20`
            )

            const items = await res.json()
            //this.items = [...this.items, ...items]
            this.items = this.items.concat(items)

            this.tot_cnt = this.items.length
        },
        click_add() {
            //
        },
    }
}
</script>
<style scoped>
#myHeight {
  height: calc(100vh - 305px);
}
</style>