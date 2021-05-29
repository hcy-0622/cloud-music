<template>
  <div class="player">
    <full-player></full-player>
    <mini-player></mini-player>
    <list-player></list-player>
    <audio src="currentSong.url"></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import FullPlayer from './full-player/index.vue'
import MiniPlayer from './mini-player/index.vue'
import ListPlayer from './list-player/index.vue'

export default {
  components: { FullPlayer, MiniPlayer, ListPlayer },
  name: 'Player',
  computed: {
    ...mapGetters(['currentSong'])
  }
}
</script>

<style lang="scss" scoped>
.player {
  background: palevioletred;
}
</style>
