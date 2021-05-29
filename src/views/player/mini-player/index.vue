<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="mini-player" v-show="isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showPlayer">
          <img
            :class="{active: isPlaying}"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624769894&t=fc450cb32846a4c76bb9d3dcc4e80312"
            alt
          />
          <div class="player-title">
            <h3>演员</h3>
            <p>薛之谦</p>
          </div>
        </div>
        <div class="player-right">
          <div :class="playClass" @click="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

import { ANIMATE_DURATION } from '@/constants'

export default {
  name: 'MiniPlayer',
  computed: {
    ...mapGetters(['isShowMiniPlayer', 'isPlaying']),
    playClass() {
      return {
        play: true,
        active: this.isPlaying
      }
    }
  },
  methods: {
    ...mapActions(['setFullScreen', 'setMiniPlayer', 'setListPlayer', 'setIsPlaying']),
    showList() {
      this.setListPlayer(true)
    },
    showPlayer() {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    play() {
      this.setIsPlaying(!this.isPlaying)
    },
    enter(el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: ANIMATE_DURATION }, () => done())
    },
    leave(el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: ANIMATE_DURATION }, () => done())
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  @include bg_color();
  .player-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 4s linear infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
      }
      .player-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3 {
          @include font_size($font_medium);
          @include font_color();
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img('../../../assets/images/play');
        &.active {
          @include bg_img('../../../assets/images/pause');
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../../assets/images/list');
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
