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
    }
  },

  created: async function () {
    //messageコレクションへの参照
    this.messageRef = db.collection('message')

    /*ログインユーザのメールアドレスでクエリを作成
      ※ログインユーザが送信者もしくは受信者のメッセージを取得する
      ORクエリがないのでアプリ側で結合する */

    //[1/2] 受信者IDから検索するクエリ
    const queryRef_receiver = this.messageRef.where(
      'receiver_ID',
      '==',
      this.$store.state.email
    )
    //クエリ実行
    const senderIdListNonUnique_receiver = await queryRef_receiver
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

    //[2/2] 送信者IDから検索するクエリ
    const queryRef_sender = this.messageRef.where(
      'sender_ID',
      '==',
      this.$store.state.email
    )
    //クエリ実行
    const senderIdListNonUnique_sender = await queryRef_sender
      .get()
      .then((snapshot) => {
        //検索結果無しの場合
        if (snapshot.empty) {
          console.log('no matching Msgs')
          return
        }
        //検索結果ありの場合、取得したデータからreceiver_IDのみの配列を生成する
        const wk = []
        snapshot.forEach((doc) => {
          console.log('rID', doc.data().receiver_ID)
          wk.push(doc.data().receiver_ID)
        })
        return wk
      })

    //一覧用にsender_IDのみの配列を生成
    //一覧を合体
    const arr = senderIdListNonUnique_receiver.concat(
      senderIdListNonUnique_sender
    )
    //一意化
    this.senderIdList = Array.from(new Set(arr))
  },

  methods: {
    async selectMessages(sender_ID) {
      //引数のユーザのメールアドレスでクエリを作成
      //※
      const queryRef = this.messageRef.where('sender_ID', '==', sender_ID)

      //thisをselfに退避
      const self = this
      //クエリ実行
      await queryRef.get().then((snapshot) => {
        //検索結果無しの場合
        if (snapshot.empty) {
          console.log('no matching Msgs')
          return
        }
        //検索結果ありの場合、取得したデータをstoreに書き込む
        const selectedMessages = {}
        snapshot.forEach((doc) => {
          selectedMessages[doc.id] = doc.data()
        })
        self.$store.commit('updateMessages', selectedMessages)
      })
    },
  },
}
</script>

<style scoped></style>
