<template>
    <div class='singer'>
        <div class="curClassify">
            <h2 v-text="curSinger" ref="curClassify" v-if="hasLen"></h2>
        </div>

        <div id="singerWapper" :style="autoHeight">
            <ul>
                <li v-for="singerFindex in singerList" :key='singerFindex.Findex'>
                    <h2 class="classify" v-text="singerFindex.Findex"></h2>
                    <ol>
                        <li v-for="singer in singerFindex.data" :key="singer.Fsinger_id" @click="goDetail(singer.Fsinger_mid)">
                            <img :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+singer.Fsinger_mid+'.jpg?max_age=2592000'">
                            <p v-text="singer.Fsinger_name"></p>
                        </li>
                    </ol>
                </li>
            </ul>
        </div>

        <div class="right" ref="right" :style="hasLen ? 'fontSize: 10px' : 'fontSize:12px'">
            <ul>
                <li v-for="keyWord in singerList" :key="keyWord.Findex" @click="toWhere(keyWord.Findex)">
                    <span :class="{on : curSinger == keyWord.Findex}" v-text="keyWord.Findex"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import API from '@/api/abstract'
import HTTP from '@/Http/http'
import iScroll from 'iscroll/build/iscroll-probe'
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            singerList: [],
            singerWapper: null,
            curSinger:'热'
        };
    },
    computed:{
        ...mapGetters([
            'getCurrentSong'
        ]),
        autoHeight(){
            return this.getCurrentSong ? 'height:calc(100vh - 160px)' : 'height:calc(100vh - 100px)'
        },
        hasLen(){
          return this.singerList.length > 0 ? true : false
        }
    },
    created(){
        this.getSingerList()
        .then(list => {
            this.singerList = this.Pack(list)
            this.Cale()
            setTimeout(() => {
                this.singerWapper.refresh()
            },0)
            this.$refs.right.style.transform = "translateX(0)"
            this.$refs.right.style.transition = "transform 0.3s"
        })
    },
    mounted(){
        this.singerWapper = new iScroll("#singerWapper", {
            mouseWheel: true,
            scrollbars: false,
            useTransfrom: true,
            disableMouse: true,
            disablePointer: false,
            disableTouch: false,
            tap: false,
            click: true,
            probeType: 2
        }),
        this.singerWapper.on('scroll', () => {
            this.singerList.map(singer => {
                let offsetY = singer.Range.start - 10
                let scrollY = Math.abs(this.singerWapper.y)
                if(scrollY > offsetY){
                    this.curSinger = singer.Findex
                }
            })
        })
    },
    methods:{
        // 初步获取歌手列表
        getSingerList(){
            return new Promise((resolve,reject) => {
                HTTP.get(API.singer.singerList, {param: 'jsonpCallback'})
                .then(({code, data: {list}}) => {
                    if(code == 0 && list){
                        resolve(list)
                        this.singerWapper.refresh()
                    }else{
                        reject(new Error('数据获取失败'))
                    }
                })
            })
        },
        // 重新组装数据类型
        Pack(list){
            // 热歌榜
            let hotList = {
                Findex: '热',
                data: list.slice(0, 10)
            }
            // 热搜数据，前十条数据 ，先放入歌手列表
            this.singerList.push(hotList)
            // 整理后面的数据，按照Findex分类
            // 1.把所有的Findex排序放入一个数组FindexList
            let FindexList = [...new Set(list.map((singer) => {
                                return singer.Findex
                            }))].sort()
            // 2.遍历歌手列表和 Findex数组，相同时，把对应的数据放入相同Findex对象内
            let temp = FindexList.map((key) => {
                return {
                    Findex: key,
                    data: list.filter(singer => {
                        // 当 key 和 singer.Findex相同时，返回singer给singer
                        return key === singer.Findex
                    })
                }
            })
            // 把两组数据相结合
            return this.singerList.concat(temp)
        },

        // 计算每个分类的高度，给每一个分组加一个Range属性
        Cale(){
            let temp = {}
            this.singerList.map((singleList, index) => {
                if(index == 0){
                    temp = {
                        start: 0,
                        end: singleList.data.length * 70 + 50
                    }
                }else{
                    temp = {
                        start: this.singerList[index - 1].Range.end,
                        end: singleList.data.length * 70 + 50 + this.singerList[index - 1].Range.end
                    }
                }
                this.singerList[index].Range = temp
            })
        },

        // 点击滚动滑轮至
        toWhere(where){
            this.singerList.map(singer => {
                if(singer.Findex === where){
                    let scroll = - singer.Range.start
                    this.curSinger = where
                    this.singerWapper.scrollTo(0, scroll)
                }
            })
        },

        // 跳转路由
        goDetail(song_mid){
            return this.$router.push(`/singer/${song_mid}`)
        }
    }
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/singer.scss'
</style>