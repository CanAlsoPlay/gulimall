<template>
  <div id="app">
    <footer-guide />
    <router-view/>
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
  },
  methods: {
    ...mapActions(['getAddress', 'getCategorys', 'getShops'])
  }
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
