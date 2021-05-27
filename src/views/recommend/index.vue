<template>
  <div class="recommend">
    <scroll-view>
      <div>
        <banner :banners="banners"></banner>
        <personalized
          type="personalized"
          title="推荐歌单"
          :personalized="personalized"
          @select="selectItem"
        ></personalized>
        <personalized type="album" title="最新专辑" :personalized="albums" @select="selectItem"></personalized>
        <song-list :songs="songs"></song-list>
      </div>
    </scroll-view>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '@/api'
import ScrollView from '@/components/scroll-view.vue'
import Banner from './banner.vue'
import Personalized from './personalized.vue'
import SongList from './song-list.vue'

export default {
  name: 'Recommend',
  components: { ScrollView, Banner, Personalized, SongList },
  data() {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created() {
    getBanner().then(data => {
      this.banners = data.banners
    }).catch(err => console.error(err))
    getPersonalized().then(data => {
      this.personalized = data.result
    }).catch(err => console.error(err))
    getNewAlbum().then(data => {
      this.albums = data.albums.slice(0, 6)
    }).catch(err => console.error(err))
    getNewSong().then(data => {
      this.songs = data.result
    }).catch(err => console.error(err))
  },
  methods: {
    selectItem(id, type) {
      this.$router.push(`/recommend/detail/${id}/${type}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.6s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.6s;
}
</style>
