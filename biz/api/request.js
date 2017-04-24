/**
 * api 请求
 * Created by cly on 16/12/26.
 */

import axios from "axios";

axios.defaults.headers.common['Content-Type'] = "application/json;charset=UTF-8";

const headers = {

};

//豆瓣url
const doubanUrl = "https://api.douban.com/v2/";

//noinspection JSAnnotator
export default request = (authorization = false)=>{
    //accesstoken
    const {access_token} = global;
    if(access_token){
        headers['Authorization'] = 'bearer ' + access_token;
    }

    //配置options
    return axios.create({
        baseURL:doubanUrl,
        timeout:10000,
        withCredentials:false,
        headers:headers
    });_
}