<template>
  <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <slot name="center"></slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  @include bg_color();
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 84px;
    flex-basis: 100px;
    height: 100%;
    padding-right: 20px;
    * {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
