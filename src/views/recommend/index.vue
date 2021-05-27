<template>
  <div>
    <banner :banners="banners"></banner>
    <personalized title="推荐歌单" :personalized="personalized"></personalized>
    <personalized title="最新专辑" :personalized="albums"></personalized>
    <song-list :songs="songs"></song-list>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../../api'
import Banner from './banner'
import Personalized from './personalized'
import SongList from './song-list'

export default {
  name: 'Recommend',
  components: { Banner, Personalized, SongList },
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
  }
}
</script>

<style>
</style>
