/**
 *
 * Created by cly on 16/12/26.
 */

import KeyMirror from "keymirror";
import {createAction} from "redux-actions";
import * as movieApi from "../../api/douban/movieApi";

const type = KeyMirror({
    GET_HOT_MOVIE_LIST:null,
    GET_COMMING_MOVIE_LIST:null,
});


export let getHotMovieListAction = createAction(
        type.GET_HOT_MOVIE_LIST,
        ()=> movieApi.getHotList()
);

export let getCommingMovieListAction = createAction(
        type.GET_COMMING_MOVIE_LIST,
        ()=>movieApi.getCommingList()
);

export default type;



