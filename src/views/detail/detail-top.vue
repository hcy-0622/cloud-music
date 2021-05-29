<template>
  <div class="detail-top">
    <div class="img-container">
      <img :src="path" alt />
      <div class="mask" :style="{ opacity: maskOpacity }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      maskOpacity: 0
    }
  },
  methods: {
    changeMask(val) {
      this.maskOpacity = val
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    width: 100%;
    height: 100%;
  }
}
</style>
