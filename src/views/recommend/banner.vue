<template>
  <swiper class="banner" :options="swiperOptions" v-if="banners.length > 0">
    <swiper-slide class="banner-item" v-for="b of banners" :key="b.bannerId">
      <a :href="b.url">
        <img :src="b.pic" alt />
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Banner',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banners: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      swiperOptions: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.banner {
  .banner-item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import '../../assets/styles/mixins';

.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
