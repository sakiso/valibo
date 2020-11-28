<template>
  <v-app>
    <v-content>
      <v-container ma-0 pt-0 pb-0 fluid class="height-100per">
        <v-row class="height-100per">
          <v-col cols="3">
            <message-sidebar></message-sidebar>
          </v-col>
          <v-col cols="9">
            <v-row>
              <message-detail></message-detail>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card
                  tile
                  flat
                  dense
                  width="75%"
                  class="fixed-bottom"
                  color="light-blue"
                >
                  <v-card-text>
                    <v-btn large color="#F48D97" dark>
                      <v-icon> mdi-send-outline </v-icon>
                      メッセージを送る
                    </v-btn>
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
//import { db } from '@/plugins/firebase'
//import firebase from 'firebase/app'
//import 'firebase/auth'
import MessageDetail from '@/components/message-detail.vue'
import MessageSidebar from '@/components/message-sidebar.vue'

export default {
  components: { MessageDetail, MessageSidebar },

  data: function () {
    return {}
  },

  created: function () {},

  methods: {},
}
</script>

<style scoped>
.height-100per {
  height: 100%;
}
.fixed-bottom {
  position: fixed;
  bottom: 0px;
}
</style>
