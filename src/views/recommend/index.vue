<template>
  <div>
    <banner :banners="banners"></banner>
  </div>
</template>

<script>
import { getBanner } from '../../api'
import Banner from './banner'

export default {
  name: 'Recommend',
  components: { Banner },
  data() {
    return {
      banners: []
    }
  },
  created() {
    getBanner().then(data => {
      this.banners = data.banners
    }).catch(err => console.error(err))
  }
}
</script>

<style>
</style>
