<template>
  <v-tabs v-model="tabIndex" background-color="#67b0b2" grow dark>
    <v-tab v-for="item in items" :key="item.tab" @click="switchPage(item.path)">
      <v-icon class="mr-2">{{ item.icon }}</v-icon>
      <font v-if="!$vuetify.breakpoint.xsOnly">{{ item.tab }}</font>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      tabsValue: ['A', 'B', 'C'],
      tab: null,
      items: [
        { icon: 'mdi-account-group', tab: 'チーム検索', path: '/teams' },
        { icon: 'mdi-message-outline', tab: 'メッセージ', path: '/message' },
        {
          icon: 'mdi-plus-box',
          tab: 'チーム登録',
          path: '/entry-team',
        },
        { icon: 'mdi-login-variant', tab: 'ログイン', path: '/signin' },
      ],
    }
  },

  computed: {
    tabIndex: {
      get: function () {
        //現在のpathでitems.pathを比較し、一致した要素のインデックスを取得
        //tabIndexはtabsにバインドしているので、常にURLと一致したタブがアクティブになる
        return this.items.findIndex((el) => el.path === this.$route.path)
      },
      set: function () {
        //setterは特になし
      },
    },
  },

  methods: {
    switchPage(path) {
      this.$router.replace(path)
    },
  },
}
</script>
