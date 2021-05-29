import { SET_FULL_SCREEN, SET_IS_PLAYING, SET_LIST_PLAYER, SET_MINI_PLAYER, SET_PLAY_MODE } from './mutations-types'

export default {
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setPlayMode({ commit }, flag) {
    commit(SET_PLAY_MODE, flag)
  }
}
