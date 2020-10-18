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
            <v-card ma-0 pa-0 flat tile color="blue lighten-2">
              <v-card-title> 検索画面 </v-card-title>

              <v-container>
                <v-row>
                  <v-col cols="4" v-for="(team, key) in teams" :key="key">
                    <v-card>
                      <v-card-title>
                        {{ team.team_name }}
                      </v-card-title>
                      <v-img
                        height="130"
                        width="100%"
                        :src="team.team_image_url"
                        contain
                      ></v-img>
                      <v-card-text>
                        <v-container mt-0 pt-0 pb-1>
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
//import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'TeamsView',

  data: function () {
    return {
      teams: {},
      teamsRef: null,
    }
  },
  components: {
    TeamSidebar,
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
        console.log(doc.id)
        console.log(doc.data().team_name)
        console.log(doc.data().team_image_url)
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
</style>
