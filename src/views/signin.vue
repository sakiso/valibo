<template>
  <v-app>
    <v-content class="bg-teams-view">
      <v-container ma-0 pa-0 fluid fill-height>
        <v-row height="100%" justify="center">
          <v-card
            min-width="400"
            width="35%"
            max-width="600"
            color="#F7F7F7"
            align="center"
          >
            <v-card-title> ログイン </v-card-title>

            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-text-field
                    prepend-icon=" mdi-identifier "
                    label="ID"
                    v-model="id"
                    @blur="checkInputMust"
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
                      width="75%"
                      color="primary"
                      @click="signIn"
                      :disabled="asAdmin || asUser"
                    >
                      ログイン
                    </v-btn>
                  </v-col>
                  <v-col cols="5">
                    <v-btn
                      large
                      width="75%"
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
            </v-card-text>
          </v-card>
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

        //取得したroleがadminならasAdmin、userならasUserをtrueにする
        if (self.role === 'admin') {
          self.asAdmin = true
          console.log('admin')
        } else if (self.role === 'user') {
          self.asUser = true
          console.log('user')
        }
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
      console.log('id:', this.id, 'PW:', this.password)

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
      //認証状態（userがnullでない）のとき、サインイン状態を示すv-alertを表示する
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          self.asAdmin = true

          //画面表示項目を初期化し、ログインボタンを非活性にする
          self.id = ''
          self.password = ''
          self.isReadyToSignIn = false
        }
      })
    },
    signOut() {
      console.log('signOut')
      firebase.auth().signOut()
      this.asAdmin = false
      this.asUser = false
    },
  },
}
</script>

<style scoped></style>
