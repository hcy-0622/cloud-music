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

export const getTopListDetail = () => new Promise((resolve, reject) => {
  const category = {
    officialList: [
      { name: '飙升榜', id: 3 },
      { name: '新歌榜', id: 0 },
      { name: '原创榜', id: 2 },
      { name: '热歌榜', id: 1 }
      // { name: '歌手榜', id: 4 }
    ],
    globalList: [
      { name: '美国Billboard榜', id: 6 },
      { name: 'UK排行榜周榜', id: 5 },
      { name: 'Beatport全球电子舞曲榜', id: 21 },
      { name: '日本Oricon榜', id: 10 }
      // { name: 'iTunes榜', id: 8 },
      // { name: '英国Q杂志中文版周榜', id: 29 }
    ],
    // recList: [
    //   { name: '云音乐说唱榜', id: 23 },
    //   { name: '云音乐电音榜', id: 25 },
    //   { name: '云音乐欧美新歌榜', id: 32 },
    //   { name: '抖音排行榜', id: 26 },
    //   { name: '云音乐ACG音乐榜', id: 22 },
    //   { name: '云音乐古典音乐榜', id: 24 }
    // ],
    // otherList: [
    //   { name: 'KTV唛榜', id: 7 },
    //   { name: '法国 NRJ Vos Hits 周榜', id: 19 },
    //   { name: '新声榜', id: 27 },
    //   { name: '云音乐韩语榜', id: 28 },
    //   { name: '电竞音乐榜', id: 30 },
    //   { name: '云音乐欧美热歌榜', id: 31 }
    // ],
    titles: {
      officialList: '官方榜',
      globalList: '全球榜'
      // recList: '推荐榜',
      // otherList: '更多榜单'
    }
  }
  request.get('toplist/detail').then(res => {
    const { list, artistToplist, rewardToplist } = res
    list.forEach(item => {
      let flag = false
      const keys = Object.keys(category)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        for (let j = 0; j < category[key].length; j++) {
          if (category[key][j].name === item.name) {
            category[key][j].rank = item
            flag = true
            break
          }
        }
        if (flag) break
      }
    })
    category.officialList.push({
      name: artistToplist.name,
      id: artistToplist.position,
      rank: {
        ...artistToplist,
        coverImgUrl: artistToplist.coverUrl,
        tracks: artistToplist.artists
        // artists: undefined,
        // coverUrl: undefined
      }
    })
    category.officialList.push({
      name: rewardToplist.name,
      id: rewardToplist.position,
      rank: {
        ...rewardToplist,
        coverImgUrl: rewardToplist.coverUrl,
        tracks: rewardToplist.songs.map(item => ({
          ...item,
          first: item.name,
          second: item.artists.reduce((prev, curr) => prev + ' - ' + curr.name, '')
        }))
        // songs: undefined,
        // coverUrl: undefined
      }
    })
    resolve(category)
  }).catch(e => reject(e))
})
