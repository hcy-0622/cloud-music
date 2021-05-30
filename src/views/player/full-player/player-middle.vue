<template>
  <swiper class="banner" :options="swiperOptions">
    <swiper-slide class="cd">
      <div :class="['cd-wrapper', isPlaying ? 'active' : '']">
        <img :src="currentSong.picUrl" alt />
      </div>
      <p>{{ firstLyric }}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <scroll-view ref="sv">
        <ul>
          <li
            :class="{active: currentLineNum === Number(k)}"
            v-for="(v, k) of currentSongLyric"
            :key="k"
          >{{ v }}</li>
        </ul>
      </scroll-view>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ScrollView from '@/components/scroll-view.vue'

export default {
  name: 'PlayerMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: 0
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'currentSongLyric']),
    firstLyric() {
      const firstKey = Object.keys(this.currentSongLyric)[0]
      return this.currentSongLyric[firstKey]
    }
  },
  watch: {
    currentTime(curVal) {
      // 高亮歌词
      const lineNum = Math.floor(curVal)
      // 递归查找当前歌词
      this.currentLineNum = this.getActiveLineNum(lineNum)

      // 当前行数变化后滚动歌词
      const currentLyricTop = document.querySelector('li.active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      const sv = this.$refs.sv
      if (currentLyricTop > lyricHeight / 2) {
        sv.scrollTo(0, lyricHeight / 2 - currentLyricTop, 200)
      } else {
        sv.scrollTo(0, 0, 200)
      }
    },
    currentLyric(curVal, prevVal) {
      const keys = Object.keys(curVal)
      this.currentLineNum = keys[0]
    }
  },
  methods: {
    getActiveLineNum(lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentSongLyric[lineNum]
      if (!result) {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.banner {
  position: fixed;
  top: 150px;
  right: 0;
  bottom: 250px;
  left: 0;
  .cd {
    .cd-wrapper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid greenyellow;
      overflow: hidden;
      animation: sport 4s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
@import '@/assets/styles/mixins';

.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>
