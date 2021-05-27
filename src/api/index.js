import request from './request'

export const getBanner = () => request.get('banner?type=2')
export const getPersonalized = () => request.get('personalized?limit=6')
export const getNewAlbum = () => request.get('album/newest')
export const getNewSong = () => request.get('personalized/newsong')
export const getPlayList = params => request.get('playlist/detail', params)
export const getAlbum = params => request.post('album', params)
