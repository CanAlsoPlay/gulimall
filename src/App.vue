<template>
  <div id="app">
    <footer-guide v-show="$route.meta.showFooter"/>
    <router-view />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted () {
    this.getAddress()
    this.getCategorys()
    this.getShops()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress', 'getCategorys', 'getShops', 'getUserInfo'])
  }
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
