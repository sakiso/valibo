import { db } from '@/plugins/firebase'

export default {
  async get(ID) {
    //引数のユーザのメールアドレスでクエリを作成(メッセージ登録日の昇順)
    const queryRef_send = db
      .collection('message')
      .where('send0_receive1_ID', 'array-contains', ID)
      .orderBy('messageEntryDate')
    //クエリ実行
    const selectedMessages = await queryRef_send
      .get()
      .then(async (snapshot) => {
        //検索結果無しの場合
        if (snapshot.empty) {
          console.log('no matching Msgs')
          return
        }
        //検索結果ありの場合、取得したデータをselectedMessagesに追加
        const obj = {}
        await snapshot.forEach((doc) => {
          obj[doc.id] = doc.data()
        })
        return obj
      })

    return selectedMessages
  },
}
