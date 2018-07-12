<template>
  <div class="cart-container">
    <section class="cart-content" v-if="!foods.specifications.length">
      <transition name="slideToLeft">
        <svg v-if="foodNum">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
        </svg>
      </transition>

      <span class="cart-num" v-if="foodNum">{{foodNum}}</span>
      <svg @touchstart="addToCart(foods.category_id,foods.item_id,foods.specfoods[0].food_id,foods.specfoods[0].name,foods.specfoods[0].price,$event)">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
      </svg>
    </section>
    <section v-else></section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      showMoveDot: [] // 控制下落的小圆点显示隐藏

    }
  },
  props: ['foods', 'shopId'],
  components: {

  },
  computed: {
    ...mapState([
      'cartList'
    ]),
    // 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
    shopCart () {
      return Object.assign({}, this.cartList[this.shopId])
    },
    foodNum () {
      let categoryID = this.foods.category_id
      let itemID = this.foods.item_id
      if (this.shopCart && this.shopCart[categoryID] && this.shopCart[categoryID][itemID]) {
        let num = 0
        Object.values(this.shopCart[categoryID][itemID]).forEach((item, index) => {
          num += item.num
        })
        return num
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapMutations([
      'ADD_CART'
    ]),
    addToCart (categoryID, itemID, foodID, name, price, event) {
      this.ADD_CART({shopID: this.shopId, categoryID, itemID, foodID, name, price})
      let dotLeft = event.target.getBoundingClientRect().left
      let dotBottom = event.target.getBoundingClientRect().bottom
      this.showMoveDot.push(true)
      this.$emit('showMoveDot', this.showMoveDot, dotLeft, dotBottom)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
  .cart-container{
    .cart-content{
      display: flex;
      align-items: center;
      .cart-num{
        min-width: 1rem;
        font-size: .65rem;
        text-align: center;
      }
      svg{
        @include wh(.9rem,.9rem);
        fill: #3190e8;
      }
    }
  }
  .slideToLeft-enter-active,.slideToLeft-leave-active{
    transition: all .3s;
  }
  .slideToLeft-enter,.slideToLeft-leave-to {
    opacity: 0;
    transform: translateX(1rem) rotate(360deg);
  }
</style>
