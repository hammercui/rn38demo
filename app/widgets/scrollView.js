/**
 * 自定义scrollView
 * Created by cly on 17/1/10.
 */
"use strict";
import React,{PropTypes} from "react";
import {Platform ,ScrollView,RefreshControl,ActivityIndicator,TouchableOpacity} from "react-native";
import {View} from "./index";
import Text from "./text";
import BaseComponent from "../reduxVersion/baseComponent";
import enhanceProps from "../utils/enhanceProps";
import {TopButton} from "./refreshListView";
import _ from 'lodash';
//滚动条移动多少显示置顶按钮
const SHOW_TOP_BTN_TOP = 200;

export default class ScrollViewNew extends BaseComponent{
  static defaultProps = {
    topBtn:false,
    refreshable:false,   //下拉刷新
    loadMoreable:false,   //上拉加载
    serverRealTime:"很久以前",
    footerProps:{},
    refreshProps:{},
    showFooter:false,
    removeClippedSubviews: Platform.OS == 'ios',
    disRenderFooter:false,
    autoToBottom:false,
  };

  static propTypes={
    topBtn:PropTypes.bool,
    refreshable:PropTypes.bool,
    loadMoreable:PropTypes.bool,
    onFetch:PropTypes.func,
    //加载更多的回调
    onLoadMore:PropTypes.func,
    serverRealTime:PropTypes.any,      //上次刷新时间
    refreshProps:React.PropTypes.object, //可定制属性 tintColor:"",progressBackgroundColor:"",titleColor:"",colors:[]
    footerProps:React.PropTypes.object,
    showFooter:React.PropTypes.bool,  //是否显示scrollView的底部
    hasMore:React.PropTypes.bool,    //是否有更多数据

    disRenderFooter:React.PropTypes.bool, //是否渲染页脚
    autoToBottom:React.PropTypes.bool, //是否自动滚到页脚
  };


  constructor(props){
    super(props);
    this.state = {
      isRefreshing: false,
      isLoadingMore: false,
      showTopBtn:false,
      isLoadMore: false,
      refreshStatus: 'waiting',//enum(waiting fetching)
      paginationStatus:props.hasMore?"waiting":"allLoaded",
    };
  }

  componentWillUpdate(nextProps,nextState){
    //接收到有更多
    if(!this.props.hasMore && nextProps.hasMore){
     this.setState({paginationStatus:"waiting"})
    }
    if(this.props.hasMore && ! nextProps.hasMore){
      this.setState({paginationStatus:"allLoaded"})
    }
  }

  //获得主题属性
  prepareRootProps() {
    let type = {
      backgroundColor:this.thisTheme().baseBgColor,
    };//主题布局属性
    let defaultProps = {
      style: type,
    };
    return enhanceProps(this.props, defaultProps);
  }



  render(){
    return(
      <View style={{flex:1}}>
        <ScrollView
          {...this.prepareRootProps()}
          ref="scrollView"
          automaticallyAdjustContentInsets={true}
          removeClippedSubviews={this.props.removeClippedSubviews}
          scrollEnabled={true}
          scrollEventThrottle = {200}
          onScroll={this._onScroll.bind(this)}
          onEndReached={this._handleEndReached.bind(this)}
          refreshControl={this.props.refreshable === true ? this._renderRefreshControl() : null}
          onLayout={this._onLayout.bind(this)}
          onContentSizeChange={this._onContentSizeChange.bind(this)}
        >
          {this.props.children}
          {this._renderFooterView()}
        </ScrollView>
        {this.props.topBtn && this.state.showTopBtn && <TopButton onPress={this._scrollTop.bind(this)} />}
      </View>

    );
  }

  _onContentSizeChange(w,h){
    this.contentWidth = w;
    this.contentHeight = h;
    if(this.props.autoToBottom)
      this.scrollToBottom();
    console.log("bottom  contentWidth",this.contentWidth);
  }
  _onLayout(ev){
    this.layoutWidth =  ev.nativeEvent.layout.width;
    this.layoutHeight = ev.nativeEvent.layout.height;
    console.log("bottom  layoutWidth",this.layoutWidth);
  }

  //监听是否到达底部
  _handleEndReached() {
    this._onLoadMore();
  }

  //获得下拉刷新的属性和样式
  getRefreshProps(){
    var defaultProps = {
      tintColor: this.thisTheme().colorPrimary,
      titleColor: this.thisTheme().textColor,
      colors: ['white', 'black', 'green'],
      progressBackgroundColor: "red",
      refreshableBackgroundColor:"transparent", //默认 刷新区域背景色
    };
    return _.merge(defaultProps,this.props.refreshProps);
  }
  //渲染下拉刷新控制器
  _renderRefreshControl() {
    let refreshProps = this.getRefreshProps();
    return(
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh.bind(this)}
        tintColor={refreshProps.tintColor}
        title={"最后更新:"+this.props.serverRealTime}
        titleColor={refreshProps.titleColor}
        colors={refreshProps.colors}
        progressBackgroundColor={refreshProps.progressBackgroundColor}
      />
    );
  }


 scrollToBottom(animated = false){
   if(this.contentHeight == undefined || !this.contentWidth == undefined || !this.layoutWidth == undefined || this.layoutHeight  == undefined)
     return;
   //水平模式
   if(this.props.horizontal){
      const scrollWidth = this.contentWidth - this.layoutWidth;
      console.log("bottom scrollWidth",scrollWidth);
      if(scrollWidth >0){
        const scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollTo({x:scrollWidth,y:0,animated:animated});
      }
   }
   //垂直模式
   else{
     const scrollHeight = this.contentHeight - this.layoutHeight;
     if(scrollHeight >0){
       const scrollResponder = this.refs.scrollView.getScrollResponder();
       scrollResponder.scrollResponderScrollTo({x:0,y:scrollHeight,animated:animated});
     }
   }
 }

  _onScroll(event){
    //console.log("bottom contentOffset.x",event.nativeEvent.contentOffset.x);
    //为了增加效率,仅有在必要情况下才调用setState
    if(event.nativeEvent.contentOffset.y > SHOW_TOP_BTN_TOP && !this.state.showTopBtn){
      this.setState({showTopBtn: true});
    } else if(event.nativeEvent.contentOffset.y <= SHOW_TOP_BTN_TOP && this.state.showTopBtn){
      this.setState({showTopBtn: false});
    }

    if(event.nativeEvent.contentSize.height - 20 < event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height){
      this._onLoadMore();
    }
  }

  //执行刷新状态
  _onRefresh(){
    if(!this.props.refreshable || this.isLoading() || !this.props.refreshable) return;
    this.setState({
      refreshStatus: 'fetching',
      isRefreshing: true,
    });
    this.props.onFetch().then(
      success=>{this._resumeWaitingState()},
      error=>{this._resumeWaitingState()}
    )
  };

   //执行加载更多
  _onLoadMore(){
    if(!this.props.hasMore || this.isLoading() || !this.props.loadMoreable) return;
      this.setState({
        paginationStatus: 'fetching',
        isLoadingMore : true,
      });
      this.props.onLoadMore().then(
        success=>{this._resumeWaitingState()},
        error=>{this._resumeWaitingState()}
      );
  };

  //恢复到等待状态
  _resumeWaitingState(){
    console.log("_resumeWaitingState");
    this.setState({
      refreshStatus: 'waiting',
      isRefreshing: false,
      isLoadingMore: false,
      paginationStatus: (this.props.hasMore ? 'waiting' : 'allLoaded'),
    });
  }

  //检测是否处于请求中
  isLoading(){
    return this.state.isRefreshing || this.state.isLoadingMore;
  }

  //滚回顶部
  _scrollTop() {
    return this.refs.scrollView.scrollTo({y: 0});
  }


  //获得Footer的样式
  getFooterProps(){
    var defaultStyle = {
      flex:1,height: 44, flexDirection:"row", justifyContent: 'center', alignItems: 'center', backgroundColor: "#f4f4f4",

    };

    var defaultProps = {
      style:defaultStyle,
      titleSize:  this.thisTheme().fontSizeBase,
      titleColor: this.thisTheme().textColor,
      color:      this.thisTheme().colorPrimary,
    };
    return enhanceProps(this.props.footerProps, defaultProps);
  }

  // 渲染页脚视图
  _renderFooterView() {
    if(this.props.disRenderFooter)
      return;
    //数据为空
    let status = -1;
    if(!this.props.loadMoreable || !this.props.showFooter){ return null; }

    if(this.state.paginationStatus === 'waiting'){
      status = 1; // 按钮-可加载
    }
    else if(this.state.paginationStatus === 'fetching'){
      status = 2; // 加载中。。。
    }
    else if(this.state.paginationStatus === "allLoaded"  ){
      status = 3; // 文字-已全部加载
    }

    var footerProps = this.getFooterProps();
    if(status == -1){
      return null
    }
    return(
        <View style={[footerProps.style]}>
          { status ==0 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>暂时没有更多数据了，请刷新重试</Text>}
          { status ==1 && <TouchableOpacity onPress={this._onLoadMore.bind(this)} ><Text>点击加载更多</Text></TouchableOpacity>}
          { status ==2 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>努力加载中</Text>}
          { status ==2 && <ActivityIndicator animating={true}  color={footerProps.color}/>}
          { status ==3 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>已经到底部，没有更多数据了</Text>}
        </View>
    );
  }
}


