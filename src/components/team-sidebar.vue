<template>
  <div>
    <v-card tile flat height="130%">
      <v-card-title> チーム検索条件 </v-card-title>
      <v-divider></v-divider>

      <v-card-subtitle class="text-center">
        <font class="err">{{ errMessage }}</font>
        <v-btn rounded width="70%" @click="selectTeamsFromFilestore">
          <v-icon>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-card-subtitle>

      <v-card-text>
        <br />
        <div class="font-weight-black">活動エリア</div>
        <prefecturesList @selectPrefecture="setPrefecture"></prefecturesList>

        <div class="font-weight-black">本気度</div>
        <seriousnessSelecter
          @selectMinLevel="setMinLevelOfSeriousness"
          @selectMaxLevel="setMaxLevelOfSeriousness"
        ></seriousnessSelecter>

        <div class="font-weight-black">ポジション</div>
        <wanted-position-selecer @selectPosition="setWantedPosition">
        </wanted-position-selecer>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PrefecturesList from '@/components/prefectures-list'
import SeriousnessSelecter from '@/components/Seriousness-selecter'
import WantedPositionSelecer from '@/components/WantedPositionSelecter.vue'
import { db } from '@/plugins/firebase'

export default {
  components: {
    PrefecturesList,
    SeriousnessSelecter,
    WantedPositionSelecer,
  },

  data: function () {
    return {
      placeOfActivity: '',
      minlevelOfSeriousness: '',
      maxlevelOfSeriousness: '',
      wantedPosition: '',
      errMessage: null,
    }
  },

  methods: {
    setMinLevelOfSeriousness(level) {
      //子コンポーネントで発火されたカスタムイベントで起動する
      console.log('min:', level)
      this.minlevelOfSeriousness = level
    },
    setMaxLevelOfSeriousness(level) {
      //子コンポーネントで発火されたカスタムイベントで起動する
      console.log('max:', level)
      this.maxlevelOfSeriousness = level
    },
    setWantedPosition(position) {
      //子コンポーネントで発火されたカスタムイベントで起動する
      console.log(position)
      this.wantedPosition = position
    },
    setPrefecture(prefecture) {
      console.log(prefecture)
      this.placeOfActivity = prefecture
    },

    selectTeamsFromFilestore() {
      //処理開始時に表示されている検索エラーメッセージは初期化する
      this.errMessage = null

      //未入力項目があるとき、エラーを表示して抜ける
      if (
        !this.placeOfActivity ||
        !this.minlevelOfSeriousness ||
        !this.maxlevelOfSeriousness ||
        !this.wantedPosition
      ) {
        this.errMessage = '検索条件に未入力項目があります'
        console.log('検索条件に未入力項目があります')
        return
      }

      //teamsコレクションへの参照
      const teamsRef = db.collection('teams')

      //入力した値でクエリを作成
      //本気度は入力値(1~5)をデータ上の値(0-4)にするため-1する
      const queryRef = teamsRef
        .where('place_of_activity', '==', this.placeOfActivity)
        .where('level_of_seriousness', '>=', this.minlevelOfSeriousness - 1)
        .where('level_of_seriousness', '<=', this.maxlevelOfSeriousness - 1)
        .where('wanted_position', 'array-contains', this.wantedPosition)

      //作成したクエリを実行
      const selectedTeams = queryRef
        .get()
        .then((snapshot) => {
          //検索結果無しの場合
          if (snapshot.empty) {
            console.log('no matching docs')
            this.errMessage = '条件を満たすチームが存在しません'
            return
          }
          //検索結果ありの場合
          const obj = {}
          snapshot.forEach((doc) => {
            obj[doc.id] = doc.data()
          })
          console.log(obj)
          this.$emit('selectTeams', obj)
        })
        .catch((err) => {
          //エラーの場合
          console.log('Error getting documents ... ', err)
        })
      console.log(selectedTeams)
    },
  },
}
</script>

<style>
.err {
  color: rgb(255, 81, 0);
  font-weight: bold;
}
</style>
