/**
 * Created by Gaohan on 16/12/23.
 */
import {StyleSheet} from 'react-native';
import { getTheme, setTheme } from './theme/index';
// import testTheme from '../theme/testTheme';

// setTheme(testTheme);
// console.log(getTheme());
StyleSheet.thisTheme = getTheme;

export default StyleSheet;