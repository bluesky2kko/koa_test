<template>
  <v-container fluid>

        <v-card style="padding: 20px 20px 40px 20px;">

          <c-title />
          
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>

          <v-sheet height="600">

            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="m_data"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>

            <!-- 입력창 -->
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" max-width="300" flat>
                <v-toolbar :color="s_data.color" dark>
                  <v-btn icon @click.stop="click_close()">
                      <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>일정등록</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon @click.stop="save">
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form">
                    <v-text-field v-model="s_data.name" label="내용" ></v-text-field>

                    <v-text-field
                        v-model="c_forms.s_data.start"
                        label="시작일"
                        append-icon="mdi-calendar-range"
                        readonly
                        @click="click_date('start')"
                    >
                    </v-text-field>

                    <v-row>
                        <v-col>
                            <c-date  
                                @child_cdate="click_save_cdate_start"
                                :props_cdate="props_cdate_start"
                            />
                        </v-col>
                        <v-col>
                            <c-time
                                @child_ctime="click_save_ctime_start"
                                :props_ctime="props_ctime_start"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <c-date-2
                                @child_cdate="click_save_cdate_end"
                                :props_cdate="props_cdate_end"
                            />
                        </v-col>
                        <v-col>
                            <c-time-2
                                @child_ctime="click_save_ctime_end"
                                :props_ctime="props_ctime_end"
                            />
                        </v-col>
                    </v-row>
                    <v-radio-group :readonly="false" v-model="s_data.color" row><!-- row : 가로 display -->
                        <v-radio label="시작" value="blue"></v-radio>
                        <v-radio label="중간" value="green"></v-radio>
                        <v-radio label="결제" value="orange"></v-radio>
                    </v-radio-group>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-menu>


          </v-sheet>

        </v-card>

  </v-container>
</template>
<script>
// 동영상 참조 => https://www.youtube.com/watch?v=2NOsjTT1b_k
// 소스 => https://github.com/jsfanatik/vuestacks-calendar-vue-firebase
import CDate from "~/components/dialog/CDate.vue"
import CDate2 from "~/components/dialog/CDate.vue"
import CTime from "~/components/dialog/CTime.vue"
import CTime2 from "~/components/dialog/CTime.vue"
export default {
    components: {
        CDate,
        CDate2,
        CTime,
        CTime2
    },
  data: () => ({
    props_cdate_start: {
        gubun: 'start',
        label: '시작일'
    },
    props_ctime_start: {
        gubun: 'start',
        label: '시간'
    },
    props_cdate_end: {
        gubun: 'end',
        label: '종료일'
    },
    props_ctime_end: {
        gubun: 'end',
        label: '시간'
    },
    //
    //
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedElement: null,
    selectedOpen: false,
    colors: ["blue","indigo","deep-purple","cyan","green","orange","grey darken-1"],
    names: ["Meeting","Holiday","PTO","Travel","Event","Birthday","Conference","Party"],
    //
    m_data: [],
    s_data: {},
  }),
  computed: {
    c_forms() {
        return this.$store.state.c_form
    }
  },
  mounted() {
    // 시작일과 종료일이 변경되었는지 확인합니다.
    // 변경된 경우 변경 이벤트를 업데이트하고 내 보냅니다.
    this.$refs.calendar.checkChange();

    const events = [
        {
            idx: 0,
            name: 'Weekly Meeting',
            start: '2020-09-07 10:00',
            end: '2020-09-07 11:00',
            color: "blue"
        },
        {
            idx: 1,
            name: 'Mash Potatoes',
            start: '2020-09-09 12:30',
            end: '2020-09-09 15:30',
            color: "orange"
        },
        {
            idx: 2,
            name: 'Thomas\' Birthday',
            start: '2020-09-10 05:00',
            end: null,
            color: "green"
        }
      ]

      this.m_data = events;

    //   alert(events[0].start.substr(0,10))
    //   alert(events[0].start.substr(11,5))
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    //
    //
    getEventColor(event) {
      //alert("getEventColor : " + event)  // events[] 배열에 입력된 건수 만큼 이벤트가 발생함...
      //---------------------------------------------------------------
      // events[] 배열에 등록된 object 그대로 display됨
      // name, start, [end], color
      //---------------------------------------------------------------
      // for (var i in event) {
      //   console.log(i + " : " + event[i])
      // }
      return event.color;
    },
    //
    showEvent({ nativeEvent, event }) {
      //alert("showEvent")
      //alert(nativeEvent.target)
      //---------------------------------------------------------------
      // events[] 배열에 등록된 object 그대로 display됨
      // name, start, [end], color
      //---------------------------------------------------------------
      // for (var i in event) {
      //   console.log(i + " : " + event[i])
      // }
      //
      const open = () => {
        this.s_data = event
        this.$store.state.c_form.s_data = event
        this.$store.state.c_form.s_data.start = event.start.substr(0,10)
        //
        this.$store.state.c_date.start = this.s_data.start.substr(0,10)
        this.$store.state.c_time.start = this.s_data.start.substr(11,5)
        //
        if (this.s_data.end) {
            this.$store.state.c_date.end = this.s_data.end.substr(0,10)
            this.$store.state.c_time.end = this.s_data.end.substr(11,5)
        } else {
            this.$store.state.c_date.end = null
            this.$store.state.c_time.end = null
        }
        //
        //
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    //
    updateRange({ start, end }) {
      //alert("updateRange")
      // start, end => Object
      //---------------------------------------------------------------
      // date, time, year, month, day, weekday, hour, minute,
      // true/false => hasDay, hasTime, past, present, future
      //---------------------------------------------------------------
      // console.log(start + " : " + end)
      // for (var i in start) {
      //   console.log(i + " : " + start[i])
      // }
    },
    click_save_cdate_start(p_date) {
        alert("click_save_cdate_start")
        let idx = this.s_data.idx
        this.s_data.start = p_date + " " + this.s_data.start.substr(11,5)
        this.m_data[idx].start = p_date + " " + this.s_data.start.substr(11,5)
    },
    click_save_ctime_start(p_time) {
        alert("click_save_ctime_start")
        let idx = this.s_data.idx
        //this.s_data.start = this.s_data.start.substr(0,10) + " " + p_time
        this.m_data[idx].start = this.s_data.start.substr(0,10) + " " + p_time
    },
    click_save_cdate_end(p_date) {
        alert("click_save_cdate_end : " + p_date)
        let idx = this.s_data.idx
        if (this.s_data.end != null) {
            if (this.s_data.end.length > 10) {
                //this.s_data.end = p_date + " " + this.s_data.end.substr(11,5)
                this.m_data[idx].end = p_date + " " + this.s_data.end.substr(11,5)
            } else {
                //this.s_data.end = p_date
                this.m_data[idx].end = p_date
            }
        } else {
            //this.s_data.end = p_date
            this.m_data[idx].end = p_date
        }
    },
    click_save_ctime_end(p_time) {
        alert("click_save_ctime_end")
        let idx = this.s_data.idx
        if (this.s_data.end != null) {
            if (this.s_data.end.length >= 10) {
                //this.s_data.end = this.s_data.end.substr(0,10) + " " + p_time
                this.m_data[idx].end = this.s_data.end.substr(0,10) + " " + p_time
            }
        }
    },
    click_date(gubun) {
        this.$store.state.c_date_view.gubun = gubun
        this.$store.state.c_date_view.dialog = true
    },
    click_close() {
        this.selectedOpen = false
    },
  },
}
</script>