<template>
  <v-card>
    <v-card-text> {{ this.$store.state.email }}</v-card-text>
    <v-card-text>
      <v-list>
        <v-list-item v-for="sender_ID in senderIdList" :key="sender_ID">
          <v-btn @click="selectMessages(sender_ID)">{{ sender_ID }}</v-btn>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
  name: 'MessageSidebar',
  data() {
    return {
      senderIdList: [],
      messageRef: null,
      selectedMessages: {},
    }
  },

  created: async function () {
    //messageコレクションへの参照
    this.messageRef = db.collection('message')

    //ログインユーザのメールアドレスが送受信のどちらかに含まれるメッセージを取得
    const queryRefList = this.messageRef.where(
      'send_receive_ID',
      'array-contains',
      this.$store.state.email
    )
    //クエリ実行
    const senderIdListNonUniqueList = await queryRefList
      .get()
      .then((snapshot) => {
        //検索結果無しの場合
        if (snapshot.empty) {
          console.log('no matching Msgs')
          return
        }
        //検索結果ありの場合、取得したデータからsender_IDのみの配列を生成する
        const wk = []
        snapshot.forEach((doc) => {
          wk.push(doc.data().sender_ID)
        })
        return wk
      })

    //一覧用にsender_IDのみの配列を生成
    //一意化
    this.senderIdList = Array.from(new Set(senderIdListNonUniqueList))
  },

  methods: {
    async selectMessages(ID) {
      //thisをselfに退避
      const self = this

      //引数のユーザのメールアドレスでクエリを作成
      //[1/2]引数のユーザが送信者のクエリ
      const queryRef_send = this.messageRef.where('sender_ID', '==', ID)
      //クエリ実行
      await queryRef_send.get().then((snapshot) => {
        //検索結果無しの場合
        if (snapshot.empty) {
          console.log('no matching Msgs')
          return
        }
        //検索結果ありの場合、取得したデータをselectedMessagesに追加
        snapshot.forEach((doc) => {
          self.selectedMessages[doc.id] = doc.data()
        })
      })

      //[2/2]引数のユーザが受信者のクエリ
      const queryRef_recieve = this.messageRef.where('receiver_ID', '==', ID)
      //クエリ実行
      await queryRef_recieve.get().then((snapshot) => {
        //検索結果無しの場合
        if (snapshot.empty) {
          console.log('no matching Msgs')
          return
        }
        //検索結果ありの場合、取得したデータをselectedMessagesに追加
        snapshot.forEach((doc) => {
          self.selectedMessages[doc.id] = doc.data()
        })
      })

      //stateに保存
      console.log(this.selectedMessages)
      this.$store.commit('updateMessages', this.selectedMessages)

      //次の検索のためにthisのメッセージ情報はクリアする
      this.selectedMessages = {}
    },
  },
}
</script>

<style scoped></style>
