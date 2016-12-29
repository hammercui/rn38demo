/**
 * 电影榜单
 * Created by cly on 16/12/26.
 */

import request from "../request";



/**
 * 正在热映
 * @returns {V}
 */
export let getHotList = ()=>{
    return request().get(
        "movie/in_theaters"
    )
};

/**
 * 即将上映
 * @returns {V}
 */
export let getCommingList = ()=>{
    return request().get(
        "movie/coming_soon"
    )
};

/**
 * top250
 * @returns {V}
 */
export let getTop250List = ()=>{
    return request().get(
        "movie/top250"
    )
}

//  口碑榜/v2/movie/weekly

//  新片榜/v2/movie/new_movies

//  北美票房榜 /v2/movie/us_box

