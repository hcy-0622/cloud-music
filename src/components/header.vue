<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">网抑云音乐</p>
    <div class="header-right" @click.stop="meClick"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme() {
      // TODO 暂不支持生产环境切换主题功能
      if (process.env.NODE_ENV !== 'development') {
        return
      }
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    meClick() {
      this.$router.push('/me')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  @include bg_color();
  position: relative;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img('../assets/images/logo');
  }
  .header-right {
    @include bg_img('../assets/images/account');
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
