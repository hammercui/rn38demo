/**
 * Created by Gaohan on 16/12/22.
 */

import {Platform, Dimensions} from 'react-native';

export default {

  /** ======================= 背景色 ======================= **/
  colorPrimary: 'red', // 基色
  colorInfo: '#5BC0DE', // 信息色
  colorSuccess: '#5CB85C', // 成功色
  colorDanger: '#D9534F', // 危险/失败色
  colorWarning: '#F58C23', // 警告色

  baseBgColor: '#FFFFFF', // 背景色
  baseFgColor: '#000000', // 前景色
  width: Dimensions.get('window').width, // 屏幕宽
  height: Dimensions.get('window').height, // 屏幕高

  /** ======================= 基本布局 ======================= **/
  borderRadiusBase: (Platform.OS === 'ios' ) ? 5 : 2, // 圆角
  borderWidth: 1, // 边框宽度
  contentPadding: 10, // 内部padding

  /** ======================= 基本字体 ======================= **/
  fontSizeBase: 20, // 字体大小
  textColor: 'purple', // 字体默认颜色
  inverseTextColor: '#FFFFFF', // 反色字体默认颜色
  lineHeight: (Platform.OS === 'ios' ) ? 20 : 24, // 行高
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  }, // H1标题字体大小
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  }, // H2标题字体大小

  /** ======================= 导航栏 ======================= **/
  navBarHeight: (Platform.OS === 'ios' ) ? 64 : 56, // 导航栏高度
  get navBarBgColor() {
    return this.colorPrimary;
  }, // 导航栏背景色
  navBarLeftBtnColor: 'yellow', // 导航栏左按钮色
  navBarRightBtnColor: 'yellow', // 导航栏右按钮色

  /** ======================= TabBar ======================= **/
  tabBarHeight: 55, // tabBar高度
  get tabBarBgColor() {
    return this.baseBgColor;
  }, // tab栏背景色
  get tabBarItemActiveColor() {
    return this.colorPrimary;
  }, // tabItem选中色
  tabBarItemColor: '#9B9B9B', // tabItem色

  /** ======================= 按钮 ======================= **/
  get btnTextSize() {
    return this.fontSizeBase * 1.1;
  }, // 按钮字体大小
  btnLineHeight: 19, // 按钮行高
  btnDisabledBgColor: '#B5B5B5', // 按钮disable背景色
  btnHeight: 38,
  get btnBorderRadiusBase() {
    return this.borderRadiusBase;
  }, // 按钮圆角半径
  get btnBorderRadiusRound() {
    return this.btnHeight * 0.5;
  }, // 圆边按钮半径
  btnPadding: 6, // 按钮内间距

  /** ======================= 输入input ======================= **/
  get inputBorderColor() {
    return this.colorPrimary;
  }, // 输入框border颜色
  get inputSuccessBorderColor() {
    return this.colorSuccess;
  }, // 输入框border成功颜色
  get inputErrorBorderColor() {
    return this.colorDanger;
  }, // 输入框border失败颜色

  get inputFontSize() {
    return this.fontSizeBase;
  }, // 输入字体大小
  get inputColor() {
    return this.textColor;
  }, // 输入字体颜色
  get inputColorPlaceholder () {
    return '#575757';
  }, // Placeholder颜色
  inputGroupMarginBottom: 10, // 输入框底外边距
  inputHeight: 40, // 输入框基本高度
  inputLineHeight: 24, // 输入框行高
  inputPaddingLeft: 10, // 输入框左内边距

  get inputBorderRadiusBase() {
    return this.borderRadiusBase;
  }, // 按钮圆角半径
  get inputBorderRadiusRound() {
    return this.inputHeight * 0.5;
  }, // 圆边按钮半径

  /** ======================= Icon ======================= **/
  iconFamily: 'Ionicons', // 默认icon库
  iconFontSize: (Platform.OS === 'ios' ) ? 30 : 28, // iconSize
  iconLineHeight: (Platform.OS === 'ios' ) ? 30 : 28, // icon行高
  iconMargin: 7, // icon外间距


  /** ======================= ListView ======================= **/
  separatorLineColor:"orange"  //列表分割线颜色
}