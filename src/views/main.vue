<template>
  <div>
    <v-app-bar app height="50">
      <tabBar></tabBar>
    </v-app-bar>
    <router-view />
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

<style></style>
