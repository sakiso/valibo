import Vue from 'vue'
import Vuex from 'vuex'

//stateをlocalStrageに保存するためのプラグイン
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: '',
  },
  mutations: {
    updateRole(state, role) {
      if (role === 'admin') {
        //管理者権限の場合
        state.role = 'admin'
      } else if (role === 'user') {
        //一般ユーザ権限の場合
        state.role = 'user'
      } else {
        //管理者権限がadminでもuserでもない場合（想定されない）
        state.role = ''
      }
    },
    deleteRole(state) {
      //ログアウト処理時にstateのroleを初期化する
      state.role = ''
    },
  },
  actions: {},

  //stateをlocalStrageに保存するためのプラグイン
  plugins: [
    createPersistedState({
      // ストレージのキーを指定。デフォルトではvuexなので他アプリと重複する
      key: 'valibo',

      // ストレージの種類としてlocalstorageを指定する。
      storage: window.localStrage,
    }),
  ],
})
