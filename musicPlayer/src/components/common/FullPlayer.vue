<template>
    <transition name="musicPlayer">
        <div class='FullPlayer'>
            <div class="header">
                <h1><i @click="goBack"></i>{{getCurrentSong.songname}}</h1>
                <p>{{getCurrentSong.singer[0].name}}</p>
            </div>
            <div class="playing-thumb" :class='[playState =="playing" ? "running" : "stop"]' ref="thumb">
                <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+getCurrentSong.albummid+'.jpg?max_age=2592000'">
            </div>

            <div class="background">
                <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+getCurrentSong.albummid+'.jpg?max_age=2592000'">
            </div>

            <div class="opt-state">
                <a class="opt" :class="PlayMode" href="javascript:;" @click.stop="chooseMode" ></a>
                <a class="opt pre" href="javascript:;" @click.stop="prev"></a>
                <a class="opt" :class="[playState == 'playing' ? 'playing' : 'paused']" href="javascript:;" @click.stop="playState == 'playing' ? pause() : start()"></a>
                <a class="opt next" href="javascript:;" @click.stop="next"></a>
                <a class="opt favorite" href="javascript:;"></a>
            </div>

            <ul class="choose-mode" ref="chooses">
                <li @click.stop="sendPlayMode('mode-circle')" class="mode-list mode-circle"></li>
                <li @click.stop="sendPlayMode('mode-single')" class="mode-list mode-single"></li>
                <li @click.stop="sendPlayMode('mode-random')" class="mode-list mode-random"></li>
            </ul>
        </div>
    </transition>
</template>

<script>
import Tools from '@/mixins/cutSong'
import {mapGetters, mapMutations} from 'vuex'
export default {
    mixins:[Tools],
    data () {
        return {
            // 封面节点
            thumb: null,
            // MiniPlayer的audio节点
            MiniPlayAudioNode: null,
            // 播放列表长度
            songListLen: 0,
            // 当前索引
            curIndex: 0,
            // 播放状态
            PlayMode: '',
            // 播放模式显示开关
            key: true,
            // 选择播放模式节点
            chooseNode: null
        };
    },
    mounted(){
        this.thumb = this.$refs.thumb
        this.PlayMode = this.getCurPlayMode
        this.chooseNode = this.$refs.chooses.childNodes
        this.MiniPlayAudioNode = this.$parent.$children[2].$refs
    },
    watch:{
        getCurPlayMode:function (newMode){
            this.PlayMode = newMode
        }
    },
    computed:{
        ...mapGetters([
            'getCurrentIndex',
            'getCurrentSong',
            'getCurPlayMode',
            'getCurPlayState'
        ]),
        playState: function(){
            return this.getCurPlayState
        }
    },
    methods:{
        ...mapMutations([
            'SET_CURRENT_MODE',
            'SET_CURRENT_PLAYSTATE'
        ]),
        sendPlayMode(mode){
            this.SET_CURRENT_MODE(mode)
            this.chooseNode.forEach((singleMode) => {
                singleMode.style.transform = 'translateY(90px)'
                this.key = !this.key
            })
        },
        // 暂停播放歌曲
        pause(){
            this.MiniPlayAudioNode.curPlay.pause()
            this.SET_CURRENT_PLAYSTATE('paused')
            this.thumb.animationPlayState = 'paused'
        },
        // 开启歌曲播放
        start(){
            this.MiniPlayAudioNode.curPlay.play()
            this.SET_CURRENT_PLAYSTATE('playing')
        },
        // 播放下一首歌曲
        next(){
            this.SET_CURRENT_PLAYSTATE('playing')
            this.cutSong(this.PlayMode, 'next')
        },
        // 播放上一首歌曲
        prev(){
            this.SET_CURRENT_PLAYSTATE('playing')
            this.cutSong(this.PlayMode, 'prev')
        },
        // 点击出现模式选项
        chooseMode(){
            this.key = !this.key
            this.chooseNode.forEach((singleMode) => {
                if(this.key){
                    singleMode.style.transform = 'translateY(90px)'
                }else{
                    singleMode.style.transform = 'translateY(0)'
                }
                singleMode.style.transition = 'transform .3s'
            })
        },
        // 向下箭头后退功能
        goBack(){
            return this.$router.go(-1);
        }
    }
}
</script>
<style lang='scss' scoped>
@import "@/assets/scss/FullPlayer.scss";
.musicPlayer-enter-active, .musicPlayer-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.musicPlayer-enter, .musicPlayer-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.musicPlayer-enter-to, .musicPlayer-leave {
  transform: translateX(0);
  opacity: 0.5;
}
</style>