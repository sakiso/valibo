import { db } from '@/plugins/firebase'

export default {
  async add(inputObj) {
    /*
  inputObjの内容は以下の通り
  { send0_receive1_ID: [メッセージ送信者ID, メッセージ受信者ID], (array)
    messageText: メッセージ本文, (String)
    messageEntryDate: メッセージ送信日付,(Timestamp) }
  */
    //messageコレクションへの参照
    const messageRef = db.collection('message')
    //messageコレクションへのドキュメント登録
    await messageRef.add({
      send0_receive1_ID: inputObj.send0_receive1_ID,
      messageText: inputObj.messageText,
      messageEntryDate: inputObj.messageEntryDate,
    })
  },
}
