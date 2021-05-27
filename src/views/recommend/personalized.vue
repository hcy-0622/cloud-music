<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="personalized-list">
      <div
        class="personalized-item"
        v-for="p of personalized"
        :key="p.id"
        @click="selectItem(p.id)"
      >
        <img v-lazy="p.picUrl" alt />
        <p>{{ p.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    personalized: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    selectItem(id) {
      this.$emit('select', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/mixins';

.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    @include bg_sub_color();
    h3 {
      font-weight: bold;
      @include font_size($font_large);
      @include font_color();
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .personalized-item {
      width: 200px;
      padding-bottom: 20px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      p {
        text-align: center;
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
      }
    }
  }
}
</style>
