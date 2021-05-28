<template>
  <div id="app">
    <my-header></my-header>
    <my-tabbar></my-tabbar>
    <router-view></router-view>
    <my-player></my-player>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Tabbar from './components/tabbar.vue'
import Player from './views/player/index.vue'

export default {
  name: 'App',
  components: {
    MyHeader: Header,
    MyTabbar: Tabbar,
    MyPlayer: Player
  }
}
</script>

<style lang="scss" scoped>
</style>
