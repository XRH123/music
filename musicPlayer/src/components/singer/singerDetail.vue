<template>
    <div class='singerDetail'>
        <div class="header">
            <span><i @click="goBack"></i></span>
            <h2 v-text="singerName"></h2>
        </div>

        <div class="con">
            <img :src="'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+singerMid+'.jpg?max_age=2592000'">
            <div id="songListWrapper" :style="autoHeight">
                <ul>
                    <li v-for="song in songList" :key="song.musicData.songid" @click.stop="goPlayer(song)">
                        <h2 v-text="song.musicData.songname"></h2>
                        <p>{{singerName}}--{{song.musicData.albumname}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import HTTP from '@/Http/http'
import API from '@/api/abstract'
import iScroll from 'iscroll'
console.log(iScroll)
import {mapMutations, mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            singerMid: '',
            singerName: '',
            songList:[],
            songListWrapper:null,
            timer: null
        }
    },
    computed:{
        ...mapGetters([
            'getCurrentSong'
        ]),
        autoHeight(){
            return this.getCurrentSong ? 'height:calc(55vh - 60px)' : 'height:calc(55vh)'
        }
    },
    created(){
        this.singerMid = this.$route.params.id
        this.getSingerDetail()
    },
    mounted(){
        this.songListWrapper = new iScroll("#songListWrapper", {
            mouseWheel: true,
            scrollbars: false,
            useTransfrom: true,
            disableMouse: true,
            disablePointer: false,
            disableTouch: false,
            tap: true,
            click: true
        })
    },
    methods:{
        ...mapMutations([
            'ADD_SONGS_LIST',
            'SET_CURRENT_PLAYSTATE'
        ]),
        // 获取歌手详细信息
        getSingerDetail(){
            let url = API.singer.singerDetail + this.singerMid
            HTTP.get(url, {param: 'jsonpCallback'})
            .then(({data:{list, singer_name}}) => {
                this.singerName = singer_name
                this.songList = list
                setTimeout(() => {
                    this.songListWrapper.refresh()
                }, 0)
            })
        },
        goBack(){
            this.$router.go(-1)
        },
        goPlayer({musicData:{albummid, singer, songmid, songname}}){
            this.SET_CURRENT_PLAYSTATE('playing')
            this.$router.push(`/fullplayer/${albummid}`)
            this.ADD_SONGS_LIST({albummid, singer, songmid, songname})
        }
    }
}

</script>
<style lang='scss' scoped>
@import '@/assets/scss/singerDetail.scss'
</style>