
// import axios from 'axios'
import jsonp from 'jsonp'

export default {
    get: (url, param) => {
        return new Promise((resolve, reject) =>{
            jsonp(url, param, (err, res) => {
                if(!err){
                    resolve(res)
                }else{
                    reject(err)
                }
            })
        })
    }
}