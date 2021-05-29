import { PLAY_MODE } from '@/constants'

export default {
  isFullScreen: false, // 默认播放器显示显隐
  isShowMiniPlayer: false, // 迷你播放器显隐
  isShowListPlayer: false,
  isPlaying: false, // 是否正在播放
  playMode: PLAY_MODE.loop // 播放模式
}
