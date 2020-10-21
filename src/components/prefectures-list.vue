<template>
  <v-select
    :items="prefecturesList"
    label="都道府県"
    prepend-icon="mdi-map-marker"
    v-model="selectedPrefecture"
    @change="selectPrefecture"
  ></v-select>
</template>

<script>
export default {
  props: {
    selectedPrefecture: {
      type: String,
      default: '',
    },
  },
  data: function () {
    return {
      prefecturesList: ['埼玉', '千葉', '東京', '神奈川'],
    }
  },

  methods: {
    selectPrefecture() {
      this.$emit('selectPrefecture', this.selectedPrefecture)
    },
  },
}
</script>

<style></style>
