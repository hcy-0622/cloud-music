<template>
  <div class="player">
    <normal-player></normal-player>
    <mini-player></mini-player>
    <list-player></list-player>
  </div>
</template>

<script>
import NormalPlayer from './normal-player/index.vue'
import MiniPlayer from './mini-player/index.vue'
import ListPlayer from './list-player/index.vue'

export default {
  components: { NormalPlayer, MiniPlayer, ListPlayer },
  name: 'Player'
}
</script>

<style lang="scss" scoped>
.player {
  background: palevioletred;
}
</style>
