<template>
  <v-container fluid 
    style="margin-top:30px;"
    >
    <v-row justify="center">
      <v-col cols="12" md="8"
      style="padding-bottom: 50px;">
        <v-card style="padding: 20px;">

          <c-title />
          
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field label="Company (disabled)" disabled />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="User Name" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Email Address" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="First Name" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Last Name" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Adress" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="City" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Country" class="purple-input" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="Postal Code" type="number" />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn :color="$store.state.barColor" class="mr-0 white--text">Update Profile</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="4"
      style="padding-bottom: 50px;">

        <v-card style="padding-top: 20px; padding-bottom: 15px;">

          <div style="text-align: center; margin-top: -64px;">
            <v-avatar size="128" color="grey">
              <v-img
                :src="'https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg'"
              />
            </v-avatar>
          </div>

          <v-card-text class="text-center">
            <h6 class="subtitle-1 grey--text mb-2">CEO / CO-FOUNDER</h6>
            <h4 class="font-weight-light mb-3 black--text" style="font-size:24px;">Alec Thompson</h4>

            <p
              class="font-weight-light grey--text"
            >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>

            <v-btn :color="$store.state.barColor" rounded class="mr-0 white--text">Follow</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


