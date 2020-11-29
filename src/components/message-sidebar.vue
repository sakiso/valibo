<template>
  <v-card color="#F7F7F7" height="100%" class="pa-0 ma-0">
    <v-card-text> {{ this.$store.state.email }}</v-card-text>
    <v-card-text>
      <v-list color="#F7F7F7">
        <v-list-item v-for="sender_ID in idList" :key="sender_ID">
          <v-btn @click="selectMessages(sender_ID)">{{ sender_ID }}</v-btn>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '@/plugins/firebase'
import getMessage from '@/getMessage.js'

export default {
  name: 'MessageSidebar',
  data() {
    return {
      idList: [],
      messageRef: null,
      selectedMessages: {},
    }
  },

  created: async function () {
    //messageコレクションへの参照
    this.messageRef = db.collection('message')

    //ログインユーザのメールアドレスが送受信のどちらかに含まれるメッセージを取得
    const queryRefList = this.messageRef.where(
      'send0_receive1_ID',
      'array-contains',
      this.$store.state.email
    )
    //クエリ実行
    const idListNonUniqueList = await queryRefList.get().then((snapshot) => {
      //検索結果無しの場合
      if (snapshot.empty) {
        console.log('no matching Msgs')
        return
      }
      //検索結果ありの場合、取得したデータからIDの配列を生成する
      //(ログインユーザでない方のIDのみpushしていく)
      const wk = []
      snapshot.forEach((doc) => {
        if (doc.data().send0_receive1_ID[0] === this.$store.state.email) {
          wk.push(doc.data().send0_receive1_ID[1])
        } else {
          wk.push(doc.data().send0_receive1_ID[0])
        }
      })
      return wk
    })

    //一覧用にsender_IDのみの配列を生成
    //一意化
    this.idList = Array.from(new Set(idListNonUniqueList))
  },

  methods: {
    async selectMessages(ID) {
      //選択されたユーザID（メールアドレス）に紐づくメッセージを日付ソートして取得する
      this.selectedMessages = await getMessage.get(ID)

      //stateに保存
      this.$store.commit('updateMessages', this.selectedMessages)

      //選択したチーム情報をstateに格納（メッセージ画面上で返信するために必要なため）
      this.$store.commit('updateSelectedEmail', ID)

      //次の検索のためにthisのメッセージ情報はクリアする
      this.selectedMessages = {}
    },
  },
}
</script>

<style scoped></style>
