<template>
  <v-app>
    <!-- サイズがxsのときにだけ表示されるサイドバー -->
    <v-navigation-drawer
      width="60%"
      v-if="$vuetify.breakpoint.xsOnly"
      v-model="drawer"
      app
    >
      <message-sidebar></message-sidebar>
    </v-navigation-drawer>

    <v-content>
      <v-container ma-0 mt-n3 pl-0 pt-0 pb-0 fluid class="height-100per">
        <v-row class="height-100per">
          <v-col cols="0" sm="3" md="3" lg="3" xl="3">
            <message-sidebar
              v-if="!$vuetify.breakpoint.xsOnly"
              class="fixed width-24per"
            ></message-sidebar>
          </v-col>
          <v-col cols="12" sm="9">
            <v-row>
              <message-detail></message-detail>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card
                  dense
                  :class="{
                    'width-100per': $vuetify.breakpoint.xs,
                    'fixed-bottom-30': $vuetify.breakpoint.xs,
                    'width-75per': $vuetify.breakpoint.smAndUp,
                    'fixed-bottom': $vuetify.breakpoint.smAndUp,
                  }"
                  color="#b8d5d6"
                >
                  <v-card-text>
                    <v-row justify="end">
                      <v-text-field
                        v-model="message"
                        solo
                        dense
                        class="mr-6 ml-5"
                      ></v-text-field>
                      <v-btn
                        v-if="!$vuetify.breakpoint.xsOnly"
                        medium
                        color="#F48D97"
                        dark
                        class="mr-6"
                        @click="sendMessage"
                      >
                        <v-icon> mdi-send-outline </v-icon>
                        メッセージを送る
                      </v-btn>
                      <v-btn
                        v-if="$vuetify.breakpoint.xsOnly"
                        medium
                        color="#F48D97"
                        dark
                        class="mr-6"
                        @click="sendMessage"
                      >
                        <v-icon> mdi-send-outline </v-icon>
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
    <v-btn
      v-if="$vuetify.breakpoint.xsOnly"
      class="messageBoxBtn"
      fab
      dark
      color="#67b0b2"
      @click="openDrawer"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
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
      drawer: false,
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
    openDrawer() {
      this.drawer = true
    },
  },
}
</script>

<style scoped>
.fixed {
  position: fixed;
}
.width-24per {
  width: 24%;
}
.width-75per {
  width: 75%;
}
.width-100per {
  width: 100%;
}
.height-100per {
  height: 100%;
}
.fixed-bottom {
  position: fixed;
  bottom: -25px;
}
.fixed-bottom-30 {
  position: fixed;
  bottom: 30px;
}
.messageBoxBtn {
  position: fixed;
  top: 17px;
  left: 17px;
  text-align: end;
}
</style>
