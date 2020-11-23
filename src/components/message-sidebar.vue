<template>
  <v-card>
    <v-card-text> {{ this.$store.state.email }}</v-card-text>
    <v-card-text>
      <v-list>
        <v-list-item v-for="sender_ID in senderIdList" :key="sender_ID">
          {{ sender_ID }}
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
    const senderIdListNonUnique = await queryRef.get().then((snapshot) => {
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
    this.senderIdList = Array.from(new Set(senderIdListNonUnique))
    console.log(this.senderIdList)
  },
}
</script>

<style scoped></style>
