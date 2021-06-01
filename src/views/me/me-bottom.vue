<template>
  <div class="me-bottom">
    <div class="bottom-play" @click="selectAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <scroll-view>
        <song-list :songs="switchNum === 0 ? favoriteList : historyList"></song-list>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import scrollView from '@/components/scroll-view.vue'
import SongList from '@/components/song-list.vue'

export default {
  components: { scrollView, SongList },
  name: 'MeBottom',
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapMutations(['set_song_detail']),
    ...mapActions(['setFullPlayer', 'setSongDetail', 'setCurrentSongIndex']),
    selectAllMusic() {
      if (this.switchNum === 0) {
        this.set_song_detail(this.favoriteList)
      } else {
        this.set_song_detail(this.historyList)
      }
      this.setFullPlayer(true)
      this.setCurrentSongIndex(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.me-bottom {
  position: fixed;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0;
  .bottom-play {
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    border-radius: 30px;
    @include border_color();
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        margin-right: 20px;
        @include bg_img('../../assets/images/small_play');
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 200px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
}
</style>
