<template>
  <v-app>
    <v-navigation-drawer
      width="85%"
      v-if="$vuetify.breakpoint.xsOnly"
      v-model="drawer"
      app
    >
      <teamSidebar
        class="height-100per"
        @selectTeams="selectTeams"
      ></teamSidebar>
    </v-navigation-drawer>

    <v-content class="bg-teams-view">
      <v-container mt-n3 pa-0 fluid class="bg-teams-view height-100per">
        <v-row>
          <v-col
            v-if="!$vuetify.breakpoint.xsOnly"
            cols="4"
            sm="4"
            md="3"
            lg="3"
            xl="3"
          >
            <teamSidebar
              class="fixed height-100per"
              :class="{
                'width-0per': $vuetify.breakpoint.xs,
                'width-33per': $vuetify.breakpoint.sm,
                'width-25per': $vuetify.breakpoint.mdAndUp,
              }"
              @selectTeams="selectTeams"
            ></teamSidebar>
          </v-col>

          <v-col cols="12" sm="8" md="9" lg="9" xl="9">
            <v-container mt-2>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="6"
                  lg="4"
                  xl="3"
                  v-for="(team, key) in teams"
                  :key="key"
                >
                  <v-card width="100%" height="100%">
                    <v-img
                      height="200"
                      width="100%"
                      :src="team.team_image_url"
                    ></v-img>

                    <v-card-title>
                      {{ team.team_name }}
                    </v-card-title>

                    <v-card-text>
                      <v-container mt-0 pt-0 pb-1>
                        <v-row dense>
                          <v-col class="text-subtitle-1 wordBreak-breakAll">
                            {{ fixedLengthMessage(team.message_of_team) }}
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
                              small
                              color="#F48D97"
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
                          <v-spacer></v-spacer>
                          <v-col cols="2">
                            <v-btn
                              small
                              color="grey"
                              dark
                              @click="deleteTeam(key)"
                              v-if="asAdmin"
                            >
                              削除
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                  <v-spacer></v-spacer>
                </v-col>
              </v-row>
            </v-container>

            <v-btn
              v-if="$vuetify.breakpoint.xsOnly"
              class="serchBtn"
              fab
              dark
              color="#67b0b2"
              @click="openDrawer"
            >
              <v-icon mr-0>mdi-magnify</v-icon>
            </v-btn>

            <v-dialog v-model="dialog" max-width="500px">
              <dialog-card
                :title="dialogTitle"
                :text="dialogText"
              ></dialog-card>
            </v-dialog>
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
      asAdmin: false,
      asUser: false,
      drawer: false,
    }
  },
  components: {
    TeamSidebar,
    DialogCard,
  },

  created: function () {
    //取得したroleがadminならasAdmin、userならasUserをtrueにする
    if (this.$store.state.role === 'admin') {
      this.asAdmin = true
      console.log('admin')
    } else if (this.$store.state.role === 'user') {
      this.asUser = true
      console.log('user')
    } else {
      console.log('未ログイン')
    }

    //Firestoreからデータ取得
    //teamsコレクションへの参照
    this.teamsRef = db.collection('teams')

    this.teamsRef.onSnapshot((querySnapshot) => {
      //リスナー配置し、Firestoreのデータが更新されるたびに以下の関数を実行
      //データ取得処理
      const obj = {}
      querySnapshot.forEach((doc) => {
        obj[doc.id] = doc.data()
      })
      this.teams = obj
    })
  },

  computed: {
    fixedLengthMessage: function () {
      //computedは直接引数を受け取れないので、一度関数を返しそれに引数を受け取らせる
      return (message) => {
        //表示時のレイアウトを揃えるため、"ひとこと"を30文字まで全角スペ埋めする
        return message.padEnd(30, '　')
      }
    },
  },

  methods: {
    selectTeams(selectedTeams) {
      //検索の結果取得したチーム情報を、画面表示している変数に上書きする
      this.teams = selectedTeams

      //xsサイズでドロワーから検索した場合のために、ドロワーを閉じる
      this.drawer = false
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

    openDrawer() {
      this.drawer = true
    },
  },
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.width-0per {
  width: 0%;
}
.width-25per {
  width: 25%;
}
.width-33per {
  width: 33%;
}
.wordBreak-breakAll {
  word-break: break-all;
}
.bg-teams-view {
  background-color: #fafafa;
}
.height-100per {
  height: 100%;
}
.serchBtn {
  position: fixed;
  top: 17px;
  left: 17px;
  text-align: end;
}
</style>
