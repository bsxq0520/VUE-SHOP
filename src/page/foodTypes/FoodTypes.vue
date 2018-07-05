<template>
  <div class="container">
    <head-top :head-title="headTitle" goBack="true"></head-top>

    <section class="sort-container">
      <div class="sort-item">
        <div class="item-content" @click="chooseType('food')">
          <span>甜食</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>

        <transition name="fade-slide">
          <ul class="dropdown-menu" v-if="sortBy === 'food'">
            <li>智能排序</li>
            <li>销量最高</li>
            <li>离家最近</li>
            <li>评分最高</li>
          </ul>
        </transition>
      </div>
      <div class="sort-item">
        <div class="item-content" @click="chooseType('food2')">
          <span>甜食</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>

        <transition name="fade-slide">
          <ul class="dropdown-menu" v-if="sortBy === 'food2'">
            <li>智能排序</li>
            <li>销量最高</li>
            <li>离家最近</li>
            <li>评分最高</li>
          </ul>
        </transition>
      </div>
      <div class="sort-item">
        <div class="item-content" @click="chooseType('food3')">
          <span>甜食</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>

        <transition name="fade-slide">
          <ul class="dropdown-menu" v-if="sortBy === 'food3'">
            <li>智能排序</li>
            <li>销量最高</li>
            <li>离家最近</li>
            <li>评分最高</li>
          </ul>
        </transition>
      </div>

    </section>

    <transition name="fade">
      <div class="delayMask" v-show="sortBy"></div>
    </transition>
    <shop-list v-if="geohash" :geohash="geohash"></shop-list>
  </div>
</template>

<script>
import ShopList from '../../components/common/ShopList'
import HeadTop from '../../components/header/Head'
export default {
  data () {
    return {
      geohash: '', // 地理位置信息
      headTitle: '', // 标题头
      sortBy: '' // 分类筛选
    }
  },
  components: {
    ShopList,
    HeadTop
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.geohash = this.$route.query.geohash
      this.headTitle = this.$route.query.title
    },
    async chooseType (type) {
      if (this.sortBy !== type) {
        this.sortBy = type
      } else {
        this.sortBy = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

  .container{
    padding-top: 3.5rem;
  }
  .sort-container {
    position: fixed;
    top:1.95rem;
    left:0;
    width: 100%;
    @include wh(100%,1.6rem);
    display: flex;
    align-items: center;
    border-bottom: 1px solid $bc;
    background-color: $fc;
    z-index: 15;

    .sort-item {
      flex: 1;
      text-align: center;
      font-size: .6rem;
      color: #444;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .item-content{
        position: relative;
        width: 100%;
        z-index: 19;
      }

      &:not(:last-child) {

        .item-content {
          &::after {
            content: "";
            position: absolute;
            right: 0;
            height: 100%;
            color:$bc;
            border-right: 1px solid $bc;
          }
        }
      }

      svg {
        fill: #666;
      }

      .dropdown-menu {
        position: absolute;
        left: 0;
        top: 1.5rem;
        width: 100%;
        background-color: $fc;
        border-top: 1px solid $bc;
        z-index: 11;

        li {
          height: 2.6rem;
          line-height: 2.6rem;
          border-bottom: 1px solid $bc;
        }
      }
    }
  }
  .delayMask {
    position: fixed;
    @include wh(100%,100%);
    background-color: rgba(0,0,0,.3);
    z-index: 10;
  }

  .fade-enter-active,.fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter,.fade-leave-to {
    opacity: 0;
  }
  .fade-slide-enter-active,.fade-slide-leave-active {
    transition: all .3s;
  }
  .fade-slide-enter,.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }

</style>
