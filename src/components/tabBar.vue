<template>
  <v-tabs v-model="tab" background-color="#67b0b2" grow dark>
    <v-tab v-for="item in items" :key="item.tab" @click="switchPage(item.path)">
      <v-icon class="mr-2">{{ item.icon }}</v-icon>
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
        { icon: 'mdi-magnify', tab: 'チーム検索', path: '/teams' },
        { icon: 'mdi-account-group', tab: 'チーム登録', path: '/entry-team' },
        { icon: 'mdi-login-variant', tab: 'ログイン', path: '/signin' },
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
