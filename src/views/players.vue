<template>
  <v-app>
    <sideBar></sideBar>
    <v-content>
      <v-card width="200" color="teal lighten-1">
        <v-card-title> players </v-card-title>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import sideBar from '@/components/sidebar'
export default {
  components: {
    sideBar,
  },
}
</script>

<style></style>
