module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  plugins: [
    'vue', 'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    //優先度A+B のルール(エラー防止+読みやすさの向上)
    "plugin:vue/strongly-recommended",
    "prettier/vue",
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
parserOptions: {
  parser: "babel-eslint"
},

}
