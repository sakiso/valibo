<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <v-row height="100%" justify="center">
          <v-card min-width="30%" color="blue lighten-4" align="center">
            <v-card-title> チーム登録 </v-card-title>

            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-text-field label="チーム名"></v-text-field>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-map-marker</v-icon>
                  </v-list-item-icon>
                  <v-text-field label="活動場所"></v-text-field>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-fire</v-icon>
                  </v-list-item-icon>
                  <v-text-field label="活動頻度"></v-text-field>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-calendar-clock </v-icon>
                  </v-list-item-icon>
                  <v-radio-group label="活動ペース">
                    <br />
                    <v-radio label="毎週" value="radio-1"></v-radio>
                    <v-radio label="毎月" value="radio-2"></v-radio>
                    <v-select :items="items" label="回数" solo></v-select>
                  </v-radio-group>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-btn large> 登録 </v-btn>
            <br />
            <br />
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      items: [
        '1回',
        '2回',
        '3回',
        '4回',
        '5回',
        '6回',
        '7回',
        '8回',
        '9回',
        '10回以上',
      ],
    }
  },
}
</script>

<style></style>
