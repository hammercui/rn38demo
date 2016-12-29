/**
 * 配置store
 * Created by cly on 16/12/26.
 */

import {createStore,applyMiddleware,compose} from "redux";
import  promise from "../middleware/redux-promise-middleware";
import createLogger from "redux-logger";

import rootReducer from "../reducers";
//import {composeWithDevTools} from 'remote-redux-devtools';

const finalCreateStore = compose(
    applyMiddleware(promise),
    applyMiddleware(createLogger())
)(createStore);
const store = finalCreateStore(rootReducer);



// export default function configureStore(initialState) {
//     const store = createStore(
//         rootReducer,
//         initialState,
//         composeWithDevTools(
//             applyMiddleware(promise),
//             applyMiddleware(createLogger()),
//         )
//     );
//
//     if (module.hot) {
//         // Enable hot module replacement for reducers
//         module.hot.accept(() => {
//             const nextRootReducer = require('../reducers/index').default;
//             store.replaceReducer(nextRootReducer);
//         });
//     }
//
//     return store;
// };

export default store;