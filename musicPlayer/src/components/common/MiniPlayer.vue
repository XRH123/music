<template>
    <div class="mini-page" v-if="playerSrc" @click.stop="goPlayFull">
        <!-- S mini播放器显示 -->
        <div class="mini-player-info">
            <div class="thumb" :class='[playState =="playing" ? "running" : "stop"]'>
                <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+getCurrentSong.albummid+'.jpg?max_age=2592000'" alt="">
            </div>
            <div class="mini-player-con">
                <h3>{{getCurrentSong.songname}}</h3>
                <p>{{getCurrentSong.singer[0].name}}</p>
            </div>
            <div class="mini-player-options" @click.stop>
                <a class="playState" :class="[playState == 'playing' ? 'playing' : 'paused']" href="javascript:;" @click.stop="playState == 'playing' ? pause() : start()"></a>
                <a class="songsList" href="javascript:;" @click.stop="showList"></a>
            </div>
        </div>
        <!-- E mini播放器显示 -->

        <!-- S 播放列表 -->
        <div class="song-list" ref="songList" @click.stop="closeList">
            <div class="header" @click.stop>
                <div class="cutPlayMode">
                    <i class="mode-circle"></i>
                    <span>循环模式</span>
                </div>
                <span class="del-all"></span>
            </div>
            <div class="con" @click.stop>
                <ul>
                    <li class="current" :class="playState == 'playing' ? 'playing' : 'paused'" v-for="(songs, i) in playSongList" :key="i" @click="curListSong(i)">
                        <p v-text="songs.songname"></p>
                        <div class="songOpt">
                            <i class="like"></i>
                            <i class="del" @click.stop="delSingle(i)"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="close">
                关闭列表
            </div>
        </div>
        <!-- E 播放列表 -->

        <!-- S 播放器 -->
        <div class="mini-player" style="position:absolute;">
            <audio :src="playerSrc" controls ref="curPlay" autoplay @ended="AutoCutSong"></audio>
        </div>
        <!-- E 播放器 -->
    </div>
</template>

<script>
import Tools from '@/mixins/cutSong'
import HTTP from '@/Http/http'
import {mapGetters, mapMutations} from 'vuex'
export default {
    mixins:[Tools],
    data () {
        return {
            songMid:'',
            vkey:'',
            curPlayMode: '',
            playerSrc: ''
        };
    },
    mounted(){
        this.curPlayMode = this.getCurPlayMode
    },
    watch:{
        getCurPlayMode(newPlayMode){
            this.curPlayMode = newPlayMode
        },

        getCurrentSong(newCurrent){
            // 1、获取songMid
            this.songMid = newCurrent.songmid
            // 2、组装vkey
            this.getVKey()
            // 3、返回播地址
            .then(vKey => {
                // 4、得到播放地址
                this.setPlayerAdder(vKey)
            })
        }
    },
    computed:{
        ...mapGetters([
            'getCurPlayMode',
            'getCurrentSong',
            'getCurPlayState',
            'getPlaySongsList',
            'getCurrentIndex'
        ]),
        playState: function(){
            return this.getCurPlayState
        },
        playSongList: function(){
            return this.getPlaySongsList
        }
    },
    methods: {
        ...mapMutations([
            'SET_CURRENT_SRC',
            'SET_CURRENT_PLAYSTATE',
            'SET_PLAY_LIST'
        ]),
        // 获取VKey地址
        getVKey() {
            return new Promise((resolve, reject) =>{
                let vKeyApi = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&cid=205361747&platform=yqq&hostUin=0&needNewCode=0&uin=0&songmid=${this.songMid}&filename=C400${this.songMid}.m4a&guid=7120953682`
                HTTP.get(vKeyApi, {})
                .then(({data: {items}}) => {
                    if (items[0] && items[0].vkey) {
                        resolve(items[0].vkey)
                    } else {
                        reject(new Error('vKey获取失败'))
                    }
                })
            })
        },
        // 获取播放地址方法
        setPlayerAdder(vKey){
            this.playerSrc = `http://dl.stream.qqmusic.qq.com/C400${this.songMid}.m4a?vkey=${vKey}&guid=7120953682&uin=0&fromtag=66`
            this.SET_CURRENT_SRC(this.playSrc)
        },
        AutoCutSong(){
            this.cutSong(this.curPlayMode, 'next')
        },
        // 暂停歌曲
        pause(){
            this.$refs.curPlay.pause()
            this.SET_CURRENT_PLAYSTATE('paused')
        },
        // 开启歌曲播放
        start(){
            this.$refs.curPlay.play()
            this.SET_CURRENT_PLAYSTATE('playing')
        },
        // 点击其他界面跳转至全屏播放
        goPlayFull(){
            this.$router.push({name:'fullplayer', params:{id: this.getCurrentSong.songmid}})
        },
        // 关闭歌曲列表
        closeList(){
            this.$refs.songList.style = 'display:none'
        },
        // 打开歌曲列表
        showList(){
            this.$refs.songList.style = 'display:flex'
        },

        // 删除单曲
        delSingle(index){
            this.playSongList.splice(index)
            this.SET_PLAY_LIST(this.playSongList)
        },

        // 点击列表歌曲切歌
        curListSong(index){
            if(this.getCurrentIndex == index){
                if(this.getCurPlayState == 'playing'){
                    this.$refs.curPlay.pause()
                    this.SET_CURRENT_PLAYSTATE('paused')
                }
                else{
                    this.$refs.curPlay.play()
                    this.SET_CURRENT_PLAYSTATE('playing')
                }
            }
            else{
              this.SET_CURRENT_INDEX(index)
            }
        }
    }
}
</script>
<style lang='scss' scoped>
@import "@/assets/scss/miniPlayer.scss";
</style>