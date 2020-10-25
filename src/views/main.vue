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
  data: function () {
    return {
      drawer: false,
    }
  },
}
</script>

<style scoped></style>
