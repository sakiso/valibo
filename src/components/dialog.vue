<template>
  <!-- 親コンポーネントから title と textを受け取って描画する-->
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text height="350px" class="text-h6">{{ text }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style></style>
