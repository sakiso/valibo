<template>
  <!-- 親コンポーネントから title と textを受け取って描画する-->
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text height="350px" class="text-h6"
      >{{ text }}<br />
      <v-container>
        <v-row dense>
          <v-col>
            <v-textarea
              label="チームにメッセージを送ってみましょう"
              counter="100"
              outlined
              v-model="message"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" class="text-right">
            <v-btn dark large color="primary" @click="sendMessage">
              <v-icon class="mr-2">mdi-send</v-icon>
              <span>メッセージを送信する</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      message: '',
      messageRef: null,
    }
  },

  methods: {
    sendMessage() {
      //messageコレクションへの参照
      this.messageRef = db.collection('message')

      //messageコレクションへのドキュメント登録
      this.messageRef.add({
        sender_ID: this.$store.state.email,
        receiver_ID: 'receive',
        messageText: this.message,
        messageEntryDate: new Date(),
      })
    },
  },
}
</script>

<style scoped></style>
