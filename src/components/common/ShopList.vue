<template>
  <div class="shop-list">
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

    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>

<script>
import {shopList} from '../../service/getData'
import {imgBaseUrl} from '../../config/env.js'
import Loading from './Loading'
export default {
  data () {
    return {
      showLoading: true, // 显示加载动画
      imgBaseUrl, // 图片头部地址
      shopListArr: [] // 商铺列表
    }
  },
  props: ['geohash', 'sortByType'],
  components: {
    Loading
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      let latitude = this.geohash.split(',')[0]
      let longitude = this.geohash.split(',')[1]
      let res = await shopList(latitude, longitude)
      this.showLoading = false
      this.shopListArr = [...res]
    },
    async refreshData () {
      this.showLoading = true
      let latitude = this.geohash.split(',')[0]
      let longitude = this.geohash.split(',')[1]
      let res = await shopList(latitude, longitude, this.sortByType)
      this.showLoading = false
      this.shopListArr = [...res]
    }
  },
  watch: {
    // 类型排序
    sortByType: function (params) {
      this.refreshData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

  .loading-enter-active, .loading-leave-active {
    transition: opacity 1s;
  }
  .loading-enter,.loading-leave-to {
    opacity: 0;
  }

  .shop-list {
    background-color: $fc;
  }
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
