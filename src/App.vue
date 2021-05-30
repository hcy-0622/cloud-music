<template>
  <div id="app">
    <my-header></my-header>
    <my-tabbar></my-tabbar>
    <router-view></router-view>
    <my-player></my-player>
  </div>
</template>

<script>
import MyHeader from './components/header.vue'
import MyTabbar from './components/tabbar.vue'
import MyPlayer from './components/player/index.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyTabbar,
    MyPlayer
  }
}
</script>

<style lang="scss" scoped>
</style>
