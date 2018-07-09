<template>
  <div class="shop-container">
    <header></header>

    <section class="choose-type">
      <div>
        <span :class="{active: changeShowType == 'food'}">商品</span>
      </div>
      <div>
        <span :class="{active: changeShowType == 'rating'}">评价</span>
      </div>
    </section>

    <section class="food-container" v-show="changeShowType =='food'">
      <div class="menu-container">
        <div id="menu-nav" class="menu-left">
          <ul>
            <li class="menu-left-li" :class="{active:index==0}" v-for="(item, index) of foodTypes" :key="index">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>

        <div class="menu-right">
          <ul>
            <li v-for="(item, index) of foodTypes" :key="index">
              <header class="foods-header">{{item.description}}</header>
              <section class="foods-detail" v-for="(foods,foodsIndex) of item.foods" :key="foodsIndex">
                <section>
                  <img class="foods-url" :src="imgBaseUrl + foods.image_path">
                </section>
                <section class="foods-content">
                  <h3>{{foods.name}}</h3>
                  <p>{{foods.description}}</p>
                  <p>月售{{foods.month_sales}}份</p>
                  <div>
                    <section>
                      <span>¥</span>
                      <span>{{foods.specfoods[0].price}}</span>
                      <span v-if="foods.specifications.length">起</span>
                    </section>
                  </div>
                </section>
              </section>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import {shopFoodTypes} from '../../service/getData'
import {getImgPath} from '../../components/common/mixin'
import {imgBaseUrl} from '../../config/env'
import Loading from '../../components/common/Loading'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      showLoading: true, // 加载动画
      changeShowType: 'food', // 默认显示类型
      foodTypes: [], // 食品分类列表
      shopId: null, // 商铺id
      foodScroll: null, // 食品列表scroll
      imgBaseUrl
    }
  },
  created () {
    this.shopId = this.$route.query.id
  },
  mounted () {
    this.initData()
  },
  components: {
    Loading
  },
  mixins: [getImgPath],
  methods: {
    async initData (params) {
      // 获取商铺食品分类列表
      this.foodTypes = await shopFoodTypes(this.shopId)
      this.hideLoading()
    },
    hideLoading () {
      this.showLoading = false
    },
    getFoodTypesHeight () {
      this.listenScroll()
    },
    listenScroll (el) {
      new BScroll('#menu-nav', {
        click: true
      })

      // this.foodScroll = new BScroll(el, {
      //   probeType: 3,
      //   deceleration: 0.001,
      //   bounce: false,
      //   swipeTime: 2000,
      //   click: true
      // })
    }
  },
  watch: {
    showLoading: function (value) {
      if (!value) {
        this.$nextTick(() => {
          this.getFoodTypesHeight()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
  .shop-container{
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    header {
      position: relative;
    }
    .food-container{
      display: flex;
      flex:1;
    }
  }
  .choose-type {
    display: flex;
    padding: .3rem 0 .6rem;
    background-color: $fc;
    border-bottom: 1px solid $bc;
    >div {
      flex: 1;
      text-align: center;
      span{
        padding: .2rem 0;
        font-size: .6rem;
        border-bottom: .12rem solid $fc;
        &.active{
          color: $blue;
          border-bottom-color: $blue;
        }
      }
    }
  }
  .menu-container {
    display: flex;
    overflow-y: hidden;
    .menu-left{
      width: 3.8rem;
      .menu-left-li{
        padding: .7rem .3rem;
        border-bottom: .025rem solid $bc;
        &.active{
          background-color: $fc;
          border-left: .15rem solid $blue;
        }
        span{
          color: #666;
          font-size: .6rem;
        }
      }
    }
    .menu-right {
      .foods-detail{
        display: flex;
        padding: .6rem .4rem;
        background-color: $fc;
        border-bottom: .025rem solid $bc;
        .foods-url{
          display: block;
          margin-right: .4rem;
          @include wh(2rem,2rem);
        }
        .foods-content{
          h3{
            font-size: .7rem;
          }
          p {
            font-size: .3rem;
          }
        }
      }
    }
  }
</style>
