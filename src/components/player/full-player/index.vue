<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="full-player" v-show="isShowFullPlayer">
      <div class="palyer-wrapper">
        <player-header></player-header>
        <player-middle :current-time="currentTime"></player-middle>
        <player-bottom :total-time="totalTime" :current-time="currentTime"></player-bottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

import PlayerBottom from './player-bottom.vue'
import playerHeader from './player-header.vue'
import PlayerMiddle from './player-middle.vue'
import { ANIMATE_DURATION } from '@/constants'

export default {
  name: 'FullPlayer',
  components: { playerHeader, PlayerMiddle, PlayerBottom },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isShowFullPlayer', 'currentSong'])
  },
  watch: {
    currentSong(curVal, prevVal) {
      if (curVal.id) {
        this.getSongLyric(curVal.id)
      }
    }
  },
  methods: {
    ...mapActions(['getSongLyric']),
    enter(el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: ANIMATE_DURATION }, () => done())
    },
    leave(el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: ANIMATE_DURATION }, () => done())
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins';

.full-player {
  z-index: 998;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  @include bg_sub_color();
  .player-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .player-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>
