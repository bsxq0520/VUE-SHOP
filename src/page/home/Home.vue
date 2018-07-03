<template>
  <div>
    <section id="hotCity-container" class="section">
      <h4 class="city-title">热门城市</h4>
      <ul class="cityList-ul">
        <router-link tag="li" v-for="item of hotCity" :to="'/city/' + item.id" :key="item.id">{{item.name}}</router-link>
      </ul>
    </section>

    <section id="groupCity-container" class="section">
      <ul>
        <li v-for="(value,key,index) of sortGroupCity" :key="key">
          <h4 class="city-title">{{key}}
            <span v-if="index ===0">(按字母排序)</span>
          </h4>
          <ul class="cityList-ul classify-ul">
            <router-link class="ellipsis" tag="li" v-for="item of value" :to="'/city/'+ item.id" :key="item.id">{{item.name}}</router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import {hotCity, groupCity} from '../../service/getData'
export default {
  data () {
    return {
      hotCity: [],
      groupCity: {}
    }
  },
  mounted () {
    // 获取热门城市
    hotCity().then(res => {
      this.hotCity = res
    })

    groupCity().then(res => {
      this.groupCity = res
    })
  },
  computed: {
    // 城市数据按A~Z排序
    sortGroupCity () {
      let res = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupCity[String.fromCharCode(i)]) {
          res[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)]
        }
      }
      return res
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
  .section{
    background-color: #fff;

    &#hotCity-container {
      margin-bottom: .4rem;
    }
  }
  .city-title{
    color: #666;
    border-bottom: 1px solid $bc;
    font: .55rem/1.45rem Helvetica;
    text-indent: .45rem;
  }
  .cityList-ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      height: 1.75rem;
      text-align: center;
      color: #3190e8;
      font: .6rem/1.75rem Microsoft YaHei;
      border-bottom: .025rem solid $bc;

      &:not(:nth-of-type(4n)) {
        border-right: .025rem solid $bc;
      }
    }

    &.classify-ul {
      position: relative;
      &::after {
        content: "";
        width: 100%;
        position: absolute;
        bottom: 0;
        border-bottom: 1px solid $bc;
      }

      li{color: #666;}
    }
  }
</style>
