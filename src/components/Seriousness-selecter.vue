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
          dense
          v-model="levelOfSeriousness.minLevel"
          @change="selectMinLevel"
        ></v-select>
      </v-col>
      <v-col cols="1" class="text-center"> ～ </v-col>
      <v-col cols="5">
        <v-select
          :items="levelList"
          label=""
          dense
          v-model="levelOfSeriousness.maxLevel"
          @change="selectMaxLevel"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      levelOfSeriousness: {
        minLevel: null,
        maxLevel: null,
      },
      levelList: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    selectMinLevel() {
      //親コンポーネントのselectLevelカスタムイベントを発火させる
      this.$emit('selectMinLevel', this.levelOfSeriousness.minLevel)
    },
    selectMaxLevel() {
      //親コンポーネントのselectLevelカスタムイベントを発火させる
      this.$emit('selectMaxLevel', this.levelOfSeriousness.maxLevel)
    },
  },
}
</script>

<style>
.text-center {
  text-align: center;
}
</style>
