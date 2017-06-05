/**
 * 带下拉刷新，上拉加载的ListtView
 * Created by cly on 17/1/6.
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {Platform, ListView, RefreshControl,
    RecyclerViewBackedScrollView,ActivityIndicator,
    TouchableWithoutFeedback,TouchableOpacity, PixelRatio
} from 'react-native';
import BaseComponent from "../reduxVersion/baseComponent";
import enhanceProps from "../utils/enhanceProps";
import View from "./view";
import Text from "./text";
import {Button, Icon} from "./index";
import _ from 'lodash';
import BaseStyleSheet from '../reduxVersion/baseStyleSheet';

//滚动条移动多少显示置顶按钮
const SHOW_TOP_BTN_TOP = 200;
export class TopButton extends BaseComponent {

    static defaultProps = {};
    static propTypes = {};
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        //console.info("@@@@@", typeof this.props.onPress);
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.topButton}>
                <Icon name='iconTop' style={{fontSize: 35}} />
            </TouchableOpacity>
        );
    }
}
var styles = BaseStyleSheet.create({
    topButton:{

      justifyContent: 'center',
      alignItems: 'center',
      position:'absolute',
        right:5,
        bottom:95,
        width:55,
        height:55,
        backgroundColor:'rgba(0,0,0,0)',
    },
    topBottomImg: {
        width:40,
        height:40,
    }
});

export default class RefreshListView extends BaseComponent{

    static defaultProps = {
        loadMoreable:true,  //默认 上拉加载
        refreshable:true,   //默认 下拉刷新
        refreshProps:{}, //可定制属性 tintColor:"",progressBackgroundColor:"",titleColor:"",colors:[]
        footerProps:{}   //可定制属性 titleColor:",color:",style:{}
    };
    static propTypes = {
        onFetch: React.PropTypes.func.isRequired,//网络请求回调  {lastId:-1},callBack
        listData: React.PropTypes.object.isRequired, //数据源
        renderRow:React.PropTypes.func.isRequired,   //渲染列表

        loadMoreable: React.PropTypes.bool, //是否开启加载更多
        refreshable: React.PropTypes.bool,  //是否开启下拉刷新



        renderSeparator: React.PropTypes.func,
        renderHeader: React.PropTypes.func,
        renderFooter: React.PropTypes.func,


        refreshProps:React.PropTypes.object, //下拉刷新区域布局
        footerProps:React.PropTypes.object,  //底部区域布局


    };

    _setLastID = (lastID) => {this._lastID = lastID};
    _getLastID = () => {return this._lastID};

    constructor(props){
        super(props);

        this.state = {
            isRefreshing: false,
            isLoadMore: false,
            paginationStatus: (false ? 'waiting' : 'allLoaded'), //上拉加载状态
            refreshStatus: 'waiting', // header 下拉刷新状态，
            showTopBtn:false, //判断是否显示置顶按钮
        };

        // if (typeof this.props.listData.data != 'undefined' && this.props.listData.data.length > 0) {
        //     let list = this.props.listData.data;
        //     this._setLastID(list.length-1);
        // }
        this._setLastID(props.listData.data.length>0?props.listData.data.length-1:-1);
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.listData.data != 'undefined' && nextProps.listData.data.length > 0) {
            let list = nextProps.listData.data;
            this._setLastID(list.length-1);
            this.setState({
                paginationStatus: (nextProps.listData.hasMore ? 'waiting' : 'allLoaded')
            });
        }
    }




    //执行刷新状态
     _onRefresh() {
            //console.log("do _onRefresh");
            if(this.isLoading() || !this.props.refreshable) return;
            this.setState({
                refreshStatus: 'fetching',
                isRefreshing: true,
            });
           this.props.onFetch({lastId:-1}).then(
             success=>{this._resumeWaitingState()},
             error=>{this._resumeWaitingState()}
           );

    };

    //执行加载更多
     _onLoadMore() {
            //console.log("do _onLoadMore");
            if (!this.props.listData.hasMore || this.isLoading() || !this.props.loadMoreable) return;
            this.setState({
                paginationStatus: 'fetching',
                isLoadingMore: true,
            });
             this.props.onFetch({lastId: this._getLastID()}).then(
               success=>{this._resumeWaitingState()},
               error=>{this._resumeWaitingState()}
             );
            // this.setState({
            //     refreshStatus: 'waiting',
            //     isRefreshing: false,
            //     isLoadingMore: false,
            //     paginationStatus: (this.props.listData.hasMore ? 'waiting' : 'allLoaded'),
            // });
    };


    _resumeWaitingState(){
        this.setState({
            refreshStatus: 'waiting',
            isRefreshing: false,
            isLoadingMore: false,
            paginationStatus: (this.props.listData.hasMore ? 'waiting' : 'allLoaded'),
        });
    }

    //监听是否到达底部
    handleEndReached() {
        this._onLoadMore();
    }

    //检测是否处于请求中
    isLoading(){
        return this.state.isRefreshing || this.state.isLoadingMore;
    }

    //获得主题属性
    prepareRootProps() {
        let style = {
            backgroundColor:this.thisTheme().baseBgColor,
            flex:1,
        };//主题布局属性
        let defaultProps = {
            style: style,
        };
        return enhanceProps(this.props, defaultProps);
    }


    render(){
        var ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        return (
            <View {...this.prepareRootProps()} >
                <ListView
                    ref="listView"
                    dataSource={ds.cloneWithRows(this.props.listData.data)}
                    renderRow={this.props.renderRow}
                    renderHeader={this._renderHeaderView.bind(this)}
                    renderFooter={this._renderFooterView.bind(this)}
                    renderSeparator={this._renderSeparatorView.bind(this)}
                    refreshControl={this.props.refreshable === true ? this._renderRefreshControl() : null}
                    onEndReached={this.handleEndReached.bind(this)}
                    onEndReachedThreshold={30}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={true}
                    removeClippedSubviews={true}
                    initialListSize={3}
                    pageSize={1}
                    scrollRenderAheadDistance={200}
                    canCancelContentTouches={true}
                    scrollEventThrottle = {200}
                    onScroll={this._onScroll.bind(this)}
                />
                {this.state.showTopBtn && <TopButton onPress={this._scrollTop.bind(this)} />}
            </View>

            );
    }

    _onScroll(event){
        //为了增加效率,仅有在必要情况下才调用setState
        if(event.nativeEvent.contentOffset.y > SHOW_TOP_BTN_TOP && !this.state.showTopBtn){
            this.setState({showTopBtn: true});
        } else if(event.nativeEvent.contentOffset.y <= SHOW_TOP_BTN_TOP && this.state.showTopBtn){
            this.setState({showTopBtn: false});
        }
    }

    //渲染头部
    _renderHeaderView() {
        if (!this.props.renderHeader){return null;}
        return this.props.renderHeader();
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
                title={"最后更新:"+this._getRefreshTime()}
                titleColor={refreshProps.titleColor}
                colors={refreshProps.colors}
                progressBackgroundColor={refreshProps.progressBackgroundColor}
            />
        );
    }

    //拼接最后更新时间
    _getRefreshTime(){
        return this.props.listData.serverRealTime?this.props.listData.serverRealTime:"很久以前"
    }

    //滚回顶部
    _scrollTop() {
        return this.refs.listView.scrollTo({y: 0});
    }


    //渲染分割线
    _renderSeparatorView(sectionID, rowID, adjacentRowHighlighted) {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted);
        }
        return (
            <View key={rowID} style={{height: 1.0 / PixelRatio.get(),
                backgroundColor: this.thisTheme().separatorLineColor,
                marginLeft:this.thisTheme().contentPadding,
                marginRight:this.thisTheme().contentPadding,
            }} />
        );
    }

    //获得Footer的样式
    getFooterProps(){
        var defaultStyle = {
            flex:1,height: 44, flexDirection:"row", justifyContent: 'center', alignItems: 'center', backgroundColor: "#f4f4f4"
        };

        var defaultProps = {
            style:defaultStyle,
            titleSize:  this.thisTheme().fontSizeBase,
            titleColor: this.thisTheme().textColor,
            color:      this.thisTheme().colorPrimary,
        };
        return enhanceProps(this.props.footerProps, defaultProps);
    }

    // 渲染底部视图
    _renderFooterView() {
        if(this.props.renderFooter){
            return this.props.renderFooter();
        }
        //数据为空
        let status = -1;
        if(!this.props.loadMoreable){ return null; }
        else if(this.state.paginationStatus === 'waiting' && this.props.listData.data.length > 0){
            status = 1; // 按钮-可加载
        }
        else if(this.state.paginationStatus === 'fetching'){
            status = 2; // 加载中。。。
        }
        else if(this.state.paginationStatus === "allLoaded"){
            status = 3; // 文字-已全部加载
        }
        //console.log("status" ,status);
        var footerProps = this.getFooterProps();
        if(status == -1){
            return (
              <View style={footerProps.style}>
                  <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>
                      没有数据，请下拉刷新重试
                  </Text>
              </View>
              )
        }
        return(
            <View style={footerProps.style}>
                { status ==0 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>暂时没有更多数据了，请刷新重试</Text>}
                { status ==1 && <TouchableOpacity onPress={this._onLoadMore.bind(this)} ><Text>查看更多</Text></TouchableOpacity>}
                { status ==2 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>努力加载中 </Text>}
                { status ==2 && <ActivityIndicator animating={true}  color={footerProps.color}/>}
                { status ==3 && <Text style={{fontSize:footerProps.titleSize, color:footerProps.titleColor}}>已经到底部，没有更多数据了</Text>}
            </View>
        );
    }
}

