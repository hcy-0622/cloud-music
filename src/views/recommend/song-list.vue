<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <ul class="song-list">
      <li class="song-item" v-for="s of songs" :key="s.id" @click="selectMusic">
        <img v-lazy="s.song.album.picUrl" alt />
        <div>
          <h3>{{ s.name }}</h3>
          <p>{{ s.song.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    ...mapActions(['setFullScreen']),
    selectMusic() {
      this.setFullScreen(true)
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
  .song-list {
    width: 100%;
    overflow: hidden;
    .song-item {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div {
        h3 {
          @include font_size($font_large);
          @include font_color();
        }
        p {
          margin-top: 20px;
          opacity: 0.6;
          @include font_size($font_small);
          @include font_color();
        }
      }
    }
  }
}
</style>
