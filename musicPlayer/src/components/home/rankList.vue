<template>
    <div class='rank-list'>
       <h2>排行榜</h2>
       <div class="rankList-con">
           <ul>
               <li v-for="rankListItem in songsList" :key="rankListItem.data.id" @click="sendCurrent(rankListItem)">
                   <router-link :to="'/fullplayer/' + rankListItem.data.songid">
                       <div class="thumb">
                           <img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+rankListItem.data.albummid+'.jpg?max_age=2592000'">
                       </div>
                        <div class="introduce">
                            <h3 class="songs-name">{{rankListItem.data.songname}}</h3>
                            <p class="singer-name">{{rankListItem.data.singer[0].name}}</p>
                        </div>
                   </router-link>
               </li>
           </ul>
       </div>
    </div>
</template>
<script type="text/javascript">
import {mapMutations} from 'vuex'

export default {
    props:{
        songsList:{
            type: Array,
            default: function(){
                return []
            },
            required: true
        }
    },
    data () {
        return {
        };
    },
    methods:{
        ...mapMutations([
            'ADD_SONGS_LIST',
            'SET_CURRENT_PLAYSTATE'
        ]),
        // 添加歌曲信息(无播放地址)到播放列表
        sendCurrent({data: {albummid, singer, songmid, songname}}){
            this.SET_CURRENT_PLAYSTATE('playing')
            this.ADD_SONGS_LIST({albummid, singer, songmid, songname})
        }
    }
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/rankList.scss'
</style>