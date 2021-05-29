<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div :class="modeClass" @click="changeMode"></div>
            <p>{{ modeText }}</p>
          </div>
          <div class="top-right">
            <div class="del"></div>
          </div>
        </div>
        <div class="player-middle">
          <scroll-view>
            <ul>
              <li class="item">
                <div class="item-left">
                  <div :class="playItemClass" @click="play"></div>
                  <p>演员</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-close"></div>
                </div>
              </li>
            </ul>
          </scroll-view>
        </div>
        <div class="player-bottom">
          <p @click.stop="hide">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

import ScrollView from '@/components/scroll-view.vue'
import { ANIMATE_DURATION, PLAY_MODE } from '@/constants'

export default {
  name: 'ListPlayer',
  components: { ScrollView },
  computed: {
    ...mapGetters(['isPlaying', 'playMode', 'isShowListPlayer']),
    modeClass() {
      return {
        mode: true,
        loop: this.playMode === PLAY_MODE.loop,
        one: this.playMode === PLAY_MODE.one,
        random: this.playMode === PLAY_MODE.random
      }
    },
    modeText() {
      let text = ''
      if (this.playMode === PLAY_MODE.loop) {
        text = '顺序播放'
      } else if (this.playMode === PLAY_MODE.one) {
        text = '单曲播放'
      } else if (this.playMode === PLAY_MODE.random) {
        text = '随机播放'
      }

      return text
    },
    playItemClass() {
      return {
        'item-play': true,
        active: this.isPlaying
      }
    }
  },
  methods: {
    ...mapActions(['setIsPlaying', 'setPlayMode', 'setListPlayer']),
    hide() {
      this.setListPlayer(false)
    },
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
    },
    enter(el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: ANIMATE_DURATION }, () => done())
    },
    leave(el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: ANIMATE_DURATION }, () => done())
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-wrapper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img('../../../assets/images/small_loop');
          }
          &.one {
            @include bg_img('../../../assets/images/small_one');
          }
          &.random {
            @include bg_img('../../../assets/images/small_shuffle');
          }
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img('../../../assets/images/small_del');
        }
      }
    }
    .player-middle {
      .item {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('../../../assets/images/small_play');
            &.active {
              @include bg_img('../../../assets/images/small_pause');
            }
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img('../../../assets/images/small_favorite');
          }
          .item-close {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../../assets/images/small_close');
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        color: #fff;
        @include font_size($font_medium);
      }
    }
  }
}
</style>
