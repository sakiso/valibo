<template>
  <v-app>
    <v-card tile height="100%">
      <v-card-title> チーム検索条件 </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle class="text-center">
        <v-btn rounded width="70%">
          <v-icon>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-card-subtitle>
      <v-card-text>
        活動エリア
        <br />
        <prefecturesList></prefecturesList>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import PrefecturesList from '@/components/prefectures-list'
export default {
  components: {
    PrefecturesList,
  },
}
</script>

<style></style>
