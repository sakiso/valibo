<template>
  <v-container pa-0 ma-0>
    <v-row>
      <v-col v-for="message in messages" :key="message.key">
        <v-card height="100%">
          <v-card-title> メッセージ詳細 </v-card-title>
          <v-card-text> {{ message }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
  name: 'MessageDetail',
  data() {
    return {
      messages: {},
    }
  },

  created: function () {
    //Firestoreからデータ取得
    //messageコレクションへの参照
    this.messageRef = db.collection('message')

    this.messageRef.onSnapshot((querySnapshot) => {
      //リスナー配置し、Firestoreのデータが更新されるたびに以下の関数を実行
      //データ取得処理
      const obj = {}
      querySnapshot.forEach((doc) => {
        obj[doc.id] = doc.data()
      })
      this.messages = obj
    })
  },
}
</script>

<style></style>
