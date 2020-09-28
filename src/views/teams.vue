<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <div>
          <v-card>
            <teamSidebar height="100%"></teamSidebar>
          </v-card>
        </div>
        <v-card flat tile height="100%" width="56%" color="blue lighten-2">
          <v-card-title> 検索画面 </v-card-title>
          <v-list color="blue lighten-2">
            <v-list-item> a </v-list-item>
          </v-list>
        </v-card>
        <v-card flat tile height="100%" width="22%" color="teal lighten-2">
          <v-card-title> 自分 </v-card-title>
        </v-card>
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
