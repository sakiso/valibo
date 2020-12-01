## Valiboについて
URL: https://valibo-84ec1.web.app/#/

GitHub: https://github.com/sakiso/valibo

## サービスの概要
新規メンバーを求めているバレーボールのローカルチームと、チームに入りたい個人をマッチングするサービス。

## 機能概要
* チーム検索機能
* チーム削除機能
* チーム登録機能
  * 写真リサイズ（縮小）機能
* メッセージ送受信機能
* ログイン機能（Firebase Authentication）
  * ログイン状態・権限管理（Vuex）

※チーム削除機能は管理者ユーザでログインしている場合のみ利用可能

## 非機能概要
* レスポンシブデザイン（スマホ用レイアウト）対応
* 動作確認環境
  * Google Chrome 最新版

## 使用技術
### フロントエンド
* Vue.js
* Vuex
* Vue Router
* Vuetify

### バックエンド（mBaaS）
* Firebase
  * Storage
  * Cloud Firestore
  * Authentication

### ホスティング
* Firebase Hosting
  * GitHubと連携しビルド・デプロイを自動化


## 開発の背景
地域のスポーツチームを検索する既存サービスは他にあるが、バレーボールに特化したサービスがないため、いずれも「活動地域とフリーワードの組み合わせ検索」などの機能しか提供されていない。
バレーボールは各ポジションの専門性が高く、またチームごとにレクリエーション目的から大会出場目的までレベルのばらつきが大きいため、チームと個人の需要と供給をマッチさせることが難しい。

この課題を解決するため、各チームの求めているポジションや練習のレベルなど、バレーボールに特化した情報を登録・検索できるサービスを開発した。

## サービス利用イメージ
![gif](https://github.com/sakiso/valibo/blob/master/valibo-image_serch_message.gif)
![gif](https://github.com/sakiso/valibo/blob/master/valibo-image_team%20entry.gif)
![gif](https://github.com/sakiso/valibo/blob/master/valibo-image_responsive.gif)
