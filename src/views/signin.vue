<template>
  <v-app>
    <v-content class="bg-teams-view">
      <v-container fluid fill-height>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4" xl="3">
            <v-card color="#F7F7F7" align="center">
              <v-card-title> ログイン </v-card-title>

              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-text-field
                      clearable
                      prepend-icon=" mdi-identifier "
                      label="ID"
                      v-model="id"
                      @click:clear="deleteInputedId"
                      :disabled="asUser || asAdmin"
                    >
                    </v-text-field>
                  </v-list-item>

                  <v-list-item>
                    <v-text-field
                      clearable
                      prepend-icon=" mdi-key "
                      label="Password"
                      type="password"
                      v-model="password"
                      @click:clear="deleteInputedPassword"
                      :disabled="asUser || asAdmin"
                      @keyup.enter="signIn"
                    ></v-text-field>
                  </v-list-item>

                  <v-alert dense max-width="90%" type="info" v-if="asAdmin">
                    管理者としてログインしています
                  </v-alert>
                  <v-alert dense max-width="90%" type="info" v-if="asUser">
                    一般ユーザとしてログインしています
                  </v-alert>

                  <v-row justify="center">
                    <v-col cols="5">
                      <v-btn
                        large
                        width="80%"
                        color="primary"
                        @click="signIn"
                        :disabled="asAdmin || asUser || !id || !password"
                      >
                        ログイン
                      </v-btn>
                    </v-col>
                    <v-col cols="5">
                      <v-btn
                        large
                        width="80%"
                        color="error"
                        @click="signOut"
                        :disabled="!(asAdmin || asUser)"
                      >
                        ログアウト
                      </v-btn>
                    </v-col>
                  </v-row>
                  <br />
                  <br />
                </v-list>

                <!-- ポートフォリオ用にID/passを表示 -->
                <v-card-subtitle align="start">
                  一般ユーザID
                  <br />
                  ID:user@example.com
                  <br />
                  pass:portfolio
                  <br />
                  <br />
                  管理者ID
                  <br />
                  ID:admin@example.com
                  <br />
                  pass:portfolio
                </v-card-subtitle>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { db } from '@/plugins/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: {},

  data: function () {
    return {
      id: '',
      password: '',
      asAdmin: false,
      asUser: false,
    }
  },

  created: function () {
    //thisをselfに退避
    const self = this
    //ログインしている場合、stateのroleを取得し、asAdmin,asUserを設定する
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        if (self.$store.state.role === 'admin') {
          self.asAdmin = true //管理者の場合
        } else if (self.$store.state.role === 'user') {
          self.asUser = true //一般ユーザの場合
        } else {
          //その他の場合（想定されない）
          console.log('roleが取得できない')
        }
      } else {
        //ログインしていない場合、stateのログイン状態をクリアする
        //stateをlocalStrageに永続保管しているため、
        //firebase側のログイン状態が切れていた場合は初期化しなければならない
        self.$store.commit('deleteRole')
      }
    })
  },

  methods: {
    deleteInputedId() {
      //未入力項目がある場合、ログインボタンを非活性にする
      this.id = ''
    },
    deleteInputedPassword() {
      //未入力項目がある場合、ログインボタンを非活性にする
      this.password = ''
    },
    signIn() {
      //未入力項目がある場合、抜ける
      if (this.id === '' || this.password === '') {
        return
      }

      //ログイン処理
      firebase
        .auth()
        .signInWithEmailAndPassword(this.id, this.password)
        .catch(function (error) {
          // Handle Errors here.
          alert('ログインに失敗しました 再度お試しください')
          console.log(error)
        })

      //thisをselfに退避
      const self = this
      //ログイン情報をもとにroleを判断する
      firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          //accountコレクション内のログイン中ユーザのdocへの参照を作成
          const roleRef = db.collection('valibo_account_master').doc(user.email)

          //参照からrole("admin" or "user")を取得する
          await roleRef.get().then((doc) => {
            if (!doc.exists) {
              console.log('No such document!')
            } else {
              self.role = doc.data().role
            }
          })

          //取得したroleのadmin/userをstateに保存し、
          //asAdmin,asUserをtrueにする
          if (self.role === 'admin') {
            self.$store.commit('updateRole', 'admin')
            self.asAdmin = true
          } else if (self.role === 'user') {
            self.$store.commit('updateRole', 'user')
            self.asUser = true
          }

          //ログイン者のID（メールアドレス）をstateに保存
          self.$store.commit('updateEmail', firebase.auth().currentUser.email)

          //teams画面でログイン通知のsnackbarを表示させるためにtrueに更新
          self.$store.commit('setSnackbarTrue')

          //画面表示項目を初期化し、ログインボタンを非活性にする
          self.id = ''
          self.password = ''

          //ログイン成功時にトップページ（teamsビュー）に遷移させる
          self.$router.replace('/teams')
        }
      })
    },

    signOut() {
      //ログアウト時に、asAdmin/asUserおよびstateの情報を初期化する
      firebase.auth().signOut()
      this.asAdmin = false
      this.asUser = false
      this.$store.commit('deleteAllState')

      //teams画面でログイン通知のsnackbarを表示させないためfalseに更新
      this.$store.commit('setSnackbarFalse')
    },
  },
}
</script>

<style scoped></style>
