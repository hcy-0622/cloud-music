<template>
  <ul class="detail-bottom">
    <li class="bottom-top">
      <div class="bottom-icon"></div>
      <div class="bottom title">播放全部</div>
    </li>
    <li class="item" v-for="p of playList" :key="p.id" @click="selectMusic">
      <h3>{{ p.name }}</h3>
      <p>{{ p.al.name }} - {{ p.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DetailBottom',
  props: {
    playList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    ...mapActions(['setFullScreen']),
    selectMusic() {
      this.setFullScreen(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    @include bg_sub_color();
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      @include bg_img('../../assets/images/small_play');
    }
    .bottom-title {
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item {
    h3 {
      @include font_color();
      @include font_size($font_medium);
    }
    p {
      margin-top: 10px;
      opacity: 0.8;
      @include font_color();
      @include font_size($font_small);
    }
  }
}
</style>
