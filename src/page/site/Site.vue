<template>
  <div>
    <head-top :head-title="siteTitle"  :go-back="true">
      <router-link :to="'/home'" slot="site-title">
        <span>{{siteTitle}}</span>
      </router-link>
    </head-top>
  </div>
</template>

<script>
import HeadTop from '../../components/header/Head'
import {getSiteAddress} from '../../service/getData'
export default {
  data () {
    return {
      geohash: '', // city页面传过来的地址geohash信息
      siteTitle: '' // 页面头部标题
    }
  },
  async beforeMount () {
    this.geohash = this.$route.query.geohash
    let res = await getSiteAddress(this.geohash)
    this.siteTitle = res.name
  },
  components: {
    HeadTop
  }
}
</script>

<style>

</style>
