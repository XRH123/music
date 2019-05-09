const getters = {
    // 获取歌曲列表
    getPlaySongsList(state){
        return state.player.PlaySongsList
    },

    // 获取当前歌曲索引
    getCurrentIndex(state){
        return state.player.CurrentIndex
    },

    // 获取当前播放歌曲
    getCurrentSong(state){
        let player = state.player
        return player.PlaySongsList[player.CurrentIndex]
    },

    // 获取播放模式
    getCurPlayMode(state){
        return state.player.CurPlayMode
    },

    // 获取当前播放状态
    getCurPlayState(state){
        return state.player.CurPlayState
    }
}

export default getters