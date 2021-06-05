<template>
  <div class="singer">
    <div class="singer-wrapper">
      <scroll-view ref="sv" @scroll="scrolling">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(v, i) of list" :key="i" ref="group">
            <h2 class="group-title">{{ keys[i] }}</h2>
            <ul>
              <li
                class="group-item"
                v-for="s of list[i]"
                :key="s.id"
                @click.stop="switchSinger(s.id)"
              >
                <img v-lazy="s.picUrl" alt />
                <p>{{ s.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </scroll-view>
      <ul class="list-keys">
        <li
          v-for="(key, i) of keys"
          :key="key"
          :data-index="i"
          :class="{active: currentIndex === i}"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
        >{{ key }}</li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{ fixTitle }}</div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '@/api'
import ScrollView from '@/components/scroll-view.vue'
import META_INFO from '../../../meta-info'

export default {
  name: 'Singer',
  metaInfo: META_INFO.singer,
  components: { ScrollView },
  data() {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      startOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  created() {
    getAllArtists().then(res => {
      this.keys = res.keys
      this.list = res.list
    }).catch(e => console.error(e))
  },
  computed: {
    fixTitle() {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  watch: {
    list(curVal) {
      this.$nextTick(() => {
        this.groupsTop = this.$refs.group.map(g => g.offsetTop)
      })
    },
    fixTitle() {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  },
  methods: {
    keyDown(i) {
      this.currentIndex = i
      const offsetY = this.groupsTop[i]
      this.$refs.sv.scrollTo(0, -offsetY)
    },
    touchstart(e) {
      const idx = Number(e.target.dataset.index)
      this.keyDown(idx)
      this.startOffsetY = e.touches[0].pageY
    },
    touchmove(e) {
      this.moveOffsetY = e.touches[0].pageY
      const y = (this.moveOffsetY - this.startOffsetY) / e.target.offsetHeight
      let idx = Number(e.target.dataset.index) + Math.floor(y)
      if (idx < 0) {
        idx = 0
      } else if (idx > this.keys.length - 1) {
        idx = this.keys.length - 1
      }
      this.keyDown(idx)
    },
    scrolling(y) {
      this.scrollY = y
      // 起始
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 中间
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        const prevTop = this.groupsTop[i]
        const nextTop = this.groupsTop[i + 1]
        if (-y >= prevTop && -y <= nextTop) {
          this.currentIndex = i

          // 推进效果逻辑
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 最后
      this.currentIndex = this.groupsTop.length - 1
    },
    switchSinger(id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';
@import '@/assets/styles/transition';

.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper {
    position: fixed;
    top: 184px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper {
      .list-group {
        .group-title {
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item {
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p {
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys {
      position: fixed;
      right: 10px;
      top: 60%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        padding: 3px 0;
        @include font_color();
        @include font_size($font_medium_s);
        &.active {
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      color: #fff;
      @include font_size($font_medium);
      @include bg_color();
    }
  }
}
</style>
