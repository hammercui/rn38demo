/**
 * Created by Gaohan on 16/12/22.
 */

'use_strict';
import _ from 'lodash';
import {
  PixelRatio,
  Platform,
} from 'react-native';

/**
 * px坐标转换
 * @param px
 * @returns {number}
 */
function toDips(px) {
  return px / PixelRatio.get();
}
/**
 * dp坐标转换为px
 * @param dp
 */
function toPx(dp) {
  return PixelRatio.getPixelSizeForLayoutSize(dp);
}

/**
 * 字体sp坐标转换
 * @param sp
 * @returns {number}
 */
function getFontSize(sp) {
  return sp * PixelRatio.getFontScale();
}
/**
 * 比较数字是否在范围内，如果在则返回value，否则返回边界值
 * @param value
 * @param min
 * @param max
 * @returns {*}
 */
function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}






// ## Public interface
export {
  toDips,
  toPx,
  getFontSize,
  clamp,
};