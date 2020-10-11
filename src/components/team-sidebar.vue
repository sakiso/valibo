<template>
  <div>
    <v-card tile flat height="100%">
      <v-card-title> チーム検索条件 </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle class="text-center">
        <v-btn rounded width="70%">
          <v-icon>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-card-subtitle>
      <v-card-text>
        <br />
        <div class="font-weight-black">活動エリア</div>
        <prefecturesList></prefecturesList>
        <div class="font-weight-black">本気度</div>
        <seriousnessSelecter
          @selectLevel="selectLevelOfSeriousness"
        ></seriousnessSelecter>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PrefecturesList from '@/components/prefectures-list'
import SeriousnessSelecter from '@/components/Seriousness-selecter'
export default {
  components: {
    PrefecturesList,
    SeriousnessSelecter,
  },

  data: function () {
    return {
      levelOfSeriousness: null,
    }
  },

  methods: {
    selectLevelOfSeriousness(level) {
      //子コンポーネントで発火されたカスタムイベントで起動する
      console.log(level)
    },
  },
}
</script>

<style></style>
