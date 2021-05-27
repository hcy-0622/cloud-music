<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from './components/header'
import Tabbar from './components/tabbar'

export default {
  name: 'App',
  components: { Header, Tabbar }
}
</script>

<style scoped lang="scss">
</style>
