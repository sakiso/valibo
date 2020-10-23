<template>
  <v-app>
    <v-content class="bg-teams-view">
      <v-container fluid fill-height>
        <v-row height="100%" justify="center">
          <v-card
            min-width="400"
            width="35%"
            max-width="600"
            color="#F7F7F7"
            align="center"
          >
            <v-card-title> チーム登録 </v-card-title>

            <v-form ref="entryTeamForm" :disabled="!(asUser || asAdmin)">
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-text-field
                      prepend-icon=" mdi-account-group "
                      label="チーム名"
                      v-model="teamInfo.teamName"
                      counter="10"
                      :rules="rulesOfTeamName"
                      @blur="checkInputMust"
                    ></v-text-field>
                  </v-list-item>

                  <v-list-item>
                    <v-text-field
                      label="連絡先（e-mail）"
                      prepend-icon="mdi-email"
                      type="email"
                      :rules="rulesOfEmail"
                      v-model="teamInfo.emailAddress"
                      @blur="checkInputMust"
                    ></v-text-field>
                  </v-list-item>

                  <v-list-item>
                    <prefectures-list
                      @selectPrefecture="setPrefecture"
                      :selected-prefecture="teamInfo.placeOfActivity"
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
                      :wanted-position="teamInfo.wantedPosition"
                    >
                    </wanted-position-selecer>
                  </v-list-item>

                  <v-list-item>
                    <v-radio-group
                      prepend-icon="mdi-calendar-clock"
                      label="活動ペース"
                      v-model="teamInfo.activityCycle.weekOrMonth"
                      @change="checkInputMust"
                    >
                      <br />
                      <v-radio label="毎週" value="毎週"></v-radio>
                      <v-radio label="毎月" value="毎月"></v-radio>
                      <v-select
                        :items="times"
                        label="回数"
                        v-model="teamInfo.activityCycle.timesAWeekOrMonth"
                        @blur="checkInputMust"
                      ></v-select>
                    </v-radio-group>
                  </v-list-item>

                  <v-list-item>
                    <v-textarea
                      rows="2"
                      label="ひとこと"
                      prepend-icon="mdi-comment"
                      v-model="teamInfo.messageOfTeam"
                      @blur="checkInputMust"
                      :rules="rulesOfMessage"
                      counter="30"
                    ></v-textarea>
                  </v-list-item>

                  <v-list-item>
                    <v-file-input
                      accept="image/*"
                      label="チームの写真"
                      prepend-icon="mdi-camera"
                      @change="selectImage"
                      v-if="imageInputForm"
                    ></v-file-input>
                  </v-list-item>

                  <v-list-item>
                    <vue-loading
                      v-if="uploading"
                      type="spiningDubbles"
                      color="#7ec0e7"
                      :size="{ width: '50px', height: '50px' }"
                    ></vue-loading>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-form>

            <v-alert v-if="entryTeamDone" dense max-width="70%" type="success">
              {{ this.systemMessage }}
            </v-alert>

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
import { VueLoading } from 'vue-loading-template'
import WantedPositionSelecer from '@/components/WantedPositionSelecter.vue'
import PrefecturesList from '@/components/prefectures-list.vue'
import imageCompression from '@/imageCompression.js'

export default {
  components: {
    WantedPositionSelecer,
    PrefecturesList,
    VueLoading,
  },

  data: function () {
    return {
      rulesOfTeamName: [
        (value) => value.length <= 10 || '10文字以下で入力してください',
      ],
      rulesOfMessage: [
        (value) => value.length <= 30 || '30文字以下で入力してください',
      ],
      rulesOfEmail: [
        (value) => {
          const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return (
            emailPattern.test(value) || 'メールアドレスの形式が正しくありません'
          )
        },
        (value) => value.length <= 254 || 'メールアドレスが長すぎます',
      ],
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
      systemMessage: '',
      entryTeamDone: false,
      ticksLabels: ['1', '2', '3', '4', '5'],
      isEntryReady: false,
      teamsRef: null,
      uploading: false,
      imageInfo: null,
      imageInputForm: true,
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
        emailAddress: '',
        messageOfTeam: '',
      },
      role: '',
      asAdmin: false,
      asUser: false,
    }
  },

  created: function () {
    //teamsコレクションへの参照
    this.teamsRef = db.collection('teams')

    //取得したroleがadminならasAdmin、userならasUserをtrueにする
    if (this.$store.state.role === 'admin') {
      this.asAdmin = true
      console.log('admin')
    } else if (this.$store.state.role === 'user') {
      this.asUser = true
      console.log('user')
    } else {
      console.log('未ログイン')
    }
  },

  methods: {
    setPrefecture(prefecture) {
      this.teamInfo.placeOfActivity = prefecture

      //各入力項目の入力が完了しているかチェックし、OKなら登録ボタンを活性化する
      this.checkInputMust()
    },

    setWantedPosition(position) {
      //ポジション選択時に子コンポーネントから受け取ったデータを保存する
      this.teamInfo.wantedPosition = position

      //各入力項目の入力が完了しているかチェックし、OKなら登録ボタンを活性化する
      this.checkInputMust()
    },

    async selectImage(fileInfo) {
      //ファイル名とローカル上のパスを取得
      this.imageInfo = fileInfo

      //各入力項目の入力が完了しているかチェックし、OKなら登録ボタンを活性化する
      this.checkInputMust()
    },

    checkInputMust() {
      //まず全項目の必須チェックを実行し、必須チェックを通過した場合にバリデーションチェックを行う
      //両チェックとも通過したら準備完了とし、登録ボタンを活性化させる

      //各項目の必須チェック
      if (
        //チーム名の入力が完了しているか
        this.teamInfo.teamName !== '' &&
        //メールアドレスの入力が完了しているか
        this.teamInfo.emailAddress !== '' &&
        //活動エリアの入力が完了しているか
        this.teamInfo.placeOfActivity !== '' &&
        //求めるポジションの入力が完了しているか
        this.teamInfo.wantedPosition.length !== 0 &&
        //活動ペース（月/週）の入力が完了しているか
        this.teamInfo.activityCycle.weekOrMonth !== '' &&
        //活動ペース（回数）の入力が完了しているか
        this.teamInfo.activityCycle.timesAWeekOrMonth !== '' &&
        //メッセージの入力が完了しているか
        this.teamInfo.messageOfTeam !== '' &&
        //写真の選択が完了しているか
        this.imageInfo !== null && //画像が選択されていない場合
        this.imageInfo !== void 0 //画像を選択後に×で削除した場合（nullではなくundefinedになるのでvoid0と比較する）
      ) {
        //各項目の桁数・フォーマットチェック
        //ref=teamEntryForm内の全rulesを検証する
        if (this.$refs.entryTeamForm.validate()) {
          //全バリデーション通過した場合、準備完了状態をtrueに更新しボタンを活性化
          this.isEntryReady = true
        } else {
          console.log('バリデーションチェックエラー')
        }
      } else {
        //条件を満たさない場合はボタンを非活性にする
        this.isEntryReady = false
        console.log('必須チェックエラー')
      }
    },

    async entryTeam() {
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

      //リサイズ、アップロード、firestore登録完了までloadingのスピナーを表示する
      this.uploading = true

      //timestamp取得
      const timestamp = new Date()
      //timestampからYYYY/MM/DD形式の文字列を取得
      const entryDate =
        timestamp.getFullYear() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getDate()

      //画像を圧縮する
      console.log('start compress')
      this.compressedImage = await imageCompression.getCompressImageFile(
        this.imageInfo
      )
      console.log('finished compress')

      //ファイルをアップロードする前に、ファイル名にタイムスタンプを付与して一意にする
      const uniqueImageName = this.imageInfo.name + '_' + timestamp
      //storageへの参照
      const storageRef = storage.ref()
      const teamImagesRef = storageRef.child('team_image/' + uniqueImageName)

      //アップロードしてURLを取得
      //コールバック関数内でthisへ参照できないため、selfに退避する
      let self = this
      await teamImagesRef
        .put(this.compressedImage)
        .then(async function (snapshot) {
          self.teamImageUrl = await snapshot.ref.getDownloadURL()
          console.log(self.teamImageUrl)
          console.log('upload done')
        })

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
        email_address: this.teamInfo.emailAddress,
        message_of_team: this.teamInfo.messageOfTeam,
        team_image_url: this.teamImageUrl,
      })

      //loadingスピナーを非表示にするためfalseに更新
      this.uploading = false

      //画面入力値を初期化
      this.teamInfo.teamName = ''
      this.teamInfo.emailAddress = null
      this.teamInfo.placeOfActivity = ''
      this.teamInfo.levelOfSeriousness = '2'
      this.teamInfo.wantedPosition = null
      this.teamInfo.activityCycle.weekOrMonth = ''
      this.teamInfo.activityCycle.timesAWeekOrMonth = ''
      this.teamInfo.messageOfTeam = ''

      //v-file-inputはファイルをバインドしているわけではないので、
      //選択ファイルをクリアするためにv-ifで一度描画を破棄し、すぐ再描画する
      this.imageInputForm = false
      this.$nextTick(() => {
        this.imageInputForm = true //DOMの更新を待つためnexTickで再描画を実行
      })

      //登録完了後、登録ボタンを非活性化する
      this.isEntryReady = false

      //登録完了メッセージ出力
      this.entryTeamDone = true
      this.systemMessage = 'チームを登録しました'
    },
  },
}
</script>

<style scoped>
.system-message {
  color: darkblue;
  font-size: 25pt;
}
</style>
