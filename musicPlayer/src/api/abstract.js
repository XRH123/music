// const host = "/api";
const host = 'https://c.y.qq.com/';

export default {
    home:{
        banner: `${host}musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1520251216593`,
        rank:`${host}v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&topid=4&type=top&song_num=30&g_tk=369502886&loginUin=3001526864&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    },
    singer:{
        singerList: `${host}v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=369502886&loginUin=3001526864&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
        singerDetail: `${host}v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=369502886&loginUin=3001526864&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&order=listen&begin=0&num=30&songstatus=1&singermid=`
    },
    search:{
        hotkeyApi:"https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5",
	    searchApi:"http://searchtip.kugou.com/getSearchTip?MusicTipCount=5&MVTipCount=2&albumcount=2&keyword="
    }
}