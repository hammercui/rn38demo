/**
 * Created by cly on 16/12/27.
 */

import {bindActionCreators} from "redux"
import {getHotMovieListAction,getCommingMovieListAction} from  "../../../biz/actions/douban/movieListAction";

export default (dispatch)=>({
    dispatch,
    actions:bindActionCreators({
        getHotMovieListAction,
        getCommingMovieListAction,
    },dispatch)
});


