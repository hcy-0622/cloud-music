import {
  DEL_SONG,
  SET_FULL_PLAYER,
  SET_IS_PLAYING,
  SET_LIST_PLAYER,
  SET_MINI_PLAYER,
  SET_PLAY_MODE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_CURRENT_SONG_INDEX
} from './types'

export default {
  [SET_FULL_PLAYER](state, flag) {
    state.isShowFullPlayer = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isisShowFullPlayer = false
      state.isShowListPlayer = false
    }
  },
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag
  },
  [SET_PLAY_MODE](state, flag) {
    state.playMode = flag
  },
  [SET_SONG_DETAIL](state, list) {
    state.songs = list
  },
  [SET_SONG_LYRIC](state, data) {
    state.currentSongLyric = data
  },
  [DEL_SONG](state, idx) {
    if (idx !== undefined) {
      state.songs.splice(idx, 1)
    } else {
      state.songs = []
    }
    if (idx < state.currentSongIndex) {
      state.currentSongIndex = state.currentSongIndex - 1
    }
    if (!state.songs.length) {
      state.isShowFullPlayer = false
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  [SET_CURRENT_SONG_INDEX](state, idx) {
    if (idx < 0) {
      idx = state.songs.length - 1
    } else if (idx > state.songs.length - 1) {
      idx = 0
    }
    state.currentSongIndex = idx
  }
}
