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
      scrollbars: true,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })

    // 创建一个观察者对象
    const observer = new MutationObserver((mutationList, observer) => {
      console.log(this.iScroll.maxScrollY)
      this.iScroll.refresh()
    })
    const config = {
      childList: true,
      subtree: true,
      attrbuteFilter: ['height', 'offsetHieght']
    }
    // 观察者对象和需要观察的内容
    observer.observe(wrapperEl, config)
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
