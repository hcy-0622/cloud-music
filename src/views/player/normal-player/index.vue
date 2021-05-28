<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="normal-player" v-show="isFullScreen">
      <div class="palyer-wrapper">
        <player-header></player-header>
        <player-middle></player-middle>
        <player-bottom></player-bottom>
      </div>
      <div class="player-bg">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624769894&t=fc450cb32846a4c76bb9d3dcc4e80312"
          alt
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

import PlayerBottom from './player-bottom.vue'
import playerHeader from './player-header.vue'
import PlayerMiddle from './player-middle.vue'
import { ANIMATE_DURATION } from '@/constants'

export default {
  name: 'NormalPlayer',
  components: { playerHeader, PlayerMiddle, PlayerBottom },
  computed: {
    ...mapGetters(['isFullScreen'])
  },
  methods: {
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

.normal-player {
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
    z-index: 999;
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
