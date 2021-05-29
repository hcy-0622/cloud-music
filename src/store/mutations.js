import {
  SET_FULL_SCREEN,
  SET_IS_PLAYING,
  SET_LIST_PLAYER,
  SET_MINI_PLAYER,
  SET_PLAY_MODE

} from './mutations-types'

export default {
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag
  },
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag
  },
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag
  },
  [SET_PLAY_MODE](state, flag) {
    state.playMode = flag
  }
}
