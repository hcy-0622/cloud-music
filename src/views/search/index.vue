<template>
  <div class="search">
    <div class="search-box">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt
      />
      <input v-model="keywords" v-throttle="search" type="text" placeholder="搜索歌曲、歌手、专辑" />
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <scroll-view>
        <ul>
          <li v-for="s of songs" :key="s.id" @click.stop="selectMusic(s.id)">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt
            />
            <p>{{ s.name }} - {{ s.artists[0].name }}</p>
          </li>
        </ul>
      </scroll-view>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="h of hots" :key="h.first" @click.stop="selectedHot(h.first)">{{ h.first }}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="v of searchHistory" :key="v">
        <div class="history-left" @click.stop="selectedHot(v)">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+"
            alt
          />
          <p>{{ v }}</p>
        </div>
        <div class="history-right">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4="
            alt
            @click.stop="delHistory(v)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import scrollView from '@/components/scroll-view.vue'
import { getSearchHot, getSearchList } from '@/api'
import { SEARCH_HISTORY_KEY } from '@/constants'
import META_INFO from '../../../meta-info'

export default {
  name: 'Search',
  metaInfo: META_INFO.search,
  components: { scrollView },
  directives: {
    throttle: {
      inserted(el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', () => {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(() => {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  data() {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: []
    }
  },
  created() {
    getSearchHot().then(res => {
      this.hots = res.result.hots
    }).catch(e => console.error(e))
    const searchHistory = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (searchHistory !== undefined && searchHistory !== null) {
      this.searchHistory = JSON.parse(searchHistory)
    }
  },
  methods: {
    ...mapActions([
      'setFullPlayer',
      'setSongDetail'
    ]),
    search() {
      getSearchList({ keywords: this.keywords }).then(res => {
        this.songs = res.result.songs
      }).catch(e => console.error(e))
    },
    selectMusic(id) {
      this.setFullPlayer(true)
      this.setSongDetail([id])
      if (!this.searchHistory.includes(this.keywords)) {
        this.searchHistory.push(this.keywords)
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(this.searchHistory))
        this.keywords = ''
      }
    },
    selectedHot(val) {
      this.keywords = val
      this.search()
    },
    delHistory(val) {
      this.searchHistory = this.searchHistory.filter(v => v !== val)
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(this.searchHistory))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.search {
  position: fixed;
  top: 184px;
  right: 0;
  bottom: 0;
  left: 0;
  @include bg_sub_color();
  .search-box {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebecec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    img {
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input {
      border: none;
      outline: none;
      background: transparent;
      height: 60px;
      margin-left: 20px;
      @include font_size($font_medium);
    }
  }
  .search-suggest {
    position: fixed;
    top: 300px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    @include bg_sub_color();
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  .search-hot {
    h3 {
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 60px;
        line-height: 60px;
        border: 1px solid #000;
        border-radius: 30px;
        padding: 0 20px;
        margin: 10px 20px;
        @include font_color();
        @include font_size($font_medium_s);
      }
    }
  }
  .search-history {
    margin-top: 20px;
    li {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .history-left {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .history-right {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
