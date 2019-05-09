import {mapGetters, mapMutations} from 'vuex'

let tools =  {
    data:{
        function(){
            return {
                casual: 0
            }
        }
    },
    computed:{
        ...mapGetters([
            'getCurrentIndex',
            'getPlaySongsList',
        ])
    },
    methods:{
        ...mapMutations([
            'SET_CURRENT_INDEX',
        ]),
        // 切歌，1、判断模式,影响索引
        //       2、判断方向
        //       3、判断列表歌曲数量
        cutSong(mode, direction){
            this.curIndex = this.getCurrentIndex
            this.songListLen = this.getPlaySongsList.length

            if(mode == 'mode-circle' || mode == 'mode-single'){
                switch(direction){
                case 'next':
                    if(this.curIndex == this.songListLen - 1){
                        return this.SET_CURRENT_INDEX(0)
                    }else{
                        return this.SET_CURRENT_INDEX(this.curIndex + 1)
                    }
                case 'prev':
                    if(this.curIndex == 0){
                        return this.SET_CURRENT_INDEX(this.songListLen - 1)
                    }else{
                        return this.SET_CURRENT_INDEX(this.curIndex - 1)
                    }
                }
            }else{
                this.casual = this.RandomNumBoth(0, this.songListLen - 1)
                switch(direction){
                    case 'next':
                        return this.SET_CURRENT_INDEX(this.casual);
                    case 'prev':
                        return this.SET_CURRENT_INDEX(this.casual);
                }
            }
        },
        // 产生一个随机数 [n, m]
        RandomNumBoth(min, max){
            let Range = max - min
            let Rand = Math.random()
            let num = min + Math.round(Rand * Range)
            return num
        }
    }
}

export default tools