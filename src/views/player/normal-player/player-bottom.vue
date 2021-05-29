<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-control">
      <div :class="modeClass" @click="changeMode"></div>
      <div class="prev"></div>
      <div :class="playClass" @click="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { PLAY_MODE } from '@/constants'

export default {
  name: 'PlayerBottom',
  computed: {
    ...mapGetters(['isPlaying', 'playMode']),
    modeClass() {
      return {
        mode: true,
        loop: this.playMode === PLAY_MODE.loop,
        one: this.playMode === PLAY_MODE.one,
        random: this.playMode === PLAY_MODE.random
      }
    },
    playClass() {
      return {
        play: true,
        active: this.isPlaying
      }
    }
  },
  methods: {
    ...mapActions(['setIsPlaying', 'setPlayMode']),
    play() {
      this.setIsPlaying(!this.isPlaying)
    },
    changeMode() {
      let mode = PLAY_MODE.loop
      if (this.playMode === PLAY_MODE.loop) {
        mode = PLAY_MODE.one
      } else if (this.playMode === PLAY_MODE.one) {
        mode = PLAY_MODE.random
      } else if (this.playMode === PLAY_MODE.random) {
        mode = PLAY_MODE.loop
      }
      this.setPlayMode(mode)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.player-bottom {
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_small);
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      height: 10px;
      background: #fff;
      position: relative;
      margin: 0 10px;
      .progress-line {
        width: 50%;
        height: 100%;
        background: #ccc;
        .progress-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
  }
  .bottom-control {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img('../../../assets/images/loop');
      }
      &.one {
        @include bg_img('../../../assets/images/one');
      }
      &.random {
        @include bg_img('../../../assets/images/shuffle');
      }
    }
    .prev {
      @include bg_img('../../../assets/images/prev');
    }
    .play {
      @include bg_img('../../../assets/images/play');
      &.active {
        @include bg_img('../../../assets/images/pause');
      }
    }
    .next {
      @include bg_img('../../../assets/images/next');
    }
    .favorite {
      @include bg_img('../../../assets/images/un_favorite');
    }
  }
}
</style>
