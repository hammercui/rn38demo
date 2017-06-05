/* eslint-disable no-return-assign, no-unused-vars */
import React, { Component, PropTypes } from 'react'
import { Dimensions, Modal,TouchableWithoutFeedback, ActivityIndicator, BackHandler,ToastAndroid} from 'react-native'
import { View, initializeRegistryWithDefinitions } from 'react-native-animatable'

import styles from './index.style.js'
import indicatorStyle from "../../components/indicator/styles";
import {LoaderHandler} from "../../components/indicator";
/**
 * 带动画的模态页，使用view实现，不再使用Modal实现
 */
export class AnimatedModal extends Component {
  static propTypes = {
    animationIn: PropTypes.string,
    animationInTiming: PropTypes.number,
    animationOut: PropTypes.string,
    animationOutTiming: PropTypes.number,
    backdropColor: PropTypes.string,
    backdropOpacity: PropTypes.number,
    backdropTransitionInTiming: PropTypes.number,
    backdropTransitionOutTiming: PropTypes.number,
    children: PropTypes.node.isRequired,
    //isVisible: PropTypes.bool.isRequired,
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    style: PropTypes.any,
    bottomSheet:PropTypes.bool, //是否底部弹出
  }
  static defaultProps = {
    animationIn: 'slideInUp',
    animationInTiming: 300,
    animationOut: 'slideOutDown',
    animationOutTiming: 300,
    backdropColor: 'black',
    backdropOpacity: 0.70,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
    onModalShow: () => null,
    onModalHide: () => null,
    //isVisible: false,
  }

  state = {
    isVisible: false,
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height,
    showLoading:false,//是否显示菊花
  }

  constructor(props){
    super(props);
    this.loading = false;
   // this.count = 0;
    this.handleBack = this._handleBack.bind(this);
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log("modal nextProps.isVisible:",nextProps.isVisible);
  //   if (!this.state.isVisible && nextProps.isVisible) {
  //     this.setState({ isVisible: true })
  //   }
  // }

  componentDidMount() {
    //监听Android返回键，在loading的时候屏蔽返回
    BackHandler.addEventListener("hardwareBackPress",this.handleBack)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress",this.handleBack);
  }

  //返回键的处理
  //true代表自己处理，不往下传递
  _handleBack(){
    if(this.loading)
      return true;

    return false;
  }
  componentDidUpdate (prevProps, prevState) {
    // On modal open request slide the view up and fade in the backdrop
    if (this.state.isVisible && !prevState.isVisible) {
      this._open();
    // On modal close request slide the view down and fade out the backdrop
    }
    // else if (!this.props.isVisible && prevProps.isVisible) {
    //   this._close()
    // }
  }
  //显示modal
  showModal(){
    this.setState({isVisible:true});
  }
  //关闭modal
  hideModal(){
    this._close();
  }


  //显示等待
  showLoading(){
    //this.setState({showLoading:true});
    this.loading = true;
    LoaderHandler.showLoader();
  }
  //隐藏等待
  hideLoading(){
   // this.setState({showLoading:false});
    LoaderHandler.hideLoader();
    this.loading = false;
  }

  _open = () => {
    this.backdropRef.transitionTo({ opacity: this.props.backdropOpacity }, this.props.backdropTransitionInTiming)
    this.contentRef[this.props.animationIn](this.props.animationInTiming)
      .then(() => {
        this.props.onModalShow()
      })
  }

  _close = async () => {
    this.backdropRef.transitionTo({ opacity: 0 }, this.props.backdropTransitionOutTiming);
    this.contentRef[this.props.animationOut](this.props.animationOutTiming)
      .then(() => {
        this.setState({ isVisible: false })
        this.props.onModalHide()
      })
  }

  _handleLayout = (event) => {
    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height
    if (deviceWidth !== this.state.deviceWidth || deviceHeight !== this.state.deviceHeight) {
      this.setState({ deviceWidth, deviceHeight })
    }
  }

  //生成布局
  prepareRootStyles(){
    return this.props.bottomSheet ? {justifyContent: 'flex-end', margin: 0}:{};
  }


  render () {
    const { animationIn, animationInTiming, animationOut, animationOutTiming, backdropColor,
      backdropOpacity, backdropTransitionInTiming, backdropTransitionOutTiming, children, isVisible,
      onModalShow, onModalHide, style, ...otherProps } = this.props;
    const { deviceWidth, deviceHeight } = this.state;

    return (
     this.state.isVisible?<View
        style={{flex:1,backgroundColor:"transparent", position:"absolute",left:0,right:0,top:0,bottom:0}}
        visible={this.state.isVisible}
        onRequestClose={() => null}
        {...otherProps}
        testID={"根"}
      >
        <View
            onLayout={this._handleLayout}
            ref={(ref) => this.backdropRef = ref}
            style={[
              styles.backdrop,
              { backgroundColor: backdropColor, width: deviceWidth, height: deviceHeight }
            ]}
            testID={"遮罩"}
        />

          <TouchableWithoutFeedback  onPress={this._close.bind(this)} >
            <View
              ref={(ref) => this.contentRef = ref}
              style={[{ margin: deviceWidth * 0.05 }, styles.content, this.prepareRootStyles()]}
              {...otherProps}
              testID={"触摸区域"}
            >
              <TouchableWithoutFeedback onLayout={this._onModalContentLayout.bind(this)} ref={ref=>this._modalContent = ref}   onPress={()=>null}
                                        testID={"modal内容区域"}>
                  {children}
              </TouchableWithoutFeedback>

            </View>
          </TouchableWithoutFeedback>

        {/*显示loading区域*/}
        {/**
          this.state.showLoading && <View style={[indicatorStyle.container,{opacity:1}]}>
            <View style={indicatorStyle.overlay}>
              <ActivityIndicator
                color="#FFFFFF90"
                size="large"
                style={indicatorStyle.progressBar}/>
            </View>
          </View>
        **/}

      </View> :null
    )
  }

  //计算modal显示区域高度
  _onModalContentLayout(event){
    var {x, y, width, height} = event.nativeEvent.layout;
    //注入自定义动画，可覆盖默认动画
    initializeRegistryWithDefinitions({
      //下滑退出
      slideOutDown:{
        from: {
          "translateY": 0
        },
        to: {
          "translateY": height
        },
      }
    })

  }


}

export default AnimatedModal
