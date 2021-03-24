<template>
  <section class="msite">
    <header-top title="地址里的撒娇法拉盛攻击力">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" to="/search">
        <span class="header_login_text">
          登录|注册
        </span>
      </router-link>
    </header-top>
  </section>
</template>

<script>
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
export default {
  name: 'Msite',
  components: {
    HeaderTop
  },
  mounted () {
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
</style>
