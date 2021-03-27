<template>
  <section class="msite">
    <header-top :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-yonghuming"></i>
        </span>
      </router-link>
    </header-top>
    <nav class="msite_nav">
      <!-- swiper的容器div -->
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <!-- swiper的轮播div -->
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, indey) in categorys" :key="indey">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- svg显示加载中提示界面 -->
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家列表-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list/>
    </div>
  </section>
</template>

<script>
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import ShopList from '@/components/ShopList/ShopList.vue'
export default {
  name: 'Msite',
  data () {
    return {
      swiper: null,
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address', 'categorys', 'shops', 'userInfo']),
    categorysArr () {
      const { categorys } = this
      // 准备空的二维数组
      const arr = []
      let minArr = []
      categorys.forEach(c => {
        if (minArr.length === 8) {
          arr.push(minArr)
          minArr = []
        }
        minArr.push(c)
      })
      if (minArr) {
        arr.push(minArr)
      }
      return arr
    }
  },
  mounted () {
    this._initScroll()
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => { // 一旦界面更新立即调用(要写在数据更新之后)
        this.swiper = new Swiper('.swiper-container', {
          loop: true, // 循环轮播
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  watch: {
    /* eslint-disable no-new */
    categorys () { // categorys数组中有数据了，在异步更新界面之前执行
      this._initScroll()
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/stylus/mixins.styl"
  .msite
    width 100%
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo
        font-size 25px
        color #fff
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
