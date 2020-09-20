<template>
  <v-app>
    <v-content fill-height>
      <v-container mt-n2 pt-0 pb-0 fluid fill-height>
        <v-row justify="center" height="100%">
          <v-col>
            <sideBar></sideBar>
          </v-col>
          <v-col>
            <v-sheet> a </v-sheet>
          </v-col>
        </v-row>
      </v-container>
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
