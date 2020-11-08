<template>
  <v-app>
    <v-content>
      <v-container ma-0 pt-0 pb-0 fluid class="height-100per">
        <v-row class="height-100per">
          <v-col cols="3">
            <v-card height="100%">
              <v-card-title> メッセージ一覧 </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>a</v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-card height="100%">
              <v-card-title> メッセージ詳細 </v-card-title>
              <v-card-text> aaa </v-card-text>
            </v-card>
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
