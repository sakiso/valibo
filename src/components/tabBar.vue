<template>
  <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
    <v-tab v-for="item in items" :key="item.tab" @click="switchPage(item.path)">
      {{ item.tab }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      tab: null,
      items: [
        { tab: 'チーム検索', path: '/teams' },
        { tab: 'チーム登録', path: '/entry-team' },
      ],
    }
  },

  methods: {
    switchPage(path) {
      console.log('switch')
      this.$router.replace(path)
    },
  },
}
</script>
