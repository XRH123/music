<template>
    <div class="home">
        <div id = "warpper" :style="autoHeight">
            <div id="warpper-con">
                <Banner :bannerList = "imgUrl" ref="banner"></Banner>
                <RankList :songsList = "blumbUrl"></RankList>
                <div class="loading-con">
                    <i class="loading-img"></i>
                    <p style="color:#fff;font-size:20px;text-align:center">{{stepTips[steps]}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
//插件
import iScroll from 'iscroll/build/iscroll-probe'
// 接口
import API from '@/api/abstract'
import HTTP from '@/Http/http'
//组件
import Banner from '@/components/home/banner'
import RankList from '@/components/home/rankList'

import {mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            // iScroll 实例化
            iscroll: null,
            // banner数据
            imgUrl:[],
            // 排行榜数据
            rankListUrl: {},
            // 封面等数据
            blumbUrl: [],
            // 排行榜请求的开始值
            beginNum:0,
            // 是否为第一次请求
            isFirstFetch: true,
            // 加载状态显示
            stepTips:{
                stp1: "向上拉加载更多",
                stp2: "松开加 载更多",
                stp3: "加载中.....",
                stp4: "已加载完所有数据"
            },
            steps:'stp1'
        }
    },
    components: {
        Banner,
        RankList
    },
    created(){
        this.getBannerList()
        this.getRankListItem()
    },
    computed:{
        ...mapGetters([
            'getCurrentSong'
        ]),
        autoHeight(){
            return this.getCurrentSong ? 'height:calc(100vh - 160px)' : 'height:calc(100vh - 100px)'
        }
    },
    mounted(){
        setTimeout(() =>{
            this.iscroll = new iScroll("#warpper", {
                mouseWheel: true,
                scrollbars: false,
                useTransfrom: true,
                disableMouse: true,
                disablePointer: false,
                disableTouch: false,
                tap: true,
                click: true,
                probeType: 2
            })
            // 监听滚动开始
            this.iscroll.on('scrollStart', () => {
                this.steps = 'stp1'
            })
            // 监听滚动移动
            this.iscroll.on('scroll', () => {
                if(this.iscroll.maxScrollY - this.iscroll.y >= 30){
                    this.steps = 'stp2'
                }else{
                    this.steps = 'stp1'
                }
            })
            // 监听滚动结束的事件
            this.iscroll.on('scrollEnd', () => {
                setTimeout(() => {
                    if(this.steps == 'stp2'){
                        if(this.beginNum == this.rankListUrl.total_song_num) {
                            this.steps = "stp4";
                        }else{
                            this.steps = 'stp3';
                            this.getRankListItem();
                        }
                    }
                }, 300)
                if(this.iscroll.y != 0){
                    this.iscroll.scrollTo(0, this.iscroll.y + 30)
                }
            })
        },500)
    },
    methods:{
        //获取banner列表
        getBannerList(){
            HTTP.get(API.home.banner, {param:'jsonpCallback'})
            .then(({data:{slider}}) => {
                this.imgUrl = slider
                this.$refs.banner.init()
            })
        },
        // 加载更多排行榜数据
        getRankListItem(){
            let dateStr = this.calcDateStr()
            HTTP.get(API.home.rank+`&song_begin=${this.beginNum}&date=${dateStr}`, {param:'jsonpCallback'})
            .then(({code, songlist, total_song_num}) => {
                if(this.isFirstFetch){
                    this.blumbUrl = songlist;
                    this.beginNum = this.blumbUrl.length;
                    this.isFirstFetch = false;
                }else{
                    this.blumbUrl = this.blumbUrl.concat(songlist);
                    this.beginNum = this.blumbUrl.length;
                }
                this.rankListUrl = {code, songlist, total_song_num}
                this.$forceUpdate();
            })
        },
        // 计算日期字符串
        calcDateStr(){
            let timeStamp = new Date()
            let year = timeStamp.getFullYear()
            let month = (timeStamp.getMonth() + 1) < 10 ? '0' + (timeStamp.getMonth() + 1) : (timeStamp.getMonth() + 1)
            let day = (timeStamp.getDate()) < 10 ? '0' + timeStamp.getDate() : timeStamp.getDate()
            return `${year}-${month}-${day}`
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/home.scss'
</style>
