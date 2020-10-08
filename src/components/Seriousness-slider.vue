<template>
  <v-container ma-0 pa-0>
    <v-row>
      <v-col cols="1">
        <v-icon>mdi-fire</v-icon>
      </v-col>
      <v-col cols="5">
        <v-select
          :items="levelList"
          label=""
          solo
          dense
          v-model="levelOfSeriousness"
          @change="selectLevel"
        ></v-select>
      </v-col>
      <v-col cols="1"> ～ </v-col>
      <v-col cols="5">
        <v-select
          :items="levelList"
          label=""
          solo
          dense
          v-model="levelOfSeriousness"
          @change="selectLevel"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      levelOfSeriousness: null,
      levelList: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    selectLevel() {
      //親コンポーネントのselectLevelカスタムイベントを発火させる
      this.$emit('selectLevel', this.levelOfSeriousness)
    },
  },
}
</script>

<style></style>
