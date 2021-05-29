export default {
  isShowFullPlayer(state) {
    return state.isShowFullPlayer
  },
  isShowMiniPlayer(state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer(state) {
    return state.isShowListPlayer
  },
  isPlaying(state) {
    return state.isPlaying
  },
  playMode(state) {
    return state.playMode
  },
  songs(state) {
    return state.songs
  },
  currentSong(state) {
    let song = { name: '', singer: '', picUrl: '' }
    if (state.songs.length) {
      song = state.songs[state.currentSongIndex]
    }
    return song
  },
  currentSongLyric(state) {
    return state.currentSongLyric
  },
  currentSongIndex(state) {
    return state.currentSongIndex
  }
}
