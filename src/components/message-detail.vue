<template>
  <v-container pt-0 mt-0 pr-5 pl-5>
    <v-row>
      <v-col
        cols="12"
        v-for="message in $store.state.messages"
        :key="message.key"
      >
        <v-container>
          <v-row v-if="message.send0_receive1_ID[0] === 'user@example.com'">
            <v-spacer></v-spacer>
            <v-col cols="3" class="date right" align-self="end">
              {{ processedMessageEntryDate(message.messageEntryDate) }}
            </v-col>
            <v-col class="balloon_r" cols="7">
              <div class="says right_says">
                {{ message.messageText }}
                from:{{ message.send0_receive1_ID[0] }}
              </div>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col class="balloon_l" cols="7">
              <div class="says">
                {{ message.messageText }}
                from:{{ message.send0_receive1_ID[0] }}
              </div>
            </v-col>
            <v-col cols="3" class="date" align-self="end">
              {{ processedMessageEntryDate(message.messageEntryDate) }}
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-btn large color="#F48D97" dark class="message-btn">
        <v-icon> mdi-send-outline </v-icon>
        メッセージを送る
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MessageDetail',
  data() {
    return {}
  },
  computed: {
    processedMessageEntryDate: function () {
      return (date) => {
        const entryDate =
          //firestore特有のTimestamp型をJSで使えるDate型に戻すためtoDate()を使っている
          date.toDate().getMonth() +
          1 +
          '/' +
          date.toDate().getDate() +
          ' ' +
          date.toDate().getHours() +
          ':' +
          //分の十の位を0埋めするため一度str型にした後padStartで0埋め
          date.toDate().getMinutes().toString().padStart(2, '0')

        return entryDate
      }
    },
  },

  created: function () {},
}
</script>

<style scoped>
.says {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 17px 13px 15px 18px;
  border-radius: 12px;
  background: #c3eaec;
  box-sizing: border-box;
  margin: 0 !important;
  line-height: 1.5;
}
.right_says {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 17px 13px 15px 18px;
  border-radius: 12px;
  background: #e4eeee;
  box-sizing: border-box;
  margin: 0 !important;
  line-height: 1.5;
}
.says:after {
  content: '';
  position: absolute;
  border: 10px solid transparent;
}
.balloon_l .says:after {
  left: -26px;
  border-right: 22px solid #c3eaec;
}
.balloon_r .says:after {
  right: -26px;
  border-left: 22px solid #e4eeee;
}
.date {
  color: darkgray;
  vertical-align: bottom;
  position: relative;
  bottom: 0;
}
.right {
  text-align: end;
}
.message-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
