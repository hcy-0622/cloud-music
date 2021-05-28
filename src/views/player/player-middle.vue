<template>
  <swiper class="banner" :options="swiperOptions">
    <swiper-slide class="cd">
      <div class="cd-wrapper">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F15%2F20150915135644_dBiyk.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624769894&t=fc450cb32846a4c76bb9d3dcc4e80312"
          alt
        />
      </div>
      <p>阿三哥佳士科技干哈就是个</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <scroll-view>
        <ul>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
          <li>我是一句歌词</li>
        </ul>
      </scroll-view>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

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
        padding-bottom: 100px;
      }
    }
  }
}
</style>
<style lang="scss">
@import '../../assets/styles/mixins';

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
