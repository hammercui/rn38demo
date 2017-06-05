/**
 * Created by Gaohan on 16/12/23.
 */
import defaultTheme from '../../core/theme';

function setTheme(aTheme={}) {
  Object.assign(defaultTheme, aTheme);
}

function getTheme() {
  // return Object.assign({}, defaultTheme);
  return defaultTheme;
}

exports.setTheme = setTheme;
exports.getTheme = getTheme;