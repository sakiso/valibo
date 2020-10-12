<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <v-row height="100%" justify="center">
          <v-card
            min-width="400px"
            width="30%"
            color="blue lighten-4"
            align="center"
          >
            <v-card-title> チーム登録 </v-card-title>

            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-text-field
                    prepend-icon=" mdi-account-group "
                    label="チーム名"
                    v-model="teamInfo.teamName"
                  ></v-text-field>
                </v-list-item>

                <v-list-item>
                  <prefectures-list
                    @selectPrefecture="setPrefecture"
                  ></prefectures-list>
                </v-list-item>

                <v-list-item>
                  <v-slider
                    prepend-icon=" mdi-fire "
                    v-model="teamInfo.levelOfSeriousness"
                    label="本気度"
                    max="4"
                    step="1"
                    :tick-labels="ticksLabels"
                  ></v-slider>
                </v-list-item>

                <v-list-item>
                  <wanted-position-selecer @selectPosition="setWantedPosition">
                  </wanted-position-selecer>
                </v-list-item>

                <v-list-item>
                  <v-radio-group
                    prepend-icon="mdi-calendar-clock"
                    label="活動ペース"
                    v-model="teamInfo.activityCycle.weekOrMonth"
                  >
                    <br />
                    <v-radio label="毎週" value="毎週"></v-radio>
                    <v-radio label="毎月" value="毎月"></v-radio>
                    <v-select
                      :items="times"
                      label="回数"
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
import WantedPositionSelecer from '@/components/WantedPositionSelecter.vue'
import PrefecturesList from '@/components/prefectures-list.vue'

export default {
  components: {
    WantedPositionSelecer,
    PrefecturesList,
  },

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
        wantedPosition: [],
        activityCycle: {
          weekOrMonth: '',
          timesAWeekOrMonth: '',
        },
        entryTimestamp: null,
        entryDate: '',
      },
    }
  },

  created: function () {
    //teamsコレクションへの参照
    this.teamsRef = db.collection('teams')
  },

  methods: {
    setPrefecture(prefecture) {
      this.teamInfo.placeOfActivity = prefecture
    },
    setWantedPosition(position) {
      //ポジション選択時に子コンポーネントから受け取ったデータを保存するメソッド
      this.teamInfo.wantedPosition = position
    },
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
        wanted_position: this.teamInfo.wantedPosition,
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
        wantedPosition: [],
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
