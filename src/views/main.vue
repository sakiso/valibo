<template>
  <div>
    <tabBar></tabBar>
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
