<template>
    <div class="logo">
        <img :src="logo">
        <h1>VUE—音乐</h1>
    </div>
</template>

<script type="text/javascript">
import indexLogo from '@/assets/images/indexLogo.png'
export default {
    name:'',
    data () {
        return {
           logo: indexLogo
        }
    },
    components: {}
}

</script>
<style lang='scss' scoped>
.logo{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    z-index:999;
    display: flex;
    justify-content: center;
    color: #fff;
    padding:5px 0;
    img{
        width:30px;
        height:30px;
    }
    h1{
        font-weight: 400;
        font-size: 32px;
    }
}
</style>