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
                      prepend-icon=" mdi-identifier "
                      label="ID"
                      v-model="id"
                      @blur="checkInputMust"
                      :disabled="asUser || asAdmin"
                    >
                    </v-text-field>
                  </v-list-item>

                  <v-list-item>
                    <v-text-field
                      prepend-icon=" mdi-key "
                      label="Password"
                      type="password"
                      v-model="password"
                      @blur="checkInputMust"
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
                        :disabled="asAdmin || asUser || !isReadyToSignIn"
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
      isReadyToSignIn: false,
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
          console.log('adminでログイン中')
        } else if (self.$store.state.role === 'user') {
          self.asUser = true //一般ユーザの場合
          console.log('userでログイン中')
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
    checkInputMust() {
      //未入力項目がある場合、ログインボタンを非活性にする
      if (this.id === '' || this.password === '') {
        console.log('未入力項目あり')
        this.isReadyToSignIn = false
      } else {
        //入力が完了していればログインボタンを活性化させる
        this.isReadyToSignIn = true
      }
    },
    signIn() {
      //未入力項目がある場合、抜ける
      if (this.id === '' || this.password === '') {
        console.log('未入力項目あり')
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
              console.log('Document data:', doc.data().role)
              self.role = doc.data().role
            }
          })

          //取得したroleのadmin/userをstateに保存し、
          //asAdmin,asUserをtrueにする
          if (self.role === 'admin') {
            self.$store.commit('updateRole', 'admin')
            console.log('login as admin')
            self.asAdmin = true
          } else if (self.role === 'user') {
            self.$store.commit('updateRole', 'user')
            self.asUser = true
            console.log('login as user')
          }

          //画面表示項目を初期化し、ログインボタンを非活性にする
          self.id = ''
          self.password = ''
          self.isReadyToSignIn = false
        }
      })
    },

    signOut() {
      console.log('signOut前のstateのrole:', this.$store.state.role)
      //ログアウト時に、asAdmin/asUserおよびstateの情報を消す
      firebase.auth().signOut()
      this.asAdmin = false
      this.asUser = false
      this.$store.commit('deleteRole')

      console.log('signOut')
    },
  },
}
</script>

<style scoped></style>
