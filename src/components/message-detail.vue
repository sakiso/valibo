<template>
  <v-container pa-0 ma-0>
    <v-row>
      <v-col cols="12" v-for="message in messages" :key="message.key">
        <v-card height="100%">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col> from:{{ message.sender_ID }} </v-col>
                <v-col>
                  {{ message.messageText }}
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  {{ processedMessageEntryDate(message.messageEntryDate) }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
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
  computed: {
    processedMessageEntryDate: function () {
      return (date) => {
        /*
        const entryDate =
          date.getFullYear() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getDate()
        return entryDate
        */
        console.log(date.toDate)
        return date.toDate
      }
    },
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
