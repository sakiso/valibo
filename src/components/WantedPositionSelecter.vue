<template>
  <v-select
    prepend-icon=" mdi-volleyball "
    :items="positionList"
    label="募集中のポジション"
    v-model="wantedPosition"
    @change="selectPosition"
    :multiple="multipleFlg"
  ></v-select>
</template>

<script>
export default {
  props: {
    multipleFlg: {
      type: Boolean,
      default: false,
    },
    wantedPosition: {
      type: Array,
      default: () => [], //配列のdefaultは素で書くと参照を共有してしまうため、関数で値を返している
    },
  },
  data() {
    return {
      positionList: [
        'ウィングスパイカー',
        'ミドルブロッカー',
        'セッター',
        'リベロ',
      ],
    }
  },

  methods: {
    selectPosition() {
      this.$emit('selectPosition', this.wantedPosition)
      //このようにpropsを直接更新するとブラウザ上でVue warnが出て、「dataで更新しなさい」と言われるが
      //親コンポーネントから選択状態をクリアしたいため、data内に選択状態を持たないようにしている
    },
  },
}
</script>

<style></style>
