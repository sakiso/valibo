<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <v-row height="100%">
          <v-col ma-0 pa-0 cols="3">
            <teamSidebar height="100%"></teamSidebar>
          </v-col>

          <v-col ma-0 pa-0 cols="7">
            <v-card ma-0 pa-0 flat tile color="blue lighten-2">
              <v-card-title> 検索画面 </v-card-title>

              <v-list color="blue lighten-2">
                <v-list-item v-for="(team, key) in teams" :key="key">
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
                </v-list-item>
              </v-list>
            </v-card>
            <v-row>
              <v-col cols="12"> pagenation </v-col>
            </v-row>
          </v-col>
          <v-col ma-0 pa-0 cols="2">
            <v-card flat tile height="100%" color="teal lighten-2">
              <v-card-title> 自分 </v-card-title>
            </v-card>
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

<style></style>
