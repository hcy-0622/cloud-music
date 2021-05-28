<template>
  <ul class="tabbar">
    <router-link custom v-slot="{ navigate, isActive }" to="/recommend">
      <li
        :class="['link-item', isActive && 'link-item-active']"
        @click="navigate"
        @keypress.enter="navigate"
      >推荐</li>
    </router-link>
    <router-link custom v-slot="{ navigate, isActive }" to="/singer">
      <li
        :class="['link-item', isActive && 'link-item-active']"
        @click="navigate"
        @keypress.enter="navigate"
      >歌手</li>
    </router-link>
    <router-link custom v-slot="{ navigate, isActive }" to="/rank">
      <li
        :class="['link-item', isActive && 'link-item-active']"
        @click="navigate"
        @keypress.enter="navigate"
      >排行</li>
    </router-link>
    <router-link custom v-slot="{ navigate, isActive }" to="/search">
      <li
        :class="['link-item', isActive && 'link-item-active']"
        @click="navigate"
        @keypress.enter="navigate"
      >搜索</li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.tabbar {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  .link-item {
    line-height: 84px;
    @include font_size($font_medium);
    @include font_color();
    &.link-item-active {
      border-bottom-width: 4px;
      border-bottom-style: solid;
      @include border_color();
      @include font_active_color();
    }
  }
}
</style>
