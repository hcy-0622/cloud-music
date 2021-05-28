<template>
  <div class="detail">
    <detail-header :title="playList.name"></detail-header>
    <detail-top :path="playList.coverImgUrl" ref="top"></detail-top>
    <div class="bottom">
      <scroll-view ref="scrollView">
        <detail-bottom :playList="playList.tracks"></detail-bottom>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { getAlbum, getPlayList } from '@/api'
import ScrollView from '@/components/scroll-view.vue'
import DetailHeader from './detail-header.vue'
import DetailTop from './detail-top.vue'
import DetailBottom from './detail-bottom.vue'

export default {
  name: 'Detail',
  components: { DetailHeader, DetailTop, DetailBottom, ScrollView },
  data() {
    return {
      playList: {}
    }
  },
  created() {
    const { id, type } = this.$route.params
    if (type === 'personalized') {
      getPlayList({ id }).then(data => {
        this.playList = data.playlist
      }).catch(err => console.error(err))
    } else if (type === 'album') {
      getAlbum({ id }).then(data => {
        const { album, songs } = data
        this.playList = {
          name: album.name,
          coverImgUrl: album.picUrl,
          tracks: songs
        }
      }).catch(err => console.error(err))
    }
  },
  mounted() {
    const topEl = this.$refs.top.$el
    this.$refs.scrollView.scrolling((offsetY) => {
      if (offsetY < 0) {
        const scale = Math.abs(offsetY) / topEl.offsetHeight
        this.$refs.top.changeMask(scale)
        // 高斯模糊非常消耗性能, 不建议使用
        // topEl.style.filter = `blur(${scale}px)`
      } else {
        const scale = 1 + offsetY / topEl.offsetHeight
        topEl.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixins';

.detail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
