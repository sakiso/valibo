<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <v-row height="100%" justify="center">
          <v-card min-width="430px" color="blue lighten-4" align="center">
            <v-card-title> チーム登録 </v-card-title>

            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-text-field
                    label="チーム名"
                    v-model="teamInfo.teamName"
                  ></v-text-field>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-map-marker</v-icon>
                  </v-list-item-icon>
                  <v-text-field
                    label="活動場所"
                    v-model="teamInfo.placeOfActivity"
                  ></v-text-field>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-fire</v-icon>
                  </v-list-item-icon>
                  <v-slider
                    v-model="teamInfo.levelOfSeriousness"
                    label="本気度"
                    max="4"
                    step="1"
                    :tick-labels="ticksLabels"
                  ></v-slider>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-calendar-clock </v-icon>
                  </v-list-item-icon>
                  <v-radio-group
                    label="活動ペース"
                    v-model="teamInfo.activityCycle.weekOrMonth"
                  >
                    <br />
                    <v-radio label="毎週" value="AWeek"></v-radio>
                    <v-radio label="毎月" value="AMonth"></v-radio>
                    <v-select
                      :items="times"
                      label="回数"
                      solo
                      v-model="teamInfo.activityCycle.timesAWeekOrMonth"
                    ></v-select>
                  </v-radio-group>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-btn large @click="entryTeam"> 登録 </v-btn>
            <br />
            <br />
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
  data: function () {
    return {
      times: [
        '1回',
        '2回',
        '3回',
        '4回',
        '5回',
        '6回',
        '7回',
        '8回',
        '9回',
        '10回以上',
      ],
      ticksLabels: ['1', '2', '3', '4', '5'],
      teamsRef: null,
      teamInfo: {
        teamName: '',
        placeOfActivity: '',
        levelOfSeriousness: '2',
        entryTimestamp: null,
        entryDate: '',
        activityCycle: {
          weekOrMonth: '',
          timesAWeekOrMonth: '',
        },
      },
    }
  },

  created: function () {
    //teamsコレクションへの参照
    this.teamsRef = db.collection('teams')
  },

  methods: {
    entryTeam() {
      //入力がなければ抜ける
      if (this.teamInfo === '') {
        console.log('入力なし')
        return
      }

      //timestamp取得
      const timestamp = new Date()
      //timestampからYYYY/MM/DD形式の文字列を取得
      const entryDate =
        timestamp.getFullYear() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getDate()

      //teamsコレクションへの登録
      this.teamsRef.add({
        team_name: this.teamInfo.teamName,
        place_of_activity: this.teamInfo.placeOfActivity,
        level_of_seriousness: this.teamInfo.levelOfSeriousness,
        entry_timestamp: timestamp,
        entry_date: entryDate,
        activity_cycle: {
          week_or_month: this.teamInfo.activityCycle.weekOrMonth,
          times_a_week_or_month: this.teamInfo.activityCycle.timesAWeekOrMonth,
        },
      })

      //画面入力値を初期化
      this.teamInfo = {
        teamName: '',
        placeOfActivity: '',
        levelOfSeriousness: '2',
        entryTimestamp: null,
        entryDate: '',
        activityCycle: {
          weekOrMonth: '',
          timesAWeekOrMonth: '',
        },
      }
    },
  },
}
</script>

<style></style>
