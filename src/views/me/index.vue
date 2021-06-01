<template>
  <transition appear>
    <div class="me">
      <me-header :switchNum="switchNum" @switchItem="switchItem"></me-header>
      <me-bottom :switchNum="switchNum"></me-bottom>
    </div>
  </transition>
</template>

<script>
import MeHeader from './me-header.vue'
import MeBottom from './me-bottom.vue'

export default {
  components: { MeHeader, MeBottom },
  name: 'Me',
  data() {
    return {
      switchNum: 0
    }
  },
  methods: {
    switchItem(num) {
      this.switchNum = num
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.me {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  @include bg_sub_color();
}

.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.6s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.6s;
}
</style>
