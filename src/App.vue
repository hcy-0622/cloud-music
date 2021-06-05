<template>
  <div id="app">
    <my-header class="header">
      <div slot="left" class="header-left"></div>
      <div slot="center" class="header-title">网抑云音乐</div>
      <div slot="right" class="header-right" @click.stop="clickMe"></div>
    </my-header>
    <my-tabbar></my-tabbar>
    <keep-alive include="Singer, Search">
      <router-view></router-view>
    </keep-alive>
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
  },
  methods: {
    clickMe() {
      this.$router.push('/me')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/styles/variables';
@import './assets/styles/mixins';

.header {
  .header-left {
    @include bg_img('./assets/images/logo');
  }
  .header-right {
    @include bg_img('./assets/images/account');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
  }
}
</style>
