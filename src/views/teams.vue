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
          <!--        <v-col dark cols="3">
          <v-card color="blue lighten-2">
            <v-card-title> a </v-card-title>
            <v-card-text>
              bbb <br />
              ccc <br />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card tile height="100%"> b </v-card>
        </v-col>
        -->
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
