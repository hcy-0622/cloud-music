<template>
  <ul class="song-list">
    <li class="song-item" v-for="s of songs" :key="s.id" @click="selectMusic(s.id)">
      <img v-lazy="s.picUrl" alt />
      <div>
        <h3>{{ s.name }}</h3>
        <p>{{ s.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions(['setFullPlayer', 'setSongDetail']),
    selectMusic(id) {
      this.setFullPlayer(true)
      this.setSongDetail([id])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

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
      width: 70%;
      h3 {
        @include font_size($font_large);
        @include font_color();
        @include no-wrap();
      }
      p {
        margin-top: 20px;
        opacity: 0.6;
        @include font_size($font_small);
        @include font_color();
        @include no-wrap();
      }
    }
  }
}
</style>
