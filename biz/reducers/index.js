/**
 * Created by cly on 16/12/26.
 */

import {combineReducers} from "redux";
import BizError from "../errors/BizError";
import home from "./home";
/**
 * 请求错误的reduce处理
 * @param state
 * @param action
 * @returns {*}
 */
function error(state={},action) {
    if(action.erroe && action.payload instanceof BizError){
        console.warn("reducer error",action);
        return action.paylod;
    }
}

const rootReducer = combineReducers({
    home
});

export  default rootReducer;