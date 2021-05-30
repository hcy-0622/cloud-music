<template>
  <div class="player">
    <full-player :total-time="totalTime" :current-time="currentTime"></full-player>
    <mini-player></mini-player>
    <list-player></list-player>
    <audio
      :src="currentSong ? currentSong.url : ''"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="ended"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import FullPlayer from './full-player/index.vue'
import MiniPlayer from './mini-player/index.vue'
import ListPlayer from './list-player/index.vue'
import { FAVORITE_LIST_KEY, HISTORY_LIST_KEY, PLAY_MODE } from '@/constants'
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
  created() {
    const favoriteList = JSON.parse(localStorage.getItem(FAVORITE_LIST_KEY))
    if (favoriteList !== null) {
      this.setFavoriteList(favoriteList)
    }

    const historyList = JSON.parse(localStorage.getItem(HISTORY_LIST_KEY))
    if (historyList !== null) {
      this.setHistoryList(historyList)
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
      'currentSong',
      // 'currentSongIndex',
      'playerCurrentTime',
      'playMode',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    isPlaying(curVal, prevVal) {
      const audioEl = this.$refs.audio
      if (curVal) {
        this.setHistorySong(this.currentSong)
        audioEl.play()
      } else {
        audioEl.pause()
      }
    },
    currentSong() {
      this.playSong()
    },
    currentSongIndex() {
      this.playSong()
    },
    playerCurrentTime(curVal, prevVal) {
      this.$refs.audio.currentTime = curVal
    },
    favoriteList(curVal, prevVal) {
      localStorage.setItem(FAVORITE_LIST_KEY, JSON.stringify(curVal))
    },
    historyList(curVal, prevVal) {
      localStorage.setItem(HISTORY_LIST_KEY, JSON.stringify(curVal))
    }
  },
  methods: {
    ...mapActions([
      'setCurrentSongIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    playSong() {
      const audioEl = this.$refs.audio
      audioEl.oncanplay = () => {
        this.totalTime = audioEl.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          audioEl.play()
        } else {
          audioEl.pause()
        }
      }
    },
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
