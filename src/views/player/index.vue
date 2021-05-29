<template>
  <div class="player">
    <full-player :total-time="totalTime" :current-time="currentTime"></full-player>
    <mini-player></mini-player>
    <list-player></list-player>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="ended"></audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import FullPlayer from './full-player/index.vue'
import MiniPlayer from './mini-player/index.vue'
import ListPlayer from './list-player/index.vue'
import { PLAY_MODE } from '@/constants'
import { getRandomIntInclusive } from '@/utils'

export default {
  components: { FullPlayer, MiniPlayer, ListPlayer },
  name: 'Player',
  data() {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  mounted() {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentSongIndex',
      'playerCurrentTime',
      'playMode',
      'songs'
    ])
  },
  watch: {
    isPlaying(curVal, prevVal) {
      if (curVal) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentSongIndex() {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    playerCurrentTime(curVal) {
      this.$refs.audio.currentTime = curVal
    }
  },
  methods: {
    ...mapActions([
      'setCurrentSongIndex'
    ]),
    timeupdate(e) {
      this.currentTime = e.target.currentTime
    },
    ended() {
      if (this.playMode === PLAY_MODE.loop) {
        this.setCurrentSongIndex(this.currentSongIndex + 1)
      } else if (this.playMode === PLAY_MODE.one) {
        this.$refs.audio.play()
      } else if (this.playMode === PLAY_MODE.random) {
        const idx = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentSongIndex(idx)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  background: palevioletred;
}
</style>
