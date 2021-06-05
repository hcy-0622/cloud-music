<template>
  <my-header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{ title }}</p>
    <div slot="right" class="header-right"></div>
  </my-header>
</template>

<script>
import Header from '@/components/header.vue'

export default {
  components: { MyHeader: Header },
  name: 'DetailHeader',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.header {
  .header-left {
    @include bg_img('../../assets/images/back');
  }
  .header-right {
    @include bg_img('../../assets/images/more');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no_wrap();
  }
}
</style>
