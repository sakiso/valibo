<template>
  <v-container pa-0 ma-0>
    <v-row>
      <v-col cols="12" v-for="message in messages" :key="message.key">
        <v-card height="100%">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="balloon_l">
                  <div class="says">
                    {{ message.messageText }}
                  </div>
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
        const entryDate =
          //firestore特有のTimestamp型をJSで使えるDate型に戻すためtoDate()を使っている
          date.toDate().getFullYear() +
          '/' +
          (date.toDate().getMonth() + 1) +
          '/' +
          date.toDate().getDate()
        return entryDate
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

<style scoped>
.says {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 17px 13px 15px 18px;
  border-radius: 12px;
  background: #c3eaec;
  box-sizing: border-box;
  margin: 0 !important;
  line-height: 1.5;
}
.says:after {
  content: '';
  position: absolute;
  border: 10px solid transparent;
}
.balloon_l .says:after {
  left: -26px;
  border-right: 22px solid #c3eaec;
}
.balloon_r .says:after {
  right: -26px;
  border-left: 22px solid #c3eaec;
}
</style>
