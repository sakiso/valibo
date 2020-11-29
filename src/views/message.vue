<template>
  <v-app>
    <v-content>
      <v-container ma-0 mt-n3 pl-0 pt-0 pb-0 fluid class="height-100per">
        <v-row class="height-100per">
          <v-col cols="3">
            <message-sidebar class="fixed width-25per"></message-sidebar>
          </v-col>
          <v-col cols="9">
            <v-row>
              <message-detail></message-detail>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card dense width="75%" class="fixed-bottom" color="#b8d5d6">
                  <v-card-text>
                    <v-row justify="end">
                      <v-text-field
                        v-model="message"
                        solo
                        dense
                        class="mr-6 ml-5"
                      ></v-text-field>
                      <v-btn
                        medium
                        color="#F48D97"
                        dark
                        class="mr-6"
                        @click="sendMessage"
                      >
                        <v-icon> mdi-send-outline </v-icon>
                        メッセージを送る
                      </v-btn>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MessageDetail from '@/components/message-detail.vue'
import MessageSidebar from '@/components/message-sidebar.vue'
import addMessage from '@/addMessage.js'
import getMessage from '@/getMessage.js'

export default {
  components: { MessageDetail, MessageSidebar },

  data: function () {
    return {
      message: '',
      selectedMessages: {},
    }
  },

  created: function () {},

  methods: {
    async sendMessage() {
      if (!this.message) {
        console.log('no message input')
        return
      }
      //addMessageにわたす引数定義
      const messageObj = {
        send0_receive1_ID: [
          this.$store.state.email,
          this.$store.state.selectedEmail,
        ],
        messageText: this.message,
        messageEntryDate: new Date(),
      }
      await addMessage.add(messageObj)

      //メッセージ投稿後にメッセージ詳細を最新化する
      this.selectedMessages = await getMessage.get(
        this.$store.state.selectedEmail
      )
      //stateに保存
      this.$store.commit('updateMessages', this.selectedMessages)

      //メッセージの削除
      this.message = ''
    },
  },
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.width-25per {
  width: 24%;
}
.height-100per {
  height: 100%;
}
.fixed-bottom {
  position: fixed;
  bottom: -25px;
}
</style>
