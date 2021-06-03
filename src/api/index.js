import request from './request'

export const getBanner = () => request.get('banner?type=2')
export const getPersonalized = () => request.get('personalized?limit=6')
export const getNewAlbum = () => request.get('album/newest')
export const getNewSong = () => request.get('personalized/newsong')
export const getPlayList = params => request.get('playlist/detail', params)
export const getAlbum = params => request.get('album', params)
export const getSongDetail = (params) => request.get('song/detail', params)
export const getSongLyric = (params) => request.get('lyric', params)
export const getSongUrl = (params) => request.get('song/url', params)
export const getArtistsSong = (params) => request.get('artists', params)

export const getHotArtists = () => new Promise((resolve, reject) => {
  request.get('top/artists?offset=0&limit=10').then(res => resolve(res.artists)).catch(e => reject(e))
})

/**
 * type { -1.全部、1.男歌手、2.女歌手、3.乐队 }
 * area { -1.全部、7.华语、8.日本、16.韩国、96.欧美、0.其它 }
 * @param {*} letter
 * @returns
 */
export const getLetterArtists = (letter) => new Promise((resolve, reject) => {
  const lettersArtists = []
  request.all([
    request.get(`artist/list?offset=0&limit=10&type=2&area=-1&initial=${letter}`)
    // request.get(`artist/list?offset=0&limit=5&cat=1002&initial=${letter}`),
    // request.get(`artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
    // request.get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
    // request.get(`artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
    // request.get(`artist/list?offset=0&limit=5&cat=2003&initial=${letter}`),
    // request.get(`artist/list?offset=0&limit=5&cat=6001&initial=${letter}`),
    // request.get(`artist/list?offset=0&limit=5&cat=6002&initial=${letter}`),
    // request.get(`artist/list?offset=0&limit=5&cat=6003&initial=${letter}`)
  ]).then(res => {
    res.forEach(item => {
      lettersArtists.push(...item.artists)
    })
    resolve(lettersArtists)
  }).catch(e => reject(e))
})

export const getAllArtists = () => new Promise((resolve, reject) => {
  const keys = ['热']
  const list = [getHotArtists()]
  for (let i = 65; i < 91; i++) {
    const char = String.fromCharCode(i)
    keys.push(char)
    list.push(getLetterArtists(char.toLowerCase()))
  }
  request.all(list)
    .then(res => resolve(({ keys, list: res })))
    .catch(e => reject(e))
})

getAllArtists()
