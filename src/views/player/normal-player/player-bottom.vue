<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode"></div>
      <div class="prev"></div>
      <div class="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerBottom'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.player-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_small);
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      height: 10px;
      background: #fff;
      position: relative;
      margin: 0 10px;
      .progress-line {
        width: 50%;
        height: 100%;
        background: #ccc;
        .progress-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
  }
  .bottom-control {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      @include bg_img('../../../assets/images/loop');
    }
    .prev {
      @include bg_img('../../../assets/images/prev');
    }
    .play {
      @include bg_img('../../../assets/images/pause');
    }
    .next {
      @include bg_img('../../../assets/images/next');
    }
    .favorite {
      @include bg_img('../../../assets/images/un_favorite');
    }
  }
}
</style>
