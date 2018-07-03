<template>
  <div class="city-container">
    <head-top :head-title="cityName" :go-back="true">
      <router-link :to="'/home'" slot="changeCity" class="changeCity">切换城市</router-link>
    </head-top>

    <form class="city-form" @submit.prevent>
      <div>
        <input
        type="search"
        placeholder="请输入地址"
        class="city-input city-form-input"
        v-model="searchValue">
      </div>
      <div>
        <input type="submit" value="提交" class="city-submit city-form-input" @click="serachAction">
      </div>
    </form>

    <h4></h4>
    <ul class="searchList">
      <li v-for="(item, index) of placeList" :key="index" @click="nextPage(index, item.geohash)">
        <dl>
          <dt class="search-title">{{item.name}}</dt>
          <dd class="search-addr ellipsis">{{item.address}}</dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import {currentCity, searchPlace} from '../../service/getData'
import HeadTop from '../../components/header/Head'
export default {
  data () {
    return {
      cityId: '', // 城市id
      cityName: '', // 城市名
      searchValue: '', // 搜索地址字段
      placeList: [] // 搜索地址列表
    }
  },
  mounted () {
    this.cityId = this.$route.params.cityId
    currentCity(this.cityId).then(res => {
      this.cityName = res.name
    })
  },
  components: {
    HeadTop
  },
  methods: {
    // 搜索地址
    serachAction () {
      if (this.searchValue) {
        searchPlace(this.cityId, this.searchValue).then(res => {
          this.placeList = res
        })
      }
    },
    // 进入商铺页
    nextPage (index, geohash) {
      this.$router.push({path: '/site', query: {geohash}})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

  .city-container{
    padding-top: 2.35rem;
  }
  .changeCity {
    margin-right: .4rem;
    font-size: .6rem;
    color: $fc;
  }
  .city-form {
    padding-bottom: .4rem;
    background-color: #fff;
    border-bottom: 1px solid $bc;

    >div {
      width: 90%;
      margin: 0 auto;

      .city-form-input{
        @include wh(100%, 1.4rem);
        margin-bottom: .4rem;

        &.city-input {
          padding: 0 .3rem;
          border: 1px solid $bc;
        }
        &.city-submit {
          background-color: $blue;
          color: $fc;
        }
      }
    }
  }

  .searchList {
    background-color: #fff;

    li {
      border-bottom: 1px solid $bc;
      dl {
        margin: 0 5%;
        padding-top: .5rem;
      }
    }

    .search-title{
      margin-bottom: .35rem;
      font-size: .65rem;
      color: #333;
    }
    .search-addr {
      margin-bottom: .55rem;
      font-size: .45rem;
      color: #999;
    }
  }
</style>
