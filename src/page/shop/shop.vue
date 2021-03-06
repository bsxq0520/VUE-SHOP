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
        <div id="menu-nav" class="menu-left" ref="menuList">
          <ul>
            <li
            class="menu-left-li"
            :class="{active:index==menuIndex}"
            v-for="(item, index) of menuList"
            :key="index"
            @click="chooseMenu(index)">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>

        <div class="menu-right" ref="menuFoodList">
          <ul>
            <li v-for="(item, index) of menuList" :key="index" ref="foodList">
              <header class="foods-header">
                <strong>{{item.name}}</strong>
                <span>{{item.description}}</span>
              </header>
              <section class="foods-detail" v-for="(foods,foodsIndex) of item.foods" :key="foodsIndex">
                <div class="foods-detail-item">
                  <section class="foods-pic">
                    <img class="foods-url" :src="imgBaseUrl + foods.image_path">
                  </section>
                  <section class="foods-content">
                    <h3>{{foods.name}}</h3>
                    <p>{{foods.description}}</p>
                    <p>月售{{foods.month_sales}}份</p>
                    <div class="foods-sub">
                      <section class="food-price">
                        <span>¥</span>
                        <span>{{foods.specfoods[0].price}}</span>
                        <span v-if="foods.specifications.length">起</span>
                      </section>

                      <buy-cart :foods="foods" :shopId="shopId" @showMoveDot="showMoveDotFun"></buy-cart>
                    </div>
                  </section>
                </div>
              </section>
            </li>
          </ul>
        </div>
      </div>

      <div class="shop-cart-container">
        <section class="cart-ico-num">
          <div class="cart-ico-container" :class="{active:totalNum,moveIncart:isIncart}" ref="cartContainer">
            <svg class="cart-ico">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
            </svg>
            <span class="cart-totalNum" v-if="totalNum">{{totalNum}}</span>
          </div>

          <div class="cart-num">
            <div>¥{{totalPrice}}</div>
            <div>配送费¥20</div>
          </div>
        </section>
        <section class="payFor"></section>
      </div>
    </section>

    <transition
    appear
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    v-for="(item,index) of showMoveDot"
    :key="index">
      <span class="moveDot" v-if="item">
        <svg class="move_liner">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
        </svg>
      </span>
    </transition>

    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import {foodMenu} from '../../service/getData'
import {getImgPath} from '../../components/common/mixin'
import {imgBaseUrl} from '../../config/env'
import BuyCart from '../../components/common/BuyCart'
import Loading from '../../components/common/Loading'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      showLoading: true, // 加载动画
      changeShowType: 'food', // 默认显示类型
      menuIndex: 0, // 已选菜单索引
      menuIndexChange: true, // 解决选中index时，scroll监听事件重复判断设置index的bug
      menuList: [], // 食品列表
      shopListTop: [], // 商品列表的高度集合
      shopId: null, // 商铺id
      menuScroll: null, //
      foodScroll: null, // 食品列表scroll
      imgBaseUrl,
      dotLeft: 0, // 当前小球在网页中的绝对left值
      dotBottom: 0, // 当前小球在网页中的绝对bottom值
      showMoveDot: [], // 控制下落的小圆点显示隐藏
      windowHeight: null, // 屏幕的高度
      cartFoodList: [], // 购物车商品列表
      totalPrice: 0, // 购物车商品总价
      isIncart: false // 小圆球是否滑入购物车
    }
  },
  computed: {
    ...mapState([
      'cartList'
    ]),
    // 获取当前商铺购物车信息
    shopCart () {
      return {...this.cartList[this.shopId]}
    },
    // 购物车中商品总数量
    totalNum () {
      let num = 0
      this.cartFoodList.forEach(item => {
        num += item.num
      })
      return num
    }
  },
  created () {
    this.shopId = this.$route.query.id
  },
  mounted () {
    this.initData()
    this.windowHeight = window.innerHeight
  },
  components: {
    Loading,
    BuyCart
  },
  mixins: [getImgPath],
  methods: {
    async initData (params) {
      // 获取商铺食品列表
      this.menuList = await foodMenu(this.shopId)
      this.hideLoading()
    },
    hideLoading () {
      this.showLoading = false
    },
    getFoodListHeight () {
      const listContainer = this.$refs.menuFoodList
      const listArr = Array.from(listContainer.children[0].children)
      listArr.forEach((item, index) => {
        this.shopListTop[index] = item.offsetTop
      })
      this.listenScroll(listContainer)
    },
    listenScroll (el) {
      const menuScroll = new BScroll('#menu-nav', {
        click: true
      })

      this.foodScroll = new BScroll(el, {
        probeType: 3,
        deceleration: 0.001,
        bounce: false,
        swipeTime: 2000,
        click: true
      })

      this.foodScroll.on('scroll', (pos) => {
        if (!this.$refs.menuList) {
          return
        }
        this.shopListTop.forEach((item, index) => {
          if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            this.menuIndex = index
            const menuList = this.$refs.menuList.querySelectorAll('.active')
            const el = menuList[0]
            menuScroll.scrollToElement(el, 800, 0, true)
          }
        })
      })
    },
    // 点击切换左侧列表标题，主列表定位到相应位置
    chooseMenu (index) {
      this.menuIndex = index
      this.menuIndexChange = false
      this.foodScroll.scrollTo(0, -this.shopListTop[index], 400)
      this.foodScroll.on('scrollEnd', () => {
        this.menuIndexChange = true
      })
    },
    // 显示下落圆球
    showMoveDotFun (showMoveDot, dotLeft, dotBottom) {
      this.dotLeft = dotLeft
      this.dotBottom = dotBottom
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot]
    },
    beforeEnter (el) {
      el.style.transform = `translate3d(0,${23 + this.dotBottom - this.windowHeight}px,0)`
      el.children[0].style.transform = `translate3d(${this.dotLeft - 26}px,0,0)`
      el.children[0].style.opacity = 0
    },
    afterEnter (el) {
      el.style.transform = `translate3d(0,0,0)`
      el.style.transition = `transform .55s cubic-bezier(0.3, -0.25, 0.7, 0)`
      el.children[0].style.transform = `translate3d(0,0,0)`
      el.children[0].style.transition = `transform .55s linear`
      el.children[0].style.opacity = 1
      el.children[0].addEventListener('transitionend', () => {
        this.listenInCart()
      })
    },
    initCategoryNum () {
      let cartFoodNum = 0
      this.cartFoodList = []
      this.totalPrice = 0
      this.menuList.forEach((item, index) => {
        if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
          Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemId => {
            Object.keys(this.shopCart[item.foods[0].category_id][itemId]).forEach(foodId => {
              let foodItem = this.shopCart[item.foods[0].category_id][itemId][foodId]
              if (item.type === 1) {
                this.totalPrice += foodItem.num * foodItem.price
                if (foodItem.num > 0) {
                  this.cartFoodList[cartFoodNum] = {}
                  this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id
                  this.cartFoodList[cartFoodNum].item_id = itemId
                  this.cartFoodList[cartFoodNum].food_id = foodId
                  this.cartFoodList[cartFoodNum].num = foodItem.num
                  this.cartFoodList[cartFoodNum].price = foodItem.price
                  this.cartFoodList[cartFoodNum].name = foodItem.name
                  this.cartFoodList[cartFoodNum].specs = foodItem.specs
                  cartFoodNum++
                }
              }
            })
          })
        }
        this.totalPrice = Number(this.totalPrice).toFixed(2)
      })
    },
    // 监听小球是否进入购物车
    listenInCart () {
      if (!this.isIncart) {
        this.isIncart = true
        this.$refs.cartContainer.addEventListener('animationend', () => {
          this.isIncart = false
        })
      }
    }
  },
  watch: {
    showLoading: function (value) {
      if (!value) {
        this.$nextTick(() => {
          this.getFoodListHeight()
          this.initCategoryNum()
        })
      }
    },
    shopCart () {
      this.initCategoryNum()
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
      padding-bottom: 2rem;
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
        position: relative;
        padding: .7rem .3rem;
        border-bottom: .025rem solid $bc;
        border-left: .15rem solid #f8f8f8;
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
      position: relative;
      overflow-y: auto;
      .foods-header{
        padding: .4rem;
        strong {
          font-size: .7rem;
          color: #666;
        }
        span {
          font-size: .5rem;
          color: #999;
        }
      }
      .foods-detail{
        position: relative;
        overflow: hidden;
        padding: .6rem .4rem;
        background-color: $fc;
        border-bottom: .025rem solid $bc;

        .foods-detail-item{
          display: flex;
          .foods-content{
            flex: auto;
            h3{
              font-size: .7rem;
            }
            p {
              font-size: .3rem;
            }
            .foods-sub{
              display: flex;
              justify-content: space-between;
              align-items: center;

              .food-price{
                span{
                  font-size: .5rem;
                }
              }
            }
          }
        }

        .foods-url{
          display: block;
          margin-right: .4rem;
          @include wh(2rem,2rem);
        }

      }
    }
  }

  .shop-cart-container{
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    @include wh(100%,2rem);
    background-color: #3d3d3f;

    .cart-ico-num{
      flex: auto;

      .cart-ico-container{
        position: absolute;
        left: .5rem;
        top: -.7rem;
        display: flex;
        padding: .4rem;
        background-color: #3d3d3f;
        border-radius: 50%;
        border: 0.18rem solid #444;
        z-index: 10;

        &.active{
          background-color: #3190e8;
        }
        &.moveIncart {
          animation: moveIncart .5s ease-in-out;
        }

        .cart-ico{
          @include wh(1.2rem,1.2rem);
        }
        .cart-totalNum{
          position: absolute;
          top: -.25rem;
          right: -.25rem;
          min-width: .7rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .5rem;
          color: #fff;
          text-align: center;
          background-color: #ff461d;
          border-radius: 50%;
          border: 0.025rem solid #ff461d;
        }
      }

      .cart-num{
        margin-left: 3.5rem;
        padding: .1rem 0;
        div {
          color: #fff;

          &:nth-of-type(1) {
            font-size: .8rem;
            font-weight: 700;
          }
          &:nth-of-type(2){
            font-size: .4rem;
          }
        }
      }
    }
    .payFor{
      @include wh(5rem,100%);
      background-color: #535356;
    }
  }
  .moveDot {
    position: fixed;
    left: 26px;
    bottom: 16px;

    svg {
      @include wh(.9rem,.9rem);
      fill: #3190e8
    }
  }

  @keyframes moveIncart {
    0%   { transform: scale(1) }
    25%  { transform: scale(.8) }
    50%  { transform: scale(1.1) }
    75%  { transform: scale(.9) }
    100% { transform: scale(1) }
  }
</style>
