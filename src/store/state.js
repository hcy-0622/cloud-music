import { PLAY_MODE } from '@/constants'

// 后期进行数据结构的优化
export default {
  isShowFullPlayer: false, // 默认播放器显示显隐
  isShowMiniPlayer: false, // 迷你播放器显隐
  isShowListPlayer: false, // 列表播放器显隐
  isPlaying: false, // 是否正在播放
  playMode: PLAY_MODE.loop, // 播放模式
  songs: [], // 播放列表中的歌曲
  currentSong: {}, // 当前播放的歌曲
  currentSongLyric: {},
  currentSongIndex: 0, // 当前播放歌曲的索引
  playerCurrentTime: 0 // 播放器当前时间
}
