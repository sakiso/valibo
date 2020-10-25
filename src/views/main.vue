<template>
  <div>
    <v-app-bar v-if="!$vuetify.breakpoint.xsOnly" app height="50">
      <tabBar></tabBar>
    </v-app-bar>
    <router-view />
    <v-bottom-navigation v-if="$vuetify.breakpoint.xsOnly" app height="50">
      <tabBar></tabBar>
    </v-bottom-navigation>
  </div>
</template>

<script>
import TabBar from '@/components/tabBar.vue'

export default {
  name: 'Main',
  components: {
    TabBar,
  },
}
</script>

<style scoped>
.navigation {
  position: fixed;
  bottom: 2%;
  left: 45%;
  width: 40px;
  height: 40px;
}
</style>
