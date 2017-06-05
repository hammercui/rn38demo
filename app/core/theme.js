/**
 * Created by Gaohan on 16/12/22.
 */

import {Platform, Dimensions} from 'react-native';

export default {
  /** ======================= 其他 ======================= **/
  rightCarColor: '#A90F26', // 针对对对车的颜色

  /** ======================= 背景色 ======================= **/
  colorPrimary: '#e91e63', // 基色 红色   主题大红色为: #A90F26
  colorInfo: '#5BC0DE', // 信息色
  colorSuccess: '#5CB85C', // 成功色
  colorDanger: '#D9534F', // 危险/失败色
  colorWarning: '#F58C23', // 警告色

  baseBgColor: '#FFFFFF', // 背景色
  baseFgColor: '#000000', // 前景色
  baseAssistColor: '#E2E2E2', // 基础辅助色（一般为分割线或帮助类颜色）
  baseSpaceColor:"#F4F4F4", //基础分割块线色

  width: Dimensions.get('window').width, // 屏幕宽
  height: Dimensions.get('window').height, // 屏幕高
  get heightWithNavBar() {
    return this.height - this.navBarHeight;
  },
  get heightWithTabBar() {
    return this.height - this.tabBarHeight;
  },
  get heightWithNavTabBar() {
    return this.height - this.navBarHeight - this.tabBarHeight;
  },

  /** ======================= 基本布局 ======================= **/
  // borderRadiusBase: (Platform.OS === 'ios' ) ? 5 : 2,
  borderRadiusBase: 5, // 圆角
  borderWidth: 1, // 边框宽度
  contentPadding: 10, // 内部padding

  /** ======================= 基本字体 ======================= **/
  fontSizeBase: 15, // 字体大小
  get textColor() {
    return this.baseFgColor
  }, // 字体默认颜色
  inverseTextColor: '#9B9B9B', // 反色字体默认颜色
  // lineHeight: (Platform.OS === 'ios' ) ? 20 : 24,
  lineHeight: 20, // 行高
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  }, // H1标题字体大小
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  }, // H2标题字体大小

  /** ======================= 导航栏 ======================= **/
  // navBarHeight: (Platform.OS === 'ios' ) ? 64 : 56,
  navBarHeight: 64, // 导航栏高度
  get navBarBgColor() {
    return this.baseBgColor;
  }, // 导航栏背景色
  navBarLeftBtnColor: '#000000', // 导航栏左按钮色
  navBarRightBtnColor: '#000000', // 导航栏右按钮色
  navBarTitleColor: '#000000', // 导航栏标题颜色
  get navBarTitleWidth(){
    return this.width - 40*2
  },//导航栏标题长度

  /** ======================= TabBar 在router里配置 ======================= **/
  tabBarHeight: 55, // tabBar高度
  get tabBarBgColor() {
    return this.baseBgColor;
  }, // tab栏背景色
  get tabBarItemActiveColor() {
    return this.rightCarColor
  }, // tabItem选中色
  get tabBarItemColor() {
    return this.inverseTextColor;
  }, // tabItem色
  tabBarItemIconSize: 26, // tabItem Icon大小
  tabBarItemFontSize: 12, // tabItem默认字体大小

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
    return this.baseAssistColor;
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
    return this.inverseTextColor;
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
  iconFamily: 'right2Car', // 默认icon库
  // iconFontSize: (Platform.OS === 'ios' ) ? 20 : 18,
  // iconLineHeight: (Platform.OS === 'ios' ) ? 30 : 28,
  iconFontSize: 20, // iconSize
  iconLineHeight: 30, // icon行高
  iconMargin: 7, // icon外间距

  /** ======================= ListView ======================= **/
  get separatorLineColor() {
    return this.baseAssistColor;
  },  //列表分割线颜色
  thumbWidth:107,//缩略图宽
  thumbHeight:80,//缩略图高
  get itemH1Font(){ return this.fontSizeBase * 1.0},//item项H1字体
  itemH2Font:10,//item项H2字体
  get itemH3Font(){ return this.fontSizeBase * 1.2},//item项H3字体
  get itemH4Font(){ return this.fontSizeBase * 0.75},  //item项H4字体
  itemAssistHeight:20,//列表辅助区域高度
  get itemHeight(){
    return this.thumbHeight  + 35;
  },//row的高度
  /** ======================= ScrollTabBar ======================= **/
  stbTextMarginVertical:1, //文字之间上下间距
  stbTabHeight:60, //tab高度

  /** ======================= Badge ======================= **/
  badgeTextFont:11,
  // badgeLineHeight: (Platform.OS === 'ios' ) ? 11 : 15,
  badgeLineHeight: 11, // 行高

}