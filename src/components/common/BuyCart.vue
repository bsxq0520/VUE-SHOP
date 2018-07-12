<template>
  <div class="cart-container">
    <section class="cart-content" v-if="foods.specifications.length">
      <svg v-if="foodNum">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
      </svg>

      <span class="cart-num" v-if="foodNum">{{foodNum}}</span>
      <svg @touchstart="addToCart($event)">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
      </svg>
    </section>
    <section v-else></section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      foodNum: 3,
      showMoveDot: [] // 控制下落的小圆点显示隐藏

    }
  },
  props: ['foods'],
  components: {

  },
  methods: {
    addToCart (event) {
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
</style>
