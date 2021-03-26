<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="iconfont icon-shopping"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { MessageBox } from 'mint-ui'
// import BScroll from 'better-scroll'
import {mapState, mapGetters} from 'vuex'
// import CartControl from '../CartControl/CartControl.vue'
export default {
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState(['cartFoods', 'info']),
    ...mapGetters(['totalCount', 'totalPrice']),
    payClass () {
      const {totalPrice} = this
      const {minPrice} = this.info
      return totalPrice >= minPrice ? 'enough' : 'not-enough'
    },
    payText () {
      const {totalPrice} = this
      const {minPrice} = this.info
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    toggleShow () {
      // 当总数量大于0时才切换
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    font-size 0
    color rgba(255, 255, 255, 0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        vertical-align top
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c
          &.highlight
            background $green
          .icon-shopping
            line-height 44px
            font-size 24px
            color #80858a
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 5px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        font-size 16px
        font-weight 700
        color #fff
        &.highlight
          color #fff
      .desc
        display inline-block
        vertical-align bottom
        margin-bottom 15px
        margin-left -45px
        font-size 10px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        color #fff
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
</style>
