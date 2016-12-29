/**
 *
 * redux的中间件 负责action的异步处理  （action数据交给reducer之间的统一处理）
 * Created by cly on 16/12/24.
 */

import {isFSA} from "flux-standard-action";
import BizError from "../errors/BizError";
function isPromise(val) {
    return val && typeof val.then === "function";
}

export default function promiseMiddleware ({ dispatch }) {
    return next => action => {
        if (!isFSA(action)) {
            return isPromise(action)
                ? action.then(dispatch)
                : next(action);
        }

        return isPromise(action.payload)
            ? action.payload.then(
            result => {
                return result;
            },
            error => {
                return Promise.reject(new BizError(error.response));
            }
        ).then(
            result => {
                dispatch({...action, payload: result});
                return result;
            },
            error => {
                dispatch({...action, payload: error, error: true});
                return error;
            }
        )
            : next(action);
    };
}


