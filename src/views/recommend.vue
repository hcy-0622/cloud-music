<template>
  <div>推荐</div>
</template>

<script>
import { getBanner } from '../api'

export default {
  name: 'Recommend',
  created() {
    getBanner().then(data => { console.log(data) }).catch(err => console.error(err))
  }
}
</script>

<style>
</style>
