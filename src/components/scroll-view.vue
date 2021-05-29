<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
  name: 'ScrollView',
  mounted() {
    const wrapperEl = this.$refs.wrapper
    this.scroll = new BetterScroll(wrapperEl, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      // 解决安卓触摸无效的问题
      click: true,
      tap: true
    })
    const _this = this
    this.scroll.on('scroll', function () {
      _this.$emit('scroll', this.y)
    })

    // 创建一个观察者对象
    const observer = new MutationObserver((mutationList, observer) => {
      // console.log('Mutation observer: ', this.iScroll.maxScrollY, mutationList, observer)
      this.scroll.refresh()
    })
    // 观察者的配置项
    const config = {
      childList: true,
      subtree: true,
      attrbuteFilter: ['height', 'offsetHieght']
    }
    // 观察者对象和需要观察的内容
    observer.observe(wrapperEl, config)
  }
  // methods: {
  //   scrolling(fn) {
  //     this.scroll.on('scroll', function () {
  //       fn(this.y)
  //     })
  //   }
  // }
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
