<template>
  <div class="goods">
    <!-- 菜单对应的是食物分类列表-->
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index === currentIndex}"
          @click="clickMenuItem(index)">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧是在一个分类标题列表里面嵌套着各类食物列表-->
    <div class="foods-wrapper">
      <ul ref="foodsUl">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      menuScroll: null,
      foodScroll: null,
      scrollY: 0, // 右侧滑动的Y轴坐标(实时变化)
      tops: [] // 所有右侧分类li的top组成的数组
    }
  },
  methods: {
    _initScroll () { // 初始化BScroll,列表显示后创建
      this.menuScroll = new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodScroll = new BScroll('.foods-wrapper', {
        probeType: 2, // 因为惯性滑动不会触发
        click: true
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
      // 惯性滑动后也触发
      this.foodScroll.on('scrollEnd', (pos) => {
        this.scrollY = Math.abs(pos.y)
        console.log(this.scrollY)
      })
    },
    // 初始化tops
    _initTops () {
      let topYs = []
      let top = 0
      topYs.push(top)
      // 找到所有分类的li
      const lis = this.$refs.foodsUl.children
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        topYs.push(top)
      })
      this.tops = topYs
    },
    clickMenuItem (index) {
      // 获取目标位置的Y坐标，并立即更新点击的分类
      const topY = this.tops[index]
      this.scrollY = topY
      this.foodScroll.scrollTo(0, -topY, 300)
    }
  },
  computed: {
    ...mapState(['goods']),
    // 计算当前分类的index，在初始和数据发生变化时触发
    currentIndex () {
      const {scrollY, tops} = this
      let index = 0
      index = tops.findIndex((top, index) => {
        // 当scrollY大于等于当前top并且小于下一项top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      console.log(index)
      return index
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => { // 此回调函数在数据更新后执行
      this.$nextTick(() => { // 数据更新显示后
        this._initScroll()
        this._initTops()
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $green
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
