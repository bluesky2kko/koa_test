<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col 
      v-for="index in 3" 
      :key="index"
      cols="12" 
      lg="4" 
      style="padding-bottom: 50px;">
        <v-card style="padding: 20px;">
          <div style="margin-top: -40px;">
            <v-sheet elevation="6" rounded width="100%" class=".rounded-2 pa-6 text-left" :style="{'background-color': $store.state.c_title.bg_color}">
              <div class="display-1 white--text">Edit Profile</div>
              <div class="subtitle-1 white--text font-weight-light">Complete your profile</div>
            </v-sheet>
          </div>

          <div style="height: 10px"></div>
          <h4 class="card-title font-weight-light ml-2 mt-2">Website Views</h4>

          <p
            class="card-title font-weight-light ml-2 mt-2"
            style="color:gray"
          >Last Campaign Performance</p>

          <v-divider></v-divider>

          <div style="margin: 10px 0px 0px 10px;">
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </div>
        </v-card>
      </v-col>

      <v-col 
      v-for="index in 4" 
      :key="index"
      cols="12" sm="6" lg="3" 
      style="padding-bottom: 50px;">
        <v-card style="padding: 20px;">
          <div style="margin-top: -40px;">
            <v-sheet elevation="6" rounded width="100px" class=".rounded-2 pa-6 text-center green">
              <v-icon x-large color="white">mdi-twitter</v-icon>
            </v-sheet>

            <div class="ml-auto text-right" style="margin-top: -50px;">
              <div class="body-3 grey--text font-weight-light">Followers</div>

              <h2 class="subtitle-3 font-weight-light text--primary">+245</h2>
            </div>

            <v-col cols="12" class="px-0">
              <v-divider />
            </v-col>

            <v-icon color="gray" size="16" class="ml-2 mr-1">mdi-tag</v-icon>

            <span
              color="primary"
              class="caption grey--text font-weight-light"
            >Tracked from Google Analytics</span>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" style="padding-bottom: 50px;">
        <v-card style="padding: 20px;">
            
          <div style="margin-top: -40px; margin-bottom: 20px;">
            <v-sheet elevation="6" rounded width="100px" class=".rounded-2 pa-6 text-center orange">
              <v-icon x-large color="white">mdi-clipboard-text</v-icon>
            </v-sheet>               
            <!-- v-sheet의 width=100px 보다 크게 잡아 준다 => margin-left: 120px; -->
            <div style="margin-left: 120px; margin-top: -50px;">
              <div class="display-1 font-weight-light">Simple Table</div>
            </div>
          </div>

          <v-card-text>
            <v-data-table :headers="headers" :items="items" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" style="padding-bottom: 50px;">
        <v-card style="padding: 20px;">
          <div style="margin-top: -40px;">
            <v-sheet
              elevation="6"
              rounded
              width="100%"
              height="115px"
              class=".rounded-2 pa-6 text-left blue"
            >
              <v-tabs
                color="white"
                v-model="tabs"
                background-color="transparent"
                slider-color="white"
              >

                <span class="subheading font-weight-light mx-3" style="align-self: center">Tasks:</span>
                
                <v-tab class="mr-3">
                  <v-icon class="mr-2">mdi-bug</v-icon>Bugs
                </v-tab>
                <v-tab class="mr-3">
                  <v-icon class="mr-2">mdi-code-tags</v-icon>Website
                </v-tab>
                <v-tab class="mr-3">
                  <v-icon class="mr-2">mdi-cloud</v-icon>Server
                </v-tab>
              </v-tabs>
            </v-sheet>
          </div>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-tab-item v-for="n in 3" :key="n">
              <v-card-text>
                <template v-for="(task, i) in tasks[tabs]">
                  <v-row :key="i" align="center">
                    <v-col cols="1">
                      <v-list-item-action>
                        <v-checkbox v-model="task.value" color="secondary" />
                      </v-list-item-action>
                    </v-col>

                    <v-col cols="9">
                      <div class="font-weight-light" v-text="task.text" />
                    </v-col>

                    <v-col cols="2" class="text-right">
                      <v-icon class="mx-1">mdi-pencil</v-icon>
                      <v-icon color="error" class="mx-1">mdi-close</v-icon>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardDashboard",

  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {},
            },
          ],
        ],
      },
      headers: [
        {
          sortable: false,
          text: "ID",
          value: "id",
        },
        {
          sortable: false,
          text: "Name",
          value: "name",
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right",
        },
        {
          sortable: false,
          text: "Country",
          value: "country",
          align: "right",
        },
        {
          sortable: false,
          text: "City",
          value: "city",
          align: "right",
        },
      ],
      items: [
        {
          id: 1,
          name: "Dakota Rice",
          country: "Niger",
          city: "Oud-Tunrhout",
          salary: "$35,738",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          country: "Curaçao",
          city: "Sinaai-Waas",
          salary: "$23,738",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          country: "Netherlands",
          city: "Overland Park",
          salary: "$56,142",
        },
        {
          id: 4,
          name: "Philip Chanley",
          country: "Korea, South",
          city: "Gloucester",
          salary: "$38,735",
        },
        {
          id: 5,
          name: "Doris Greene",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
          salary: "$63,542",
        },
      ],
      tabs: 0,
      tasks: {
        0: [
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: false,
          },
          {
            text: "Create 4 Invisible User Experiences you Never Knew About",
            value: true,
          },
        ],
        1: [
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: false,
          },
        ],
        2: [
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
        ],
      },
      list: {
        0: false,
        1: false,
        2: false,
      },
    };
  },

  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
  },
};
</script>
