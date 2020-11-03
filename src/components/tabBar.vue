<template>
  <v-tabs v-model="tab" background-color="#67b0b2" grow dark>
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
      tab: null,
      items: [
        { icon: 'mdi-account-group', tab: 'チーム検索', path: '/teams' },
        {
          icon: 'mdi-plus-box',
          tab: 'チーム登録',
          path: '/entry-team',
        },
        { icon: 'mdi-login-variant', tab: 'ログイン', path: '/signin' },
      ],
    }
  },

  mounted: function () {
    //現在のpathに応じてアクティブなタブを切り替える
    //現在のpathがitmes配列の何番目のpathと一致するかで、アクティブにすべきタブを決める
    if (this.$route.path === this.items[0].path) {
      this.tab = 0
    } else if (this.$route.path === this.items[1].path) {
      this.tab = 1
    } else if (this.$route.path === this.items[2].path) {
      this.tab = 2
    } else {
      return
    }
  },

  methods: {
    switchPage(path) {
      this.$router.replace(path)
    },
  },
}
</script>
