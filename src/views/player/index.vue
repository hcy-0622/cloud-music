<template>
  <div class="player">
    <normal-player></normal-player>
    <mini-player @show-list="showList"></mini-player>
    <list-player ref="listPlayer"></list-player>
  </div>
</template>

<script>
import NormalPlayer from './normal-player.vue'
import MiniPlayer from './mini-player.vue'
import ListPlayer from './list-player.vue'

export default {
  components: { NormalPlayer, MiniPlayer, ListPlayer },
  name: 'Player',
  methods: {
    showList() {
      this.$refs.listPlayer.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  background: palevioletred;
}
</style>
