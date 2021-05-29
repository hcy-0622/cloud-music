import { getSongDetail, getSongLyric, getSongUrl } from '@/api'
import { parseLyric } from '@/utils'
import {
  DEL_SONG,
  SET_CURRENT_SONG_INDEX,
  SET_FULL_PLAYER,
  SET_IS_PLAYING,
  SET_LIST_PLAYER,
  SET_MINI_PLAYER,
  SET_PLAYER_CURRENT_TIME,
  SET_PLAY_MODE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC
} from './types'

export default {
  setFullPlayer({ commit }, flag) {
    commit(SET_FULL_PLAYER, flag)
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
  },
  async setSongDetail({ commit }, ids) {
    const idsStr = ids.join(',')
    const res = await getSongDetail({ ids: idsStr })
    const urlRes = await getSongUrl({ id: idsStr })
    const list = res.songs.map((song, idx) => {
      let singer = ''
      song.ar.forEach((a, idx) => {
        if (idx === 0) {
          singer = a.name
        } else {
          singer += ' - ' + a.name
        }
      })

      return {
        id: song.id,
        name: song.name,
        singer,
        picUrl: song.al.picUrl,
        url: urlRes.data[idx].url
      }
    })
    commit(SET_SONG_DETAIL, list)
  },
  async getSongLyric({ commit }, id) {
    const res = await getSongLyric({ id })
    if (!res.nolyric) {
      const lyric = parseLyric(res.lrc.lyric)
      commit(SET_SONG_LYRIC, lyric)
    }
  },
  delSong({ commit }, idx) {
    commit(DEL_SONG, idx)
  },
  setCurrentSongIndex({ commit }, idx) {
    commit(SET_CURRENT_SONG_INDEX, idx)
  },
  setPlayerCurrentTime({ commit }, time) {
    commit(SET_PLAYER_CURRENT_TIME, time)
  }
}
