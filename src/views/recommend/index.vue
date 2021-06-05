<template>
  <div class="recommend">
    <div class="recommend-wrapper">
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
          <latest-songs :songs="songs"></latest-songs>
        </div>
      </scroll-view>
    </div>
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
import LatestSongs from './latest-songs.vue'

export default {
  name: 'Recommend',
  components: { ScrollView, Banner, Personalized, LatestSongs },
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
      const list = data.result.map(item => {
        let singer = ''
        for (let i = 0; i < item.song.artists.length; i++) {
          if (i === 0) {
            singer = item.song.artists[i].name
          } else {
            singer += ' - ' + item.song.artists[i].name
          }
        }
        return {
          id: item.id,
          name: item.name,
          picUrl: item.song.album.picUrl,
          singer
        }
      })
      this.songs = list
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
@import '@/assets/styles/transition';

.recommend {
  position: fixed;
  top: 184px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .recommend-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
