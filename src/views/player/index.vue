<template>
  <div class="player">
    <player-header></player-header>
    <player-middle></player-middle>
    <player-bottom></player-bottom>
  </div>
</template>

<script>
import PlayerBottom from './player-bottom.vue'
import playerHeader from './player-header.vue'
import PlayerMiddle from './player-middle.vue'

export default {
  components: { playerHeader, PlayerMiddle, PlayerBottom },
  name: 'Player'
}
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: palevioletred;
}
</style>
