<template>
  <v-app>
    <v-content>
      <v-container mb-0 mt-n3 pa-0 fluid fill-height>
        <v-row height="100%">
          <v-col cols="3">
            <teamSidebar
              class="fixed width-25halfper grey lighten-2"
              @selectTeams="selectTeams"
            ></teamSidebar>
          </v-col>

          <v-col ma-0 pa-0 cols="9">
            <v-card ma-0 pa-0 flat tile color="grey">
              <v-card-title> チーム一覧 </v-card-title>

              <v-container>
                <v-row>
                  <v-col cols="4" v-for="(team, key) in teams" :key="key">
                    <v-card height="490">
                      <v-card-title>
                        {{ team.team_name }}
                      </v-card-title>

                      <v-img
                        height="40%"
                        width="100%"
                        :src="team.team_image_url"
                      ></v-img>

                      <v-card-text>
                        <v-container mt-0 pt-0 pb-1>
                          <v-row dense>
                            <v-col class="text-subtitle-1 wordBreak-breakAll">
                              {{ team.message_of_team }}
                            </v-col>
                          </v-row>

                          <v-divider></v-divider>

                          <v-row dense>
                            <v-col>
                              {{ team.place_of_activity }}
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-rating
                                readonly
                                empty-icon="mdi-minus"
                                full-icon="mdi-fire"
                                hover
                                dense
                                color="grey darken-1"
                                background-color="grey lighten-1"
                                length="5"
                                size="20"
                                :value="team.level_of_seriousness + 1"
                              ></v-rating>
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              {{ team.activity_cycle.week_or_month }}
                              {{ team.activity_cycle.times_a_week_or_month }}
                            </v-col>
                          </v-row>

                          <v-row dense>
                            <v-col>
                              <v-btn
                                x-small
                                color="blue darken-1"
                                dark
                                @click="
                                  displayDialog(
                                    team.team_name,
                                    team.email_address
                                  )
                                "
                              >
                                contact
                              </v-btn>
                            </v-col>

                            <v-col>
                              <v-btn
                                x-small
                                color="grey"
                                dark
                                @click="deleteTeam(key)"
                              >
                                削除
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>

              <v-dialog v-model="dialog" max-width="500px">
                <dialog-card
                  :title="dialogTitle"
                  :text="dialogText"
                ></dialog-card>
              </v-dialog>
            </v-card>
            <v-row>
              <v-col cols="12"> pagenation </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//firebase import
import TeamSidebar from '@/components/team-sidebar.vue'
import { db } from '@/plugins/firebase'
import 'firebase/auth'
import DialogCard from '@/components/dialog.vue'

export default {
  name: 'TeamsView',

  data: function () {
    return {
      teams: {},
      teamsRef: null,
      dialog: false,
      dialogText: 'none',
      dialogTitle: '-',
    }
  },
  components: {
    TeamSidebar,
    DialogCard,
  },

  created: function () {
    //Firestoreからデータ取得
    //teamsコレクションへの参照
    this.teamsRef = db.collection('teams')

    this.teamsRef.onSnapshot((querySnapshot) => {
      //リスナー配置し、Firestoreのデータが更新されるたびに以下の関数を実行
      //データ取得処理
      const obj = {}
      querySnapshot.forEach((doc) => {
        obj[doc.id] = doc.data()

        //表示時のレイアウトを揃えるため、"ひとこと"を30文字まで全角スペ埋めする
        const wk = obj[doc.id].message_of_team.padEnd(30, '　')
        obj[doc.id].message_of_team = wk
      })
      this.teams = obj
    })
  },

  methods: {
    selectTeams(selectedTeams) {
      //検索の結果取得したチーム情報を、画面表示している変数に上書きする
      this.teams = selectedTeams
    },

    deleteTeam(key) {
      this.teamsRef.doc(key).delete()
    },

    displayDialog(teamName, email) {
      //画面から受け取ったチーム名とemailをセットし、dialogを表示する
      this.dialogTitle = '「' + teamName + '」連絡先'
      this.dialogText = email

      //dialog表示
      this.dialog = true
    },
  },
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.width-25halfper {
  width: 25.5%;
}
.wordBreak-breakAll {
  word-break: break-all;
}
</style>
