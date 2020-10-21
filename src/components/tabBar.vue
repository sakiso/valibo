<template>
  <v-tabs v-model="tab" background-color="#67b0b2" grow dark>
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
        { tab: '管理者機能', path: '/admin-signin' },
      ],
    }
  },

  methods: {
    switchPage(path) {
      this.$router.replace(path)
    },
  },
}
</script>
