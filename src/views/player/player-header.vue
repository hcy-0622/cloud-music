<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="header-title">
      <h3>演员</h3>
      <p>薛之谦</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'PlayerHeader'
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    @include bg_img('../../assets/images/down');
  }
  /* .header-right {
    @include bg_img('../../assets/images/more');
  } */
  .header-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    @include font_size($font_medium);
    @include no_wrap();
  }
}
</style>
