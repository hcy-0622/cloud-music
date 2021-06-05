<template>
  <my-header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <ul slot="center" class="header-title">
      <li :class="{active: switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
      <li :class="{active: switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
    </ul>
    <div slot="right" class="header-right"></div>
  </my-header>
</template>

<script>
import Header from '@/components/header.vue'

export default {
  components: { MyHeader: Header },
  name: 'MeHeader',
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    switchItem(num) {
      this.$emit('switchItem', num)
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    height: 60px;
    margin-top: 20px;
    @include font_size($font_medium);
    @include no_wrap();
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
