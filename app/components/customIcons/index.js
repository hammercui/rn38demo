/**
 * 自定义icon
 * Created by cly on 16/12/27.
 */
'use strict';
import {createIconSet} from "react-native-vector-icons";

const glyphMap = {
    "tab-home":59530,
    "tab-fuli":58681,//飞机
    "tab-study":59485,//
    "tab-userCenter":59576,//设置
};


let MaterialIcons = createIconSet(glyphMap, 'Material Icons', 'MaterialIcons.ttf');

module.exports = MaterialIcons;
module.exports.glyphMap = glyphMap;

