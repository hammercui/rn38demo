/**
 * home 的reducer
 * Created by cly on 16/12/26.
 */

import {handleActions} from "redux-actions";
import MovieList from "../../actions/douban/movieListAction";
export default handleActions({
    [MovieList.GET_HOT_MOVIE_LIST]:{
        next(state,action){
            //debugger;
            return action.payload.data;
        },
        throw(state,action){
            return state;
        }

    },

},{})