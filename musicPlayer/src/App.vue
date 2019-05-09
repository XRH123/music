<template>
    <div class="app">
        <Header></Header>
        <TabNav></TabNav>
        <MiniPlayer></MiniPlayer>
        <router-view></router-view>
    </div>
</template>

<script type="javascript">

// 导入头部组件
import Header from '@/components/common/header'
import TabNav from '@/components/common/tabNav'
import MiniPlayer from '@/components/common/MiniPlayer'
  export default {
    name:'',
    props:[''],
    data () {
        return {
        };
    },
    components: {
        Header,
        TabNav,
        MiniPlayer
    }
}
</script>
<style lang='scss'>
@import '@/assets/scss/common.scss';

</style>
