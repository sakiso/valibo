<template>
  <v-app>
    <v-content>
      <v-container ma-0 pt-0 pb-0 fluid class="height-100per">
        <v-row class="height-100per">
          <v-col cols="2">
            メッセージ一覧
            <v-divider vertical></v-divider>
          </v-col>
          <v-col cols="10">メッセージ詳細</v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import { db } from '@/plugins/firebase'
//import firebase from 'firebase/app'
//import 'firebase/auth'

export default {
  components: {},

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
