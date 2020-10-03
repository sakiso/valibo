<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <v-row height="100%">
          <v-col ma-0 pa-0 cols="3">
            <teamSidebar height="100%"></teamSidebar>
          </v-col>
          <v-col ma-0 pa-0 cols="7">
            <v-card ma-0 pa-0 flat tile color="blue lighten-2">
              <v-card-title> 検索画面 </v-card-title>
              <v-list color="blue lighten-2">
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
                <v-list-item> a </v-list-item>
              </v-list>
            </v-card>
            <v-row>
              <v-col cols="12"> pagenation </v-col>
            </v-row>
          </v-col>
          <v-col ma-0 pa-0 cols="2">
            <v-card flat tile height="100%" color="teal lighten-2">
              <v-card-title> 自分 </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TeamSidebar from '@/components/team-sidebar.vue'
export default {
  components: {
    TeamSidebar,
  },
}
</script>

<style></style>
