<template>
  <v-card>
    <v-card-text> {{ this.$store.state.email }}</v-card-text>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(message, key) in messages" :key="key">
          {{ message.sender_ID }}
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
      messages: {},
    }
  },

  created: async function () {
    //messageコレクションへの参照
    const messageRef = db.collection('message')

    //ログインユーザのメールアドレスでクエリを作成
    const queryRef = messageRef.where(
      'receiver_ID',
      '==',
      this.$store.state.email
    )

    //クエリ実行
    await queryRef.get().then((snapshot) => {
      //検索結果無しの場合
      if (snapshot.empty) {
        console.log('no matching Msgs')
        return
      }
      //検索結果ありの場合データ取得処理
      const obj = {}
      snapshot.forEach((doc) => {
        obj[doc.id] = doc.data()
      })
      this.messages = obj
    })
  },
}
</script>

<style scoped></style>
