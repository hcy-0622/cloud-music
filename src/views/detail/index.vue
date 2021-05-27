<template>
  <div class="detail">
    <sub-header :title="playList.name"></sub-header>
    <detail-top :path="playList.coverImgUrl" ref="top"></detail-top>
    <div class="bottom">
      <scroll-view ref="scrollView">
        <detail-bottom :playList="playList.tracks"></detail-bottom>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { getPlayList } from '@/api'
import ScrollView from '@/components/scroll-view.vue'
import SubHeader from './sub-header.vue'
import DetailTop from './detail-top.vue'
import DetailBottom from './detail-bottom.vue'

export default {
  name: 'Detail',
  components: { SubHeader, DetailTop, DetailBottom, ScrollView },
  data() {
    return {
      playList: []
    }
  },
  created() {
    getPlayList({ id: this.$route.params.id }).then(data => {
      this.playList = data.playlist
    }).catch(err => console.error(err))
  },
  mounted() {
    const topEl = this.$refs.top.$el
    this.$refs.scrollView.scrolling((offsetY) => {
      if (offsetY < 0) {
        const scale = 20 * Math.abs(offsetY) / topEl.offsetHeight
        topEl.style.filter = `blur(${scale}px)`
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
