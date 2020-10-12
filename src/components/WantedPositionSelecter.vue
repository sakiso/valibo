<template>
  <v-select
    prepend-icon=" mdi-volleyball "
    :items="positionList"
    label="求めるポジション"
    v-model="wantedPosition"
    @change="selectPosition"
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      wantedPosition: '',
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
    },
  },
}
</script>

<style></style>
