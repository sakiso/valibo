<template>
  <v-app>
    <v-card tile height="100%">
      <v-card-title> チーム検索条件 </v-card-title>
      <v-card-text>
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
