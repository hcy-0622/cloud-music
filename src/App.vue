<template>
  <div id="app">
    <my-header></my-header>
    <my-tabbar></my-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Tabbar from './components/tabbar.vue'

export default {
  name: 'App',
  components: { MyHeader: Header, MyTabbar: Tabbar }
}
</script>

<style lang="scss" scoped>
</style>
