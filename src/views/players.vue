<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <playerSerch></playerSerch>
        <v-card flat tile height="100%" width="75%" color="blue lighten-2">
          <v-card-title> 検索画面 </v-card-title>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PlayerSerch from '@/components/player-serch.vue'
export default {
  components: {
    PlayerSerch,
  },
}
</script>

<style></style>
