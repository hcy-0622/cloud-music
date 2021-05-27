<template>
  <div class="tabbar">
    <router-link tag="div" class="item" to="/recomend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="item" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" class="item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="item" to="/search">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';
@import '../assets/styles/mixins.scss';

.tabbar {
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  display: flex;
  justify-content: space-around;
  .item {
    span {
      line-height: 84px;
      @include font_size($font_medium);
      @include font_color();
    }
    &.router-link-active {
      border-bottom-width: 4px;
      border-bottom-style: solid;
      @include border_color();
      span {
        @include font_active_color();
      }
    }
  }
}
</style>
