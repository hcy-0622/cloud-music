<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>{{ currentTimeFormatted }}</span>
      <div class="progress-bar" ref="progress" @click="progressClick">
        <div class="progress-line" :style="{ width: currentProgress + '%' }">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>{{ totalTimeFormatted }}</span>
    </div>
    <div class="bottom-control">
      <div :class="modeClass" @click="changeMode"></div>
      <div class="prev" @click="prev"></div>
      <div :class="playClass" @click="play"></div>
      <div class="next" @click="next"></div>
      <div :class="favoriteClass" @click="favorite"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { PLAY_MODE } from '@/constants'
import { formatTime } from '@/utils'

export default {
  name: 'PlayerBottom',
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
  data() {
    return {
      currentProgress: 0
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'playMode',
      'currentSongIndex',
      'currentSong',
      'favoriteList'
    ]),
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
    },
    favoriteClass() {
      return {
        favorite: true,
        active: this.favoriteList.find(f => f.id === this.currentSong.id) !== undefined
      }
    },
    totalTimeFormatted() {
      const time = formatTime(this.totalTime)
      return time.minute + ':' + time.second
    },
    currentTimeFormatted() {
      const time = formatTime(this.currentTime)
      return time.minute + ':' + time.second
    }
  },
  watch: {
    currentTime(curVal) {
      this.currentProgress = curVal / this.totalTime * 100
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setPlayMode',
      'setCurrentSongIndex',
      'setPlayerCurrentTime',
      'setFavoriteSong'
    ]),
    play() {
      this.setIsPlaying(!this.isPlaying)
    },
    prev() {
      this.setCurrentSongIndex(this.currentSongIndex - 1)
    },
    next() {
      this.setCurrentSongIndex(this.currentSongIndex + 1)
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
    progressClick(e) {
      // 计算进度条的位置
      const p = this.$refs.progress
      // 相对于父元素左边的距离
      const offsetLeft = p.offsetLeft
      // 相对于浏览器左边的距离
      const eventLeft = e.pageX
      // 计算相对于自身左侧的距离
      const clickLeft = eventLeft - offsetLeft
      // 自身的宽度
      const progressWidth = p.offsetWidth
      // 计算点击位置相对于自身宽度的百分比
      const rate = clickLeft / progressWidth
      this.currentProgress = rate * 100
      // 计算从什么地方播放
      const currentTime = this.totalTime * rate
      this.setPlayerCurrentTime(currentTime)
    },
    favorite() {
      this.setFavoriteSong(this.currentSong)
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
      margin: 0 10px;
      .progress-line {
        position: relative;
        width: 0%;
        height: 100%;
        @include bg_color();
        .progress-dot {
          position: absolute;
          top: 50%;
          left: 100%;
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
      &.active {
        @include bg_img('../../../assets/images/favorite');
      }
    }
  }
}
</style>
