<template>
  <div>
    <br />
    <router-link to="/teams"> チーム検索 </router-link>
    <br />
    <router-link to="/players"> プレイヤー検索 </router-link>
    <br />
    <router-link to="/entry-team"> チーム登録 </router-link>
    <br />
    <router-link to="/entry-player"> プレイヤー登録 </router-link>

    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
