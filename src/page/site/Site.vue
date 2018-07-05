<template>
  <div>
    <head-top :go-back="true">
      <router-link :to="'/home'" slot="siteTitle" class="siteTitle">
        <span>{{siteTitle}}</span>
      </router-link>
    </head-top>

    <div class="banner">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,key) of foodTypes" :key="key">
            <router-link class="link-to-food" :to="{path: '/foodTypes',query:{geohash,title:foodItem.title}}" v-for="foodItem in item" :key="foodItem.id">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url" alt="">
                <figcaption class="ellipsis">{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="shop-list-container">
      <h4>附近商铺</h4>
      <!-- <div class="shop-list"> -->
        <shop-list v-if="geohash" :geohash="geohash"></shop-list>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import HeadTop from '../../components/header/Head'
import {getSiteAddress, siteFoodTypes} from '../../service/getData'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import ShopList from '../../components/common/ShopList'

export default {
  data () {
    return {
      geohash: '', // city页面传过来的地址geohash信息
      siteTitle: '', // 页面头部标题
      foodTypes: [], // 食品分类列表
      imgBaseUrl: 'https://fuss10.elemecdn.com' // 图片域名地址
    }
  },
  async beforeMount () {
    this.geohash = this.$route.query.geohash
    let res = await getSiteAddress(this.geohash)
    this.siteTitle = res.name
  },
  mounted () {
    siteFoodTypes(this.geohash).then(res => {
      let resLen = res.length
      let resArr = [...res]
      let foodArr = []
      for (let i = 0, j = 0; i < resLen; i += 8, j++) {
        foodArr[j] = resArr.splice(0, 8)
      }
      this.foodTypes = foodArr
    }).then(() => {
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination'
        }
      })
    })
  },
  components: {
    HeadTop,
    ShopList
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
  .siteTitle {
    flex: 1;
    text-align: center;
    font-size: .8rem;
    color: #fff;

    span{
      color:#fff;
    }
  }

  .banner{
    padding-top: 2.1rem;
  }
  .swiper-container {
    width: 100%;
    height: 10rem;
    background-color: $fc;

    figure {
      img {
        @include wh(1.8rem,1.8rem)
      }
      figcaption {
        font-size: .5rem;
        color: #666;
      }
    }
  }
  .swiper-slide{
    display: flex;
    flex-wrap: wrap;
    .link-to-food{
      width: 25%;
      text-align: center;
    }
  }

  .shop-list-container{
    margin-top: .4rem;
    background-color: $fc;

    h4 {
      padding-left: .4rem;
      color: #999;
      font: .55rem/1.6rem Microsoft YaHei;
    }
  }

</style>
