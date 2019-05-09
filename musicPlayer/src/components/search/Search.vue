<template>
    <div class='search'>
        <div class="entry">
            <input type="text" placeholder="搜索歌曲、歌手" v-model="keyWord">
            <i v-show="keyWord" @click="clear"></i>
        </div>

        <div class="hotKey" v-if="!keyWord">
            <h2>热门搜索</h2>
            <div class="con">
                <span v-for="hotkey in hotKeyList" :key="hotkey.n" v-text="hotkey.k" @click="changeKeyWord(hotkey.k)"></span>
            </div>
        </div>

        <div class="searchResult" v-if="keyWord">
            <ul>
                <li v-for="(classify, index) in searchList" :key="index">
                    <h2 v-if="classify.LableName" v-text="classify.LableName"></h2>
                    <p v-for="(songs,i) in classify.RecordDatas" :key="i" v-text="songs.HintInfo"></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HTTP from '@/Http/http'
import API from '@/api/abstract'

export default {
    data () {
        return {
            hotKeyList:[],
            keyWord:'',
            searchList:[]
        };
    },
    created(){
        HTTP.get(API.search.hotkeyApi, {param: 'jsonpCallback'})
        .then(({data:{hotkey}}) => {
            this.hotKeyList = hotkey.splice(0, 11)
        })
    },
    watch:{
        // 检测字更新自动搜索歌曲
        keyWord: function(newWord){
            this.searchResult(newWord)
        }
    },
    methods:{
        // 根据提示直接输入搜索关键字
        changeKeyWord(word){
            this.keyWord = word.trim()
            this.searchResult(this.keyWord)
        },

        // 搜索结果
        searchResult(word){
            let url = API.search.searchApi + word
            HTTP.get(url, {})
            .then(({data}) => {
                this.searchList = data
            })
        },

        // 删除关键字
        clear(){
            this.keyWord = ''
        }
    }
}

</script>
<style lang='scss' scoped>
@import '@/assets/scss/search.scss'
</style>