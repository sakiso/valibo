<template>
  <!-- 親コンポーネントから title と textを受け取って描画する-->
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text height="350px" class="text-h6"
      >{{ text }}<br />
      <v-container>
        <v-row dense>
          <v-col>
            <v-textarea
              label="チームにメッセージを送ってみましょう"
              counter="100"
              outlined
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" class="text-right">
            <v-btn dark large color="primary">
              <v-icon>mdi-send</v-icon>
              <v-text class="ml-2">メッセージを送信する</v-text>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
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

<style scoped></style>
