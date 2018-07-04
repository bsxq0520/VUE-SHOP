<template>
  <div>
    <ul v-if="shopListArr.length">
      <router-link class="list-item" :to="'/home'" tag="li" v-for="item of shopListArr" :key="item.id">
        <section>
          <img class="shop-img" :src="imgBaseUrl + item.image_path">
        </section>

        <section class="shop-content">
          <h5 class="shop-title">{{item.name}}</h5>
        </section>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {shopList} from '../../service/getData'
import {imgBaseUrl} from '../../config/env.js'
export default {
  data () {
    return {
      imgBaseUrl, // 图片头部地址
      shopListArr: [] // 商铺列表
    }
  },
  props: ['geohash'],
  components: {

  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      let latitude = this.geohash.split(',')[0]
      let longitude = this.geohash.split(',')[1]
      let res = await shopList(latitude, longitude)
      this.shopListArr = [...res]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
  .list-item {
    display: flex;
    padding: .6rem .4rem;
    border-bottom: 1px solid $bc;
  }
  .shop-img {
    display: block;
    margin-right: .4rem;
    @include wh(2.7rem,2.7rem);
  }

  .shop-content {
    .shop-title {
      width: 8.5rem;
      color: #333;
      padding-top: .01rem;
      font: .65rem/.65rem PingFangSC-Regular;
      font-weight: 700;
    }
  }

</style>
