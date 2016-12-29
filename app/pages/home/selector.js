/**
 * Created by cly on 16/12/27.
 */

import {createSelector,createStructuredSelector} from "reselect";

const home = state =>state.home;

export default createStructuredSelector({
    home
});
