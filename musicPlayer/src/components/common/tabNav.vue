<template>
   <div class='tab-nav'>
        <router-link exact-active-class="current" to="/">推荐</router-link>
        <router-link exact-active-class="current" to="/singer">歌手</router-link>
        <router-link exact-active-class="current" to="/search">搜索</router-link>
   </div>
</template>

<script type="javascript">
  export default {
    data () {
       return {

      };
    },
    components: {
    }

  }
</script>

<style lang='scss' scoped>
@import '@/assets/scss/tabNav.scss'
</style>