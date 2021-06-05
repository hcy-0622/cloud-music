<template>
  <div class="header">
    <div class="header-left" @click="hiddenPlayer"></div>
    <div class="header-title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PlayerHeader',
  computed: {
    ...mapGetters(['currentSong'])
  },
  methods: {
    ...mapActions(['setFullPlayer', 'setMiniPlayer']),
    hiddenPlayer() {
      this.setFullPlayer(false)
      this.setMiniPlayer(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.header {
  z-index: 999;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img('../../../assets/images/down');
  }
  /* .header-right {
    @include bg_img('../../assets/images/more');
  } */
  .header-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no_wrap();
  }
}
</style>
