<template>
  <div>
    <header id="head-top">
      <section class="head-back" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
      </section>

      <section class="head-title ellipsis" v-if="headTitle">
        <span class="head-text">{{headTitle}}</span>
      </section>
      <slot name="changeCity"></slot>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['headTitle', 'goBack'],
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
  #head-top{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%,1.95rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $blue;

    .head-back{
      width: 1.6rem;
      height: 1rem;
      text-indent: .4rem;
    }
    .head-title{
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;

      .head-text{font-size: .8rem;color:$fc;}
    }
  }
</style>
