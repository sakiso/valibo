<template>
  <v-app>
    <v-content>
      <v-container ma-0 pa-0 fluid fill-height>
        <v-row height="100%" justify="center">
          <v-card
            min-width="400px"
            width="30%"
            color="blue lighten-4"
            align="center"
          >
            <v-card-title> チーム登録 </v-card-title>

            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-text-field
                    prepend-icon=" mdi-account-group "
                    label="チーム名"
                    v-model="teamInfo.teamName"
                    @blur="checkInput"
                  ></v-text-field>
                </v-list-item>

                <v-list-item>
                  <prefectures-list
                    @selectPrefecture="setPrefecture"
                  ></prefectures-list>
                </v-list-item>

                <v-list-item>
                  <v-slider
                    prepend-icon=" mdi-fire "
                    v-model="teamInfo.levelOfSeriousness"
                    label="本気度"
                    max="4"
                    step="1"
                    :tick-labels="ticksLabels"
                  ></v-slider>
                </v-list-item>

                <v-list-item>
                  <wanted-position-selecer
                    @selectPosition="setWantedPosition"
                    :multiple-flg="true"
                  >
                  </wanted-position-selecer>
                </v-list-item>

                <v-list-item>
                  <v-radio-group
                    prepend-icon="mdi-calendar-clock"
                    label="活動ペース"
                    v-model="teamInfo.activityCycle.weekOrMonth"
                    @blur="checkInput"
                  >
                    <br />
                    <v-radio label="毎週" value="毎週"></v-radio>
                    <v-radio label="毎月" value="毎月"></v-radio>
                    <v-select
                      :items="times"
                      label="回数"
                      v-model="teamInfo.activityCycle.timesAWeekOrMonth"
                      @blur="checkInput"
                    ></v-select>
                  </v-radio-group>
                </v-list-item>

                <v-list-item>
                  <v-file-input
                    accept="image/*"
                    label="チームの写真"
                    prepend-icon="mdi-camera"
                    @change="uploadImage"
                  ></v-file-input>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-btn
              large
              @click="entryTeam"
              color="primary"
              :disabled="!isEntryReady"
            >
              登録
            </v-btn>
            <br />
            <br />
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { db } from '@/plugins/firebase'
import { storage } from '@/plugins/firebase'
import WantedPositionSelecer from '@/components/WantedPositionSelecter.vue'
import PrefecturesList from '@/components/prefectures-list.vue'
import imageCompression from '@/imageCompression.js'

export default {
  components: {
    WantedPositionSelecer,
    PrefecturesList,
  },

  data: function () {
    return {
      times: [
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
      ticksLabels: ['1', '2', '3', '4', '5'],
      isEntryReady: false,
      teamsRef: null,
      imageInfo: null,
      compressedImage: null,
      teamImageUrl: '',
      teamInfo: {
        teamName: '',
        placeOfActivity: '',
        levelOfSeriousness: '2',
        wantedPosition: [],
        activityCycle: {
          weekOrMonth: '',
          timesAWeekOrMonth: '',
        },
      },
    }
  },

  created: function () {
    //teamsコレクションへの参照
    this.teamsRef = db.collection('teams')
  },

  methods: {
    setPrefecture(prefecture) {
      this.teamInfo.placeOfActivity = prefecture
    },

    setWantedPosition(position) {
      //ポジション選択時に子コンポーネントから受け取ったデータを保存するメソッド
      this.teamInfo.wantedPosition = position
    },

    async uploadImage(fileInfo) {
      console.log(fileInfo.name)
      //ファイル名とローカル上のパスを取得
      this.imageInfo = fileInfo

      //画像を圧縮する
      console.log('start compress')
      this.compressedImage = await imageCompression.getCompressImageFile(
        this.imageInfo
      )
      console.log('finished compress')

      //ファイルをアップロードする前に、ファイル名にタイムスタンプを付与して一意にする
      const timestamp = new Date()
      const uniqueImageName = this.imageInfo.name + '_' + timestamp
      //storageへの参照
      const storageRef = storage.ref()
      const teamImagesRef = storageRef.child('team_image/' + uniqueImageName)

      //アップロードしてURLを取得
      //コールバック関数内でthisへ参照できないため、selfに退避する
      let self = this
      teamImagesRef.put(this.compressedImage).then(async function (snapshot) {
        self.teamImageUrl = await snapshot.ref.getDownloadURL()
        console.log(self.teamImageUrl)
        console.log('upload done')
        self.checkInput()
      })
    },

    checkInput() {
      if (
        //チーム名の入力が完了しているか
        this.teamInfo.teamName !== '' &&
        //活動エリアの入力が完了しているか
        this.teamInfo.placeOfActivity !== '' &&
        //求めるポジションの入力が完了しているか
        this.teamInfo.wantedPosition !== [] &&
        //活動ペース（月/週）の入力が完了しているか
        this.teamInfo.activityCycle.weekOrMonth !== '' &&
        //活動ペース（回数）の入力が完了しているか
        this.teamInfo.activityCycle.timesAWeekOrMonth !== '' &&
        //チーム写真のアップロードが完了しているか
        this.teamImageUrl !== ''
      ) {
        //準備完了状態をtrueに更新し、これによりボタンが活性化する
        this.isEntryReady = true
      } else {
        //条件を満たさない場合はボタンを非活性にする
        this.isEntryReady = false
      }
    },
    entryTeam() {
      //入力がなければ抜ける
      if (
        this.teamInfo.teamName === '' ||
        this.teamInfo.placeOfActivity === '' ||
        this.teamInfo.wantedPosition === [] ||
        this.teamInfo.activityCycle.weekOrMonth === '' ||
        this.teamInfo.activityCycle.timesAWeekOrMonth === '' ||
        this.imageInfo === null
      ) {
        console.log('入力項目に不足あり')
        return
      }

      //timestamp取得
      const timestamp = new Date()
      //timestampからYYYY/MM/DD形式の文字列を取得
      const entryDate =
        timestamp.getFullYear() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getDate()

      //teamsコレクションへの登録
      this.teamsRef.add({
        team_name: this.teamInfo.teamName,
        place_of_activity: this.teamInfo.placeOfActivity,
        level_of_seriousness: this.teamInfo.levelOfSeriousness,
        entry_timestamp: timestamp,
        entry_date: entryDate,
        wanted_position: this.teamInfo.wantedPosition,
        activity_cycle: {
          week_or_month: this.teamInfo.activityCycle.weekOrMonth,
          times_a_week_or_month: this.teamInfo.activityCycle.timesAWeekOrMonth,
        },
        team_image_url: this.teamImageUrl,
      })

      //画面入力値を初期化
      this.teamInfo.teamName = ''
      this.teamInfo.placeOfActivity = ''
      this.teamInfo.levelOfSeriousness = '2'
      this.teamInfo.wantedPosition = []
      this.teamInfo.activityCycle.weekOrMonth = ''
      this.teamInfo.activityCycle.timesAWeekOrMonth = ''
      this.imageInfo = null
    },
  },
}
</script>

<style scoped></style>
