<template>
  <v-app>
    <v-content>
      <v-container mb-0 mt-n3 pa-0 fluid fill-height>
        <v-row height="100%">
          <v-col cols="3">
            <teamSidebar
              class="fixed width-25halfper grey lighten-2"
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

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col>
                              {{ team.place_of_activity }}
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col> {{ team.entry_date }} </v-col>
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
    return { teams: {} }
  },
  components: {
    TeamSidebar,
  },

  created: function () {
    //Firestoreからデータ取得
    //teamsコレクションへの参照
    this.todoListRef = db.collection('teams')

    this.todoListRef.onSnapshot((querySnapshot) => {
      console.log('リスナー配置')
      //データが更新されるたびにここのコールバック関数を実行

      //データ取得処理
      const obj = {}
      querySnapshot.forEach((doc) => {
        obj[doc.id] = doc.data()
      })
      this.teams = obj
      console.log(this.teams)
    })
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
