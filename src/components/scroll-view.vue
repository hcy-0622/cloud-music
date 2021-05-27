<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'

export default {
  name: 'ScrollView',
  mounted() {
    const wrapperEl = this.$refs.wrapper
    this.iScroll = new IScroll(wrapperEl, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })

    // 创建一个观察者对象
    const observer = new MutationObserver((mutationList, observer) => {
      console.log('Mutation observer: ', this.iScroll.maxScrollY, mutationList, observer)
      this.iScroll.refresh()
    })
    const config = {
      childList: true,
      subtree: true,
      attrbuteFilter: ['height', 'offsetHieght']
    }
    // 观察者对象和需要观察的内容
    observer.observe(wrapperEl, config)
  },
  methods: {
    scrolling(fn) {
      this.iScroll.on('scroll', function () {
        fn(this.y)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
