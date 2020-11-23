<template>
  <v-app>
    <v-content>
      <v-container ma-0 pt-0 pb-0 fluid class="height-100per">
        <v-row class="height-100per">
          <v-col cols="3">
            <message-sidebar></message-sidebar>
          </v-col>
          <v-col cols="9">
            <message-detail></message-detail>
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
</style>
