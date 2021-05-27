<template>
  <div class="detail-top">
    <div class="img container">
      <img :src="path" alt />
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
  }
}
</script>

<style lang="scss" scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
