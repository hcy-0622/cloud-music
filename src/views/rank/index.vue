<template>
  <div class="rank">
    <div class="rank-wrapper">
      <scroll-view>
        <ul>
          <li v-for="(v, k) of category.titles" :key="k">
            <h3 class="group-title">{{ v }}</h3>
            <ul class="normal-group" v-if="v === '官方榜'">
              <li
                v-for="obj of category[k]"
                :key="obj.rank.id"
                @click.stop="selectedItem(obj.rank.id)"
              >
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl" alt />
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-right">
                  <p
                    v-for="(s, i) of obj.rank.tracks"
                    :key="s.first"
                  >{{ i + 1 }}.{{ s.first }} - {{ s.second }}</p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li
                v-for="obj of category[k]"
                :key="obj.rank.id"
                @click.stop="selectedItem(obj.rank.id)"
              >
                <div class="rank-top">
                  <img v-lazy="obj.rank.coverImgUrl" alt />
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ obj.rank.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll-view>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopListDetail } from '@/api'
import scrollView from '@/components/scroll-view.vue'
import META_INFO from '../../../meta-info'

export default {
  name: 'Rank',
  metaInfo: META_INFO.rank,
  components: { scrollView },
  data() {
    return {
      category: {}
    }
  },
  created() {
    getTopListDetail().then(res => {
      this.category = res
    }).catch(e => console.error(e))
  },
  methods: {
    selectedItem(id) {
      if (id === undefined) {
        alert('糟糕 😢，无法获取到排行榜信息！')
        return
      }
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';
@import '@/assets/styles/transition';

.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper {
    position: fixed;
    top: 184px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-title {
      padding: 10px 20px;
      font-weight: bold;
      @include font_color();
      @include font_size($font_large);
    }
    .normal-group {
      li {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-left {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-right {
          margin-left: 20px;
          p {
            padding: 10px 0;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
      }
    }
    .other-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-bottom {
          width: 200px;
          @include no-wrap();
          p {
            padding: 10px 0;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
      }
    }
  }
}
</style>
