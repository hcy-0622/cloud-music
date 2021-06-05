<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <song-list :songs="songs"></song-list>
  </div>
</template>

<script>
import SongList from '@/components/song-list.vue'

export default {
  name: 'LatestSongs',
  components: { SongList },
  props: {
    songs: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.song {
  width: 100%;
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    @include bg_sub_color();
    h3 {
      font-weight: bold;
      @include font_size($font_large);
      @include font_color();
    }
  }
}
</style>
