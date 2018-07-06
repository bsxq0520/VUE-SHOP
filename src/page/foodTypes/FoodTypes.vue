<template>
  <div class="container">
    <head-top :head-title="headTitle" goBack="true"></head-top>

    <section class="sort-container">
      <div class="sort-item">
        <div class="item-content" :class="{active:sortBy ==='food'}" @click="chooseType('food')">
          <span class="type-name">甜食</span>
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
        <div class="item-content" :class="{active:sortBy ==='food2'}" @click="chooseType('food2')">
          <span class="type-name">筛选</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>

        <transition name="fade-slide">
          <ul class="dropdown-menu" v-if="sortBy === 'food2'" @click="sortList($event)">
            <li>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
              </svg>
              <p data="0" :class="{selected:sortByType =='0'}">
                <span>智能排序</span>
              </p>
            </li>
            <li>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
              </svg>
              <p data="6" :class="{selected:sortByType =='6'}">
                <span>销量最高</span>
              </p>
            </li>
            <li>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
              </svg>
              <p data="5" :class="{selected:sortByType =='5'}">
                <span>离家最近</span>
              </p>
            </li>
            <li>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
              </svg>
              <p data="3" :class="{selected:sortByType =='3'}">
                <span>评分最高</span>
              </p>
            </li>
          </ul>
        </transition>
      </div>
      <div class="sort-item">
        <div class="item-content" :class="{active:sortBy ==='food3'}" @click="chooseType('food3')">
          <span class="type-name">甜食</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>

        <transition name="fade-slide">
          <ul class="dropdown-menu" v-if="sortBy === 'food3'">
            <li>智能排序
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
              </svg>
            </li>
            <li>销量最高</li>
            <li>离家最近</li>
            <li>评分最高</li>
          </ul>
        </transition>
      </div>

    </section>

    <transition name="fade">
      <div class="delayMask" v-show="sortBy" @click="sortBy=''"></div>
    </transition>
    <shop-list v-if="geohash" :geohash="geohash" :sortByType="sortByType"></shop-list>
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
      sortBy: '', // 分类筛选
      sortByType: '' // 排序方式
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
    // 控制分类展开显示
    async chooseType (type) {
      if (this.sortBy !== type) {
        this.sortBy = type
      } else {
        this.sortBy = ''
      }
    },
    // 点击分类排序并刷新数据
    sortList (event) {
      let node
      if (event.target.nodeName.toUpperCase() !== 'P') {
        node = event.target.parentNode
      } else {
        node = event.target
      }
      this.sortByType = node.getAttribute('data')
      this.sortBy = ''
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

      .item-content{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $fc;
        z-index: 19;

        &.active {
          .type-name{
          color: $blue;
          }
          svg {
            fill: $blue;
            transform: rotate(180deg);
          }
        }
      }

      &:not(:last-child) {

        .item-content {
          &::after {
            content: "";
            position: absolute;
            right: 0;
            height: 60%;
            color:$bc;
            border-right: 1px solid $bc;
          }
        }
      }

      .type-name{
        margin-right: .2rem;
      }
      svg {
        fill: #666;
        transition: all .3s;
      }

      .dropdown-menu {
        position: absolute;
        left: 0;
        top: 1.6rem;
        margin-top: -1px;
        width: 100%;
        background-color: $fc;
        border-top: 1px solid $bc;
        z-index: 11;

        li {
          display: flex;
          align-items: center;
          height: 2.6rem;
          line-height: 2.6rem;
          border-bottom: 1px solid $bc;

          svg {
            @include wh(.7rem,.7rem);
            margin: 0 .3rem 0 .8rem;
          }
          p {
            flex: auto;
            text-align: left;

            &.selected {
              span {color: $blue;}
            }
          }
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
    transform: translateY(0);
  }
  .fade-slide-enter,.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }

</style>
